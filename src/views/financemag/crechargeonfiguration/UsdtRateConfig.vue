<template>
  <el-dialog title="USDT 充值汇率" :visible.sync="visible" width="min(980px, 96vw)" top="5vh" append-to-body :close-on-click-modal="false">
    <div v-loading="loading" class="usdt-rates">
      <el-alert title="只使用后台设定汇率；未设置或未启用自定义汇率时，按 1 USDT = 1 单位账户法币换算。" type="info" :closable="false" show-icon />
      <div class="rate-toolbar">
        <span>修改只影响新订单，未过期订单继续使用原锁价。</span>
        <el-button size="mini" icon="el-icon-refresh" @click="load">刷新配置</el-button>
      </div>
      <el-tabs v-model="currency" @tab-click="selectCurrency">
        <el-tab-pane v-for="rule in rules" :key="rule.fiatCurrency" :name="rule.fiatCurrency" :label="rule.fiatCurrency + (isConfigured(rule) ? ' · 后台汇率' : ' · 默认 1:1')" />
      </el-tabs>
      <div v-if="form.fiatCurrency" class="rate-layout">
        <el-form class="rule-form" label-width="125px" size="small" @submit.native.prevent>
          <el-form-item label="使用自定义汇率"><el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" /><p class="hint">关闭表示改用默认 1:1，不是关闭充值。</p></el-form-item>
          <el-form-item label="后台汇率"><el-input v-model="form.manualRate" :disabled="form.enabled !== 1" placeholder="留空按 1:1；例如 32"><template slot="append">{{ currency }} / USDT</template></el-input><p class="hint">填写 1 USDT 对应的法币数量，必须大于 0。留空按 1:1。</p></el-form-item>
          <el-form-item label="USDT 小数位"><el-input-number v-model="form.cryptoScale" :min="2" :max="6" :precision="0" /><p class="hint">向上取整，须符合支付商精度；不叠加汇率调整或定价费用。</p></el-form-item>
          <el-form-item label="修改原因" required><el-input v-model="form.changeReason" type="textarea" :rows="3" maxlength="300" show-word-limit placeholder="3–300 字，记录本次修改目的" /></el-form-item>
          <el-form-item label="锁价确认"><el-checkbox v-model="form.acknowledgeOrderLock">已知悉按上游有效期锁价的风险</el-checkbox></el-form-item>
        </el-form>
        <aside class="rate-preview">
          <div class="eyebrow">当前表单 · V{{ form.version }}</div>
          <h3>{{ currency }} → USDT</h3>
          <el-tag :type="customRate ? 'success' : 'info'" size="small">{{ customRate ? '后台设定汇率' : '默认 1:1' }}</el-tag>
          <p class="rate-value">1 USDT = {{ customRate ? form.manualRate : '1' }} {{ currency }}</p>
          <p>应付 USDT = 法币金额 ÷ 汇率</p>
          <p class="hint">例如汇率为 32 时，500 法币对应 15.625 USDT；未设汇率时，500 法币对应 500 USDT。链上网络手续费另付。</p>
          <label class="preview-label">试算法币金额（{{ currency }}）</label>
          <el-input v-model="fiatAmount" size="small" placeholder="例如 500" />
          <el-button class="preview-button" type="primary" plain size="small" :loading="previewing" @click="preview">按当前表单试算</el-button>
          <p class="hint">试算由服务端完成，不保存配置、不注册玩家、不创建订单。</p>
          <div v-if="quote" class="quote-result">
            <small>应付 USDT</small><strong>{{ quote.cryptoAmount }}</strong>
            <p>充值金额：{{ quote.fiatCurrency }} {{ quote.fiatAmount }}</p>
            <p>使用汇率：1 USDT = {{ quote.appliedRate }} {{ quote.fiatCurrency }}</p>
            <p>来源：{{ quote.rateSource === 'DEFAULT' ? '默认 1:1' : '后台设定汇率' }}</p>
          </div>
          <el-alert title="汇率持续有效，直至后台修改。已创建订单仍按原金额支付，有效期以支付商 expireTime 为准。" type="warning" :closable="false" />
        </aside>
      </div>
      <el-collapse @change="loadHistory">
        <el-collapse-item name="history" title="最近 50 条配置审计记录">
          <el-table :data="history" size="mini" max-height="260" empty-text="暂无记录">
            <el-table-column prop="version" label="版本" width="65" />
            <el-table-column prop="operatorName" label="操作人" width="110" />
            <el-table-column prop="createdAt" label="时间" width="165" />
            <el-table-column prop="changeReason" label="修改原因" min-width="150" />
            <el-table-column type="expand"><template slot-scope="scope"><pre class="audit-json">变更前：{{ scope.row.beforeJson || '未配置' }}\n变更后：{{ scope.row.afterJson }}</pre></template></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <span slot="footer"><el-button @click="visible = false">关闭</el-button><el-button type="primary" :loading="saving" :disabled="loading || !form.fiatCurrency" @click="save">保存 {{ currency }} 汇率</el-button></span>
  </el-dialog>
