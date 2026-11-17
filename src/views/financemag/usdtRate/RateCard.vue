<template>
  <el-card v-loading="loading" class="rate-card" :class="{ 'payout-card': isPayout }" shadow="never">
    <div slot="header" class="card-heading"><div><h3>{{ title }}</h3><p>{{ isPayout ? '玩家提现 · 平台付出 USDT' : '玩家充值 · 平台收取 USDT' }}</p></div><el-button type="text" icon="el-icon-refresh" :disabled="saving || loading" @click="refresh">刷新</el-button></div>
    <el-alert v-if="loadError" title="汇率加载失败，请刷新重试。" type="error" :closable="false" show-icon />
    <template v-else-if="form">
      <div class="saved-rate"><div>当前生效汇率 <el-tag size="mini" :type="isConfigured(saved) ? 'success' : 'info'">{{ isConfigured(saved) ? '自定义' : '默认 1:1' }}</el-tag></div><strong>1 USDT = {{ effectiveRate(saved) }} <small>{{ currency }}</small></strong><p>版本 {{ saved.version }}<span v-if="saved.updatedAt"> · {{ saved.updatedAt }}</span></p></div>
      <el-form label-position="top" size="small" :disabled="saving || !canEdit" @submit.native.prevent>
        <el-form-item label="使用自定义汇率"><el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" /><span class="inline-hint">关闭后按 1:1 换算</span></el-form-item>
        <el-form-item label="1 USDT 对应的法币数量"><el-input v-model="form.manualRate" :disabled="form.enabled !== 1" placeholder="留空按 1:1，例如 32"><template slot="append">{{ currency }} / USDT</template></el-input></el-form-item>
        <el-form-item label="USDT 金额精度"><el-tag v-if="isPayout" type="info" effect="plain">6 位小数 · 向下取整</el-tag><template v-else><el-input-number v-model="form.cryptoScale" :min="2" :max="6" :precision="0" /><span class="inline-hint">向上取整</span></template></el-form-item>
        <el-form-item label="修改原因" required><el-input v-model="form.changeReason" type="textarea" :rows="2" maxlength="300" show-word-limit placeholder="填写 3–300 字的修改原因" /></el-form-item>
        <el-form-item><el-checkbox v-model="form.acknowledgeOrderLock">已知悉：已锁价订单继续使用原汇率</el-checkbox></el-form-item>
      </el-form>
      <div class="save-row"><span class="hint" :class="{ unsaved: dirty }">{{ dirty ? '有未保存的修改' : '充值与代付分别保存' }}</span><el-button v-if="canEdit" type="primary" size="small" :loading="saving" @click="save">保存{{ title }}</el-button><el-tag v-else size="small" type="info">当前账号仅可查看</el-tag></div>
      <div class="preview-panel"><div class="section-title">金额试算 <span>按当前表单计算</span></div><div class="preview-controls"><el-input v-model="fiatAmount" size="small" :placeholder="isPayout ? '提现法币金额' : '充值法币金额'"><template slot="append">{{ currency }}</template></el-input><el-button size="small" type="primary" plain :loading="previewing" :disabled="saving" @click="preview">试算</el-button></div>
        <div v-if="quote" class="quote-result"><span>{{ isPayout ? '玩家收到' : '玩家应付' }}</span><strong>{{ quote.cryptoAmount }} <small>USDT</small></strong><p>1 USDT = {{ quote.appliedRate }} {{ quote.fiatCurrency }} · {{ quote.rateSource === 'DEFAULT' ? '默认 1:1' : '后台设定' }}</p></div><p v-else class="hint">USDT 数量 = {{ isPayout ? '提现' : '充值' }}法币金额 ÷ {{ isPayout ? '代付' : '充值' }}汇率</p>
      </div>
      <el-collapse v-model="historyPanels" class="history" @change="loadHistory"><el-collapse-item name="history" title="修改记录（最近 50 条）"><el-table v-loading="historyLoading" :data="history" size="mini" max-height="280" :empty-text="historyError ? '加载失败，请收起后重试' : '暂无修改记录'"><el-table-column prop="version" label="版本" width="55" /><el-table-column prop="operatorName" label="操作人" min-width="90" /><el-table-column prop="changeReason" label="修改原因" min-width="130" /><el-table-column type="expand"><template slot-scope="scope"><p>时间：{{ scope.row.createdAt }}</p><pre class="audit-json">变更前：{{ scope.row.beforeJson || '未配置' }}
