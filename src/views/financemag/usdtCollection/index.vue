<template>
  <div class="usdt-collection-page">
    <div class="page-heading">
      <div><h2>USDT 主动归集</h2><p>只能从精确查询到的玩家钱包发起归集，目标必须是当前可用的 TRC20 平台钱包。</p></div>
      <el-tag type="danger" effect="plain">链上资金操作</el-tag>
    </div>
    <el-alert title="创建归集订单后请使用“查单刷新”确认状态。网络错误、处理中或状态未知时必须复用原订单查询，禁止重复创建。" type="warning" :closable="false" show-icon />

    <el-card class="merchant-card" shadow="never">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="USDT 商户">
          <el-select v-model="merchantId" filterable :loading="merchantsLoading" placeholder="请选择商户" @change="handleMerchantChange">
            <el-option v-for="item in merchants" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item><el-button icon="el-icon-refresh" :disabled="!merchantId" @click="refreshCurrent">刷新当前页面</el-button></el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <el-tabs v-model="activeTab" @tab-click="handleTab">
        <el-tab-pane label="按会员发起归集" name="players">
          <el-form class="member-search" inline size="small" @submit.native.prevent="searchPlayers">
            <el-form-item label="会员 ID"><el-input v-model.trim="memberId" maxlength="30" clearable placeholder="输入完整会员 ID（精确查询）" @keyup.enter.native="searchPlayers" /></el-form-item>
            <el-form-item><el-button type="primary" icon="el-icon-search" :disabled="!merchantId" :loading="playersLoading" @click="searchPlayers">精确查询</el-button><el-button @click="resetPlayerSearch">清空</el-button></el-form-item>
          </el-form>
          <el-table v-loading="playersLoading" :data="players" border stripe empty-text="请输入完整会员 ID 查询玩家钱包">
            <el-table-column prop="memberId" label="会员 ID" min-width="150" />
            <el-table-column prop="externalUserId" label="上游玩家 ID" min-width="170" show-overflow-tooltip />
            <el-table-column label="来源地址" min-width="330"><template slot-scope="scope"><div class="address-cell"><span :title="scope.row.sourceAddress">{{ scope.row.sourceAddress || '-' }}</span><el-button v-if="scope.row.sourceAddress" type="text" icon="el-icon-document-copy" @click="copyText(scope.row.sourceAddress)" /></div></template></el-table-column>
            <el-table-column fixed="right" label="操作" width="120"><template slot-scope="scope"><el-button v-has="'usdtCollection:create'" type="primary" size="mini" :disabled="!scope.row.sourceAddress" @click="openCollection(scope.row)">发起归集</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="归集订单与查单" name="orders">
          <div class="order-toolbar"><span>订单状态以服务端查单结果为准。</span><el-button size="small" icon="el-icon-refresh" :disabled="!merchantId" :loading="ordersLoading" @click="loadOrders">刷新列表</el-button></div>
          <el-table v-loading="ordersLoading" :data="orders" border stripe empty-text="暂无归集订单" row-key="safeOrderId">
            <el-table-column label="订单 ID" min-width="145" show-overflow-tooltip><template slot-scope="scope">{{ scope.row.safeOrderId || 'ID格式不安全' }}</template></el-table-column>
            <el-table-column prop="externalOrderNo" label="外部订单号" min-width="185" show-overflow-tooltip />
            <el-table-column prop="memberId" label="会员 ID" min-width="145" />
            <el-table-column label="来源 → 目标" min-width="300"><template slot-scope="scope"><div class="route-address"><span title="来源地址">{{ scope.row.sourceAddress || '-' }}</span><i class="el-icon-right" /><span title="目标地址">{{ scope.row.address || '-' }}</span></div></template></el-table-column>
            <el-table-column label="金额" width="125" align="right"><template slot-scope="scope">{{ amount(scope.row.amount) }} USDT</template></el-table-column>
            <el-table-column label="状态" width="125"><template slot-scope="scope"><el-tag size="small" :type="statusTag(scope.row.status)">{{ scope.row.status || 'UNKNOWN' }}</el-tag></template></el-table-column>
            <el-table-column prop="thirdPartyOrderNo" label="三方订单号" min-width="175" show-overflow-tooltip />
            <el-table-column prop="lastError" label="最后错误" min-width="220" show-overflow-tooltip />
            <el-table-column prop="createdAt" label="创建时间" min-width="165" />
            <el-table-column fixed="right" label="操作" width="105"><template slot-scope="scope"><el-button type="text" :disabled="!scope.row.safeOrderId" :loading="queryingOrderId === scope.row.safeOrderId" @click="queryOrder(scope.row)">查单刷新</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog title="创建 TRC20 主动归集订单" :visible.sync="collectionVisible" width="680px" :close-on-click-modal="false" @closed="resetCollection">
      <template v-if="collectionPlayer">
        <el-steps :active="collectionStep" simple finish-status="success"><el-step title="选择目标与金额" /><el-step title="核对并创建" /></el-steps>

        <div v-if="collectionStep === 0" class="collection-step">
          <el-alert title="来源地址来自会员精确查询结果，不能在此修改。目标钱包会在进入确认步骤时重新读取。" type="info" :closable="false" show-icon />
          <el-form ref="collectionForm" :model="collectionForm" :rules="collectionRules" label-width="110px" class="collection-form">
            <el-form-item label="会员 ID"><el-input :value="collectionPlayer.memberId" disabled /></el-form-item>
            <el-form-item label="上游玩家 ID"><el-input :value="collectionPlayer.externalUserId" disabled /></el-form-item>
            <el-form-item label="来源地址"><el-input :value="collectionPlayer.sourceAddress" disabled /></el-form-item>
            <el-form-item label="目标钱包" prop="walletId">
              <el-select v-model="collectionForm.walletId" filterable style="width: 100%" :loading="targetsLoading" placeholder="选择当前启用的 TRC20 平台钱包">
                <el-option v-for="wallet in targetWallets" :key="wallet.walletId" :value="String(wallet.walletId)" :label="targetLabel(wallet)">
                  <span>{{ wallet.walletId }} · {{ shortAddress(wallet.address) }}</span><span class="target-balance">可用 {{ amount(wallet.availableForPayout) }} USDT</span>
                </el-option>
              </el-select>
              <div v-if="!targetsLoading && !targetWallets.length" class="form-error">没有可用的 TRC20 目标钱包，请先在钱包管理中启用钱包。</div>
            </el-form-item>
            <el-form-item label="归集金额" prop="amount"><el-input v-model.trim="collectionForm.amount" maxlength="25" autocomplete="off" placeholder="最多 18 位整数、6 位小数，不支持科学计数法"><template slot="append">USDT</template></el-input></el-form-item>
          </el-form>
        </div>

        <div v-else class="collection-step">
          <el-alert title="请逐项核对。点击创建只代表提交归集订单，不代表链上已经成功。" type="warning" :closable="false" show-icon />
          <div class="confirm-grid">
            <span>商户</span><strong>{{ merchantName }}</strong>
            <span>会员 ID</span><strong>{{ collectionPlayer.memberId }}</strong>
            <span>上游玩家 ID</span><strong>{{ collectionPlayer.externalUserId }}</strong>
            <span>来源地址</span><strong class="break-all">{{ collectionPlayer.sourceAddress }}</strong>
            <span>目标钱包</span><strong>{{ selectedTarget ? selectedTarget.walletId : '-' }}</strong>
            <span>目标地址</span><strong class="break-all">{{ selectedTarget ? selectedTarget.address : '-' }}</strong>
            <span>网络</span><strong>TRC20</strong>
            <span>归集金额</span><strong class="amount-confirm">{{ collectionForm.amount }} USDT</strong>
            <span>幂等请求号</span><strong class="break-all">{{ collectionForm.requestId }}</strong>
          </div>
          <p class="retry-note">如果创建请求因网络问题失败，再次提交会复用相同请求号；即使关闭并在同一标签页重新打开，相同会员、目标和金额仍会复用。修改目标或金额后会生成新请求号。</p>
        </div>
      </template>
      <span slot="footer">
        <el-button v-if="collectionStep === 1" :disabled="createSaving" @click="collectionStep = 0">上一步</el-button>
        <el-button @click="collectionVisible = false">取消</el-button>
        <el-button v-if="collectionStep === 0" type="primary" :loading="targetsLoading" @click="prepareConfirmation">下一步：核对信息</el-button>
        <el-button v-else type="danger" :loading="createSaving" @click="submitCollection">确认创建归集订单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUsdtMerchants, listUsdtWallets, findUsdtCollectionPlayers, listUsdtCollectionOrders,
  createUsdtCollectionOrder, queryUsdtCollectionOrder
} from '@/api/finance/usdtWallet'
import {
  isValidMemberId, isValidUsdtAmount, isActiveTrc20Wallet,
  collectionFingerprint, collectionRequestStorageKey, createRequestId, statusTag, toSafeId
} from '@/views/financemag/usdtWallet/helpers'