</template>

<script>
import { listUsdtRates, saveUsdtRate, previewUsdtRate, usdtRateHistory } from '@/api/finance/usdtRate'

export default {
  name: 'UsdtRateConfig',
  data() {
    return { visible: false, loading: false, saving: false, previewing: false, rules: [], currency: 'THB', form: {}, fiatAmount: '500', quote: null, history: [], historyOpen: false }
  },
  computed: {
    customRate() { return this.isConfigured(this.form) }
  },
  watch: {
    form: { deep: true, handler() { this.quote = null } },
    fiatAmount() { this.quote = null }
  },
  methods: {
    isConfigured(rule) { return rule.enabled === 1 && rule.manualRate !== null && rule.manualRate !== undefined && String(rule.manualRate).trim() !== '' },
    open() { this.visible = true; this.load() },
    async load() {
      this.loading = true
      try {
        const { resultSet } = await listUsdtRates()
        this.rules = resultSet.rules; this.selectCurrency()
      } catch (_) { /* 请求层已展示具体错误 */ } finally { this.loading = false }
    },
    selectCurrency() {
      const rule = this.rules.find(item => item.fiatCurrency === this.currency)
      this.form = { ...rule, changeReason: '', acknowledgeOrderLock: false }
      this.quote = null; this.history = []
      if (this.historyOpen) this.fetchHistory()
    },
    payload() {
      const rate = this.form.manualRate === null || this.form.manualRate === undefined ? '' : String(this.form.manualRate).trim()
      return { fiatCurrency: this.form.fiatCurrency, enabled: this.form.enabled, cryptoScale: this.form.cryptoScale, manualRate: rate || null,
        version: this.form.version, changeReason: this.form.changeReason, acknowledgeOrderLock: this.form.acknowledgeOrderLock, fiatAmount: this.fiatAmount }
    },
    async preview() {
      this.previewing = true; this.quote = null
      const payload = this.payload()
      try {
        const { resultSet } = await previewUsdtRate(payload)
        if (JSON.stringify(payload) === JSON.stringify(this.payload())) this.quote = resultSet
      } catch (_) { /* 请求层已展示具体错误 */ } finally { this.previewing = false }
    },
    async save() {
      if (this.saving) return
      if (!this.form.changeReason || this.form.changeReason.trim().length < 3) return this.$message.warning('请填写至少 3 字的修改原因')
      if (!this.form.acknowledgeOrderLock) return this.$message.warning('请确认已知悉订单锁价风险')
      const payload = this.payload()
      const label = this.customRate ? '1 USDT = ' + payload.manualRate + ' ' + this.currency : '默认 1:1'
      try { await this.$confirm('保存 ' + this.currency + ' 汇率：' + label + '？只影响新订单，旧订单仍按原报价付款。', '确认修改充值汇率', { type: 'warning' }) } catch (_) { return }
      this.saving = true
      try { await saveUsdtRate(payload); this.$message.success('汇率已保存并记录审计'); await this.load() } catch (_) { /* 请求层已展示具体错误 */ } finally { this.saving = false }
    },
    loadHistory(names) { this.historyOpen = names.includes('history'); if (this.historyOpen) this.fetchHistory() },
    async fetchHistory() {
      const currency = this.currency
      try { const { resultSet } = await usdtRateHistory(currency); if (currency === this.currency) this.history = resultSet } catch (_) { /* 请求层已展示具体错误 */ }
    }
  }
}
</script>

<style scoped>
.usdt-rates { color: #374151; }
.rate-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 18px 0 8px; font-size: 12px; color: #667085; }
.rate-layout { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(250px, 1fr); gap: 24px; }
.rule-form { min-width: 0; }
.hint { color: #667085; font-size: 12px; line-height: 1.6; margin: 6px 0 0; }
.rate-preview { padding: 22px; margin-bottom: 22px; border: 1px solid #dbe4f0; border-radius: 12px; background: #f7f9fc; font-size: 13px; line-height: 1.65; overflow-wrap: anywhere; }
.rate-preview h3 { margin: 8px 0 18px; font-size: 24px; color: #213b61; }
.rate-value { font-weight: 600; color: #147b68; }
.eyebrow { color: #64748b; font-size: 12px; }
.preview-label { display: block; margin: 18px 0 8px; }
.preview-button { width: 100%; margin-top: 12px; }
.quote-result { padding: 16px; margin: 18px 0; background: #fff; border: 1px solid #dbe4f0; border-radius: 8px; }
.quote-result strong { display: block; color: #147b68; font-size: 26px; }
.quote-result p { margin: 7px 0; }
.audit-json { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; }
@media (max-width: 780px) { .rate-layout { grid-template-columns: 1fr; } }
</style>
