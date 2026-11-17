<template>
  <div class="usdt-rate-page">
    <div class="page-heading"><div><h2>USDT 汇率设置</h2><p>充值与代付分别定价，分别保存。</p></div><el-tag type="info" effect="plain">后台人工定价</el-tag></div>
    <el-alert title="1 USDT = X 单位法币。未设置或关闭自定义汇率时，该业务独立按 1:1 换算。" type="info" :closable="false" show-icon />
    <el-tabs v-model="currency" class="currency-tabs" :before-leave="allowLeave">
      <el-tab-pane v-for="item in currencies" :key="item.code" :name="item.code" :label="item.code + ' · ' + item.label" :disabled="busy" />
    </el-tabs>
    <div class="rate-cards">
      <RateCard ref="deposit" :currency="currency" rate-type="DEPOSIT" :can-edit="canEditDeposit" @busy="depositBusy = $event" />
      <RateCard ref="payout" :currency="currency" rate-type="PAYOUT" :can-edit="canEditPayout" @busy="payoutBusy = $event" />
    </div>
    <p class="page-note">充值在创建订单时锁价，代付在后台受理代付时锁价。修改汇率不改变已锁价订单的金额。</p>
  </div>
</template>

<script>
import RateCard from './RateCard.vue'
export default {
  name: 'UsdtRateSettings',
  components: { RateCard },
  data() {
    return { currency: 'THB', depositBusy: false, payoutBusy: false, currencies: [
      { code: 'THB', label: '泰铢' }, { code: 'PHP', label: '菲律宾比索' }, { code: 'VND', label: '越南盾' },
      { code: 'IDR', label: '印尼盾' }, { code: 'USD', label: '美元' }
    ] }
  },
  computed: {
    permissions() { return this.$store.state.permission.btnP || [] },
    canEditPayout() { return this.permissions.includes('usdtRate:edit') },
    canEditDeposit() { return this.canEditPayout || this.permissions.includes('crechargeonfiguration:edit') },
    busy() { return this.depositBusy || this.payoutBusy }
  },
  beforeRouteLeave(to, from, next) { this.allowLeave().then(allowed => next(allowed)) },
  methods: {
    async allowLeave() {
      if (this.busy) { this.$message.warning('正在保存汇率，请稍候'); return false }
      if (!['deposit', 'payout'].some(key => this.$refs[key] && this.$refs[key].dirty)) return true
      try { await this.$confirm('离开将丢弃尚未保存的汇率修改。', '未保存的修改', { type: 'warning' }); return true } catch (_) { return false }
    }
  }
}
</script>

<style scoped>
.usdt-rate-page { padding: 24px; background: #f5f7fa; min-height: calc(100vh - 90px); }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 20px; }
.page-heading h2 { margin: 0 0 10px; font-size: 24px; color: #23334a; }
.page-heading p, .page-note { margin: 0; color: #68778b; font-size: 13px; line-height: 1.7; }
.currency-tabs { margin-top: 20px; }
.rate-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: start; }
.page-note { margin-top: 20px; }
@media (max-width: 1180px) { .rate-cards { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .usdt-rate-page { padding: 14px; } .page-heading { align-items: flex-start; } .page-heading h2 { font-size: 21px; } }
</style>