export default {
  name: 'UsdtManualCollection',
  data() {
    return {
      merchants: [], merchantId: '', merchantsLoading: false, activeTab: 'players',
      memberId: '', players: [], playersLoading: false, playerLoadId: 0,
      orders: [], ordersLoading: false, orderLoadId: 0, queryingOrderId: '',
      collectionVisible: false, collectionStep: 0, collectionPlayer: null, targetWallets: [], targetsLoading: false, targetLoadId: 0,
      collectionForm: { walletId: '', amount: '', requestId: '', fingerprint: '' }, createSaving: false,
      collectionRules: {
        walletId: [{ required: true, message: '请选择当前可用的 TRC20 目标钱包', trigger: 'change' }],
        amount: [{ validator: (rule, value, callback) => isValidUsdtAmount(value) ? callback() : callback(new Error('请输入大于 0、最多 18 位整数和 6 位小数的普通数字')), trigger: 'blur' }]
      }
    }
  },
  computed: {
    merchantName() { const merchant = this.merchants.find(item => item.id === this.merchantId); return merchant ? merchant.name : this.merchantId },
    selectedTarget() { return this.targetWallets.find(item => String(item.walletId) === String(this.collectionForm.walletId)) || null }
  },
  created() { this.loadMerchants() },
  beforeDestroy() { ++this.playerLoadId; ++this.orderLoadId; ++this.targetLoadId },
  methods: {
    statusTag,
    amount(value) { return value == null || value === '' ? '-' : String(value) },
    shortAddress(value) { const text = String(value || ''); return text.length > 22 ? `${text.slice(0, 10)}…${text.slice(-8)}` : text },
    targetLabel(wallet) { return `${wallet.walletId} · ${this.shortAddress(wallet.address)} · 可用 ${this.amount(wallet.availableForPayout)} USDT` },
    async loadMerchants() {
      this.merchantsLoading = true
      try {
        const { resultSet } = await listUsdtMerchants()
        this.merchants = (Array.isArray(resultSet) ? resultSet : []).map(item => ({ id: toSafeId(item && item.id), name: item && item.name })).filter(item => item.id).map(item => ({ ...item, name: item.name || item.id }))
        if (!this.merchants.some(item => item.id === this.merchantId)) this.merchantId = this.merchants.length ? this.merchants[0].id : ''
        if (this.merchantId && this.activeTab === 'orders') await this.loadOrders()
      } finally { this.merchantsLoading = false }
    },
    handleMerchantChange() { this.players = []; this.memberId = ''; this.orders = []; this.resetCollection(); if (this.activeTab === 'orders') this.loadOrders() },
    handleTab(tab) { if (tab.name === 'orders' && !this.orders.length) this.loadOrders() },
    refreshCurrent() { return this.activeTab === 'orders' ? this.loadOrders() : this.searchPlayers() },
    resetPlayerSearch() { ++this.playerLoadId; this.memberId = ''; this.players = []; this.playersLoading = false },
    async searchPlayers() {
      if (!this.merchantId) return
      if (!isValidMemberId(this.memberId)) return this.$message.warning('请输入完整、仅包含数字的会员 ID')
      const requestId = ++this.playerLoadId; const merchantId = this.merchantId; const memberId = this.memberId.trim()
      this.playersLoading = true
      try {
        const { resultSet } = await findUsdtCollectionPlayers(merchantId, memberId)
        if (requestId === this.playerLoadId && merchantId === this.merchantId && memberId === this.memberId.trim()) {
          const rows = Array.isArray(resultSet) ? resultSet : []
          this.players = rows.filter(item => item && isValidMemberId(item.memberId) && String(item.memberId) === memberId && item.sourceAddress)
          if (this.players.length !== rows.length) this.$message.error('查询结果包含不匹配或非字符串会员 ID，已拒绝用于归集')
        }
      } finally { if (requestId === this.playerLoadId) this.playersLoading = false }
    },
    async loadOrders() {
      if (!this.merchantId) { this.orders = []; return }
      const requestId = ++this.orderLoadId; const merchantId = this.merchantId
      this.ordersLoading = true
      try {
        const { resultSet } = await listUsdtCollectionOrders(merchantId)
        if (requestId === this.orderLoadId && merchantId === this.merchantId) this.orders = (Array.isArray(resultSet) ? resultSet : []).map(item => ({ ...item, safeOrderId: toSafeId(item && item.id) }))
      } finally { if (requestId === this.orderLoadId) this.ordersLoading = false }
    },
    async openCollection(player) {
      this.resetCollection()
      this.collectionPlayer = { memberId: String(player.memberId), externalUserId: String(player.externalUserId || ''), sourceAddress: String(player.sourceAddress || '') }
      this.collectionVisible = true
      await this.loadTargetWallets()
    },
    resetCollection() {
      ++this.targetLoadId; this.collectionStep = 0; this.collectionPlayer = null; this.targetWallets = []; this.targetsLoading = false
      this.collectionForm = { walletId: '', amount: '', requestId: '', fingerprint: '' }
      if (this.$refs.collectionForm) this.$refs.collectionForm.clearValidate()
    },
    async loadTargetWallets() {
      if (!this.merchantId) return []
      const requestId = ++this.targetLoadId; const merchantId = this.merchantId
      this.targetsLoading = true
      try {
        const { resultSet } = await listUsdtWallets(merchantId, 'TRC20')
        const sourceRows = Array.isArray(resultSet) ? resultSet : []
        const rows = sourceRows.map(item => ({ ...item, walletId: toSafeId(item && item.walletId) })).filter(item => item.walletId && isActiveTrc20Wallet(item))
        if (requestId === this.targetLoadId && merchantId === this.merchantId) this.targetWallets = rows
        return rows
      } finally { if (requestId === this.targetLoadId) this.targetsLoading = false }
    },
    prepareConfirmation() {
      this.$refs.collectionForm.validate(async valid => {
        if (!valid || this.targetsLoading) return
        const selectedId = String(this.collectionForm.walletId); await this.loadTargetWallets()
        const target = this.targetWallets.find(item => String(item.walletId) === selectedId)
        if (!target) { this.collectionForm.walletId = ''; return this.$message.error('所选目标钱包已不可用，请重新选择') }
        const fingerprint = collectionFingerprint({ memberId: this.collectionPlayer.memberId, walletId: selectedId, amount: this.collectionForm.amount })
        if (!this.collectionForm.requestId || this.collectionForm.fingerprint !== fingerprint) this.collectionForm.requestId = this.readPendingRequestId(fingerprint) || createRequestId()
        this.collectionForm.fingerprint = fingerprint; this.collectionStep = 1
      })
    },
    async submitCollection() {
      if (!this.collectionPlayer || !this.selectedTarget || this.createSaving) return
      const fingerprint = collectionFingerprint({ memberId: this.collectionPlayer.memberId, walletId: this.collectionForm.walletId, amount: this.collectionForm.amount })
      if (!this.collectionForm.requestId || fingerprint !== this.collectionForm.fingerprint) return this.$message.error('归集信息已变化，请返回上一步重新确认')
      const payload = { memberId: this.collectionPlayer.memberId, walletId: String(this.collectionForm.walletId), amount: this.collectionForm.amount.trim(), requestId: this.collectionForm.requestId }
      this.rememberPendingRequest(payload.requestId, fingerprint)
      this.createSaving = true
      try {
        const { resultSet } = await createUsdtCollectionOrder(this.merchantId, payload)
        this.forgetPendingRequest(fingerprint, payload.requestId)
        this.$message.success(`归集订单已创建${resultSet && resultSet.id ? `：${resultSet.id}` : ''}，请查单确认`)
        this.collectionVisible = false; this.activeTab = 'orders'; await this.loadOrders()
      } finally { this.createSaving = false }
    },
    async queryOrder(row) {
      if (!row || !row.safeOrderId || this.queryingOrderId) return this.$message.error('订单 ID 不是安全字符串，已拒绝查单')
      this.queryingOrderId = row.safeOrderId
      try { await queryUsdtCollectionOrder(this.merchantId, row.safeOrderId); this.$message.success('查单已排队，请稍后刷新订单状态'); await this.loadOrders() } finally { this.queryingOrderId = '' }
    },
    pendingStorageKey(fingerprint) { return collectionRequestStorageKey(this.merchantId, fingerprint) },
    readPendingRequestId(fingerprint) {
      try { return sessionStorage.getItem(this.pendingStorageKey(fingerprint)) || '' } catch (_) { return '' }
    },
    rememberPendingRequest(requestId, fingerprint) {
      try { sessionStorage.setItem(this.pendingStorageKey(fingerprint), requestId) } catch (_) { /* current dialog still retains the ID */ }
    },
    forgetPendingRequest(fingerprint, requestId) {
      try { const key = this.pendingStorageKey(fingerprint); if (sessionStorage.getItem(key) === requestId) sessionStorage.removeItem(key) } catch (_) { /* no-op */ }
    },
    async copyText(value) {
      try { await navigator.clipboard.writeText(String(value)); this.$message.success('复制成功') } catch (_) { this.$message.warning('复制失败，请手动选择复制') }
    }
  }
}
</script>