变更后：{{ scope.row.afterJson }}</pre></template></el-table-column></el-table></el-collapse-item></el-collapse>
    </template>
  </el-card>
</template>

<script>
import { listUsdtRates, saveUsdtRate, previewUsdtRate, usdtRateHistory } from '@/api/finance/usdtRate'
export default {
  name: 'UsdtRateCard',
  props: { currency: { type: String, required: true }, rateType: { type: String, required: true }, canEdit: { type: Boolean, default: false } },
  data() { return { loading: false, loadError: false, saving: false, previewing: false, form: null, saved: null, fiatAmount: '500', quote: null, history: [], historyPanels: [], historyLoading: false, historyError: false, loadId: 0, historyId: 0, previewId: 0 } },
  computed: {
    isPayout() { return this.rateType === 'PAYOUT' },
    title() { return this.isPayout ? '代付 USDT 汇率' : '充值 USDT 汇率' },
    dirty() { return !!this.form && !!this.saved && (['enabled', 'manualRate', 'cryptoScale'].some(key => String(this.form[key] == null ? '' : this.form[key]) !== String(this.saved[key] == null ? '' : this.saved[key])) || !!this.form.changeReason || this.form.acknowledgeOrderLock) }
  },
  watch: { currency: { immediate: true, handler() { this.load() } }, form: { deep: true, handler() { this.quote = null } }, fiatAmount() { this.quote = null }, saving(value) { this.$emit('busy', value) } },
  methods: {
    isConfigured(rule) { return !!rule && rule.enabled === 1 && rule.manualRate != null && String(rule.manualRate).trim() !== '' },
    effectiveRate(rule) { return this.isConfigured(rule) ? rule.manualRate : '1' },
    setRule(rule) { this.saved = { ...rule }; this.form = { ...rule, changeReason: '', acknowledgeOrderLock: false }; this.quote = null },
    async load() {
      const id = ++this.loadId; const currency = this.currency
      this.form = null; this.saved = null; this.quote = null; this.history = []; this.historyPanels = []; ++this.historyId; ++this.previewId
      this.previewing = false; this.historyLoading = false; this.loading = true; this.loadError = false
      try { const { resultSet } = await listUsdtRates(this.rateType); if (id !== this.loadId) return
        const rule = resultSet.rules.find(item => item.fiatCurrency === currency && item.rateType === this.rateType)
        if (!rule) throw new Error('Missing rate configuration')
        this.setRule(rule)
      } catch (_) { if (id === this.loadId) this.loadError = true } finally { if (id === this.loadId) this.loading = false }
    },
    async refresh() { if (this.saving) return; if (this.dirty) { try { await this.$confirm('刷新将丢弃当前卡片未保存的修改。', '刷新汇率', { type: 'warning' }) } catch (_) { return } } return this.load() },
    payload() { const rate = this.form.manualRate == null ? '' : String(this.form.manualRate).trim(); return { rateType: this.rateType, fiatCurrency: this.currency, enabled: this.form.enabled, manualRate: rate || null, cryptoScale: this.isPayout ? 6 : this.form.cryptoScale, version: this.form.version, changeReason: this.form.changeReason, acknowledgeOrderLock: this.form.acknowledgeOrderLock, fiatAmount: this.fiatAmount } },
    async preview() {
      if (!this.form || this.previewing) return
      const id = ++this.previewId; const payload = this.payload(); this.previewing = true; this.quote = null
      try { const { resultSet } = await previewUsdtRate(payload); if (id === this.previewId && this.form && JSON.stringify(payload) === JSON.stringify(this.payload())) this.quote = resultSet } catch (_) { /* 请求层展示错误 */ } finally { if (id === this.previewId) this.previewing = false }
    },
    async save() {
      if (!this.canEdit || !this.form || this.saving) return
      if (!this.form.changeReason || this.form.changeReason.trim().length < 3) return this.$message.warning('请填写至少 3 字的修改原因')
      if (!this.form.acknowledgeOrderLock) return this.$message.warning('请确认已锁价订单继续使用原汇率')
      const payload = this.payload(); const currency = this.currency; this.saving = true
      try { try { await this.$confirm('保存' + this.title + '：1 USDT = ' + this.effectiveRate(this.form) + ' ' + currency + '。仅影响该业务后续锁价订单。', '确认保存汇率', { type: 'warning' }) } catch (_) { return }
        const { resultSet } = await saveUsdtRate(payload)
        if (currency === this.currency) { this.setRule(resultSet); if (this.historyPanels.includes('history')) this.fetchHistory() }
        this.$message.success(this.title + '已保存')
      } catch (_) { /* 失败保留草稿，包括并发版本冲突 */ } finally { this.saving = false }
    },
    loadHistory(names) { if (names.includes('history')) this.fetchHistory() },
    async fetchHistory() { const id = ++this.historyId; const currency = this.currency; this.historyLoading = true; this.historyError = false
      try { const { resultSet } = await usdtRateHistory(currency, this.rateType); if (id === this.historyId && currency === this.currency) this.history = resultSet } catch (_) { if (id === this.historyId) { this.historyError = true; this.history = [] } } finally { if (id === this.historyId) this.historyLoading = false }
    }
  }
}
</script>