<style scoped>
.usdt-collection-page { min-height: calc(100vh - 90px); padding: 24px; background: #f5f7fa; color: #34455b; }
.page-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 18px; }
.page-heading h2 { margin: 0 0 8px; color: #23334a; font-size: 24px; }
.page-heading p { margin: 0; color: #68778b; font-size: 13px; line-height: 1.7; }
.merchant-card, .content-card { margin-top: 18px; border-radius: 9px; }
.merchant-card /deep/ .el-card__body { padding-bottom: 2px; }
.member-search { margin: 6px 0 12px; }
.order-toolbar { display: flex; justify-content: space-between; align-items: center; margin: 5px 0 15px; color: #68778b; font-size: 13px; }
.address-cell { display: flex; align-items: center; gap: 7px; min-width: 0; }
.address-cell span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.route-address { display: grid; grid-template-columns: minmax(0, 1fr) 20px minmax(0, 1fr); gap: 6px; align-items: center; }
.route-address span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.collection-step { margin-top: 20px; }
.collection-form { margin-top: 18px; }
.target-balance { float: right; color: #8492a6; font-size: 12px; }
.form-error { color: #f56c6c; font-size: 12px; line-height: 1.6; }
.confirm-grid { display: grid; grid-template-columns: 115px minmax(0, 1fr); gap: 0; margin-top: 18px; border: 1px solid #e5e9f0; border-radius: 7px; overflow: hidden; }
.confirm-grid > span, .confirm-grid > strong { padding: 11px 13px; border-bottom: 1px solid #e5e9f0; }
.confirm-grid > span { background: #f7f9fc; color: #68778b; font-weight: normal; }
.confirm-grid > strong { font-weight: 500; }
.amount-confirm { color: #d9534f; font-size: 17px; }
.retry-note { color: #b06f00; font-size: 12px; line-height: 1.7; }
.break-all { overflow-wrap: anywhere; word-break: break-all; }
@media (max-width: 760px) { .usdt-collection-page { padding: 14px; } .page-heading { align-items: flex-start; } .page-heading h2 { font-size: 21px; } .confirm-grid { grid-template-columns: 90px minmax(0, 1fr); } }
</style>