<style scoped>
.rate-card { border-radius: 10px; border-top: 3px solid #409eff; color: #34455b; }
.payout-card { border-top-color: #149b85; }
.card-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.card-heading h3 { margin: 0 0 8px; font-size: 18px; }
.card-heading p { margin: 0; font-size: 12px; color: #7b8798; }
.saved-rate { background: #f5f8fc; border: 1px solid #e4ebf3; border-radius: 8px; padding: 18px; margin-bottom: 24px; overflow-wrap: anywhere; font-size: 12px; }
.saved-rate strong { display: block; margin-top: 14px; font-size: 25px; line-height: 1.5; }
.saved-rate small { font-size: 15px; }
.saved-rate p { color: #7b8798; margin: 10px 0 0; }
.inline-hint { font-size: 12px; color: #7b8798; margin-left: 12px; }
.hint { color: #7b8798; font-size: 12px; line-height: 1.65; }
.save-row { display: flex; justify-content: space-between; gap: 12px; align-items: center; padding-bottom: 22px; }
.unsaved { color: #b57b1a; }
.preview-panel { border-top: 1px solid #edf0f5; padding-top: 20px; }
.section-title { font-size: 14px; font-weight: 600; margin-bottom: 14px; }
.section-title span { font-size: 12px; font-weight: normal; color: #7b8798; margin-left: 8px; }
.preview-controls { display: flex; align-items: center; gap: 10px; }
.quote-result { padding: 18px; border-radius: 6px; margin-top: 14px; background: #f2f8ff; overflow-wrap: anywhere; }
.payout-card .quote-result { background: #eef9f6; }
.quote-result span, .quote-result p { font-size: 12px; color: #68778b; }
.quote-result strong { display: block; font-size: 25px; color: #287ccc; margin-top: 8px; }
.payout-card .quote-result strong { color: #148d75; }
.quote-result small { font-size: 14px; }
.history { margin-top: 20px; }
.audit-json { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; }
@media (max-width: 600px) { .inline-hint { display: inline-block; margin: 8px 0 0; } .saved-rate strong { font-size: 21px; } }
</style>
