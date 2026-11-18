<template>
  <div class="usdt-wallet-page">
    <div class="page-heading">
      <div>
        <h2>USDT 钱包管理</h2>
        <p>查看服务端钱包余额与路由状态。私钥必须先通过供应商工具加密，后台不接收明文私钥或加密密钥。</p>
      </div>
      <el-tag type="warning" effect="plain">敏感资金操作</el-tag>
    </div>

    <el-alert
      title="钱包启停、路由和签名器变更只影响后续任务。任何状态不明的代付或归集都应先查单，禁止重复付款。"
      type="warning"
      :closable="false"
      show-icon
    />

    <el-card class="toolbar" shadow="never">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="USDT 商户">
          <el-select v-model="merchantId" filterable :loading="merchantsLoading" placeholder="请选择商户" @change="handleMerchantChange">
            <el-option v-for="item in merchants" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="网络">
          <el-select v-model="network" clearable placeholder="全部网络" @change="loadWallets">
            <el-option v-for="item in networks" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" :disabled="!merchantId" :loading="walletsLoading" @click="loadWallets">查询</el-button>
          <el-button icon="el-icon-refresh" :disabled="!merchantId" @click="refreshPage">刷新</el-button>
          <el-button v-has="'usdtWallet:edit'" type="success" icon="el-icon-plus" :disabled="!merchantId" @click="openCreate">新增钱包</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="wallet-card" shadow="never">
      <el-table v-loading="walletsLoading" :data="wallets" border stripe empty-text="暂无钱包" row-key="walletId">
        <el-table-column prop="walletId" label="钱包 ID" min-width="145" show-overflow-tooltip />
        <el-table-column prop="network" label="网络" width="90" />
        <el-table-column label="地址" min-width="230">
          <template slot-scope="scope">
            <div class="address-cell"><span :title="scope.row.address">{{ scope.row.address || '-' }}</span><el-button v-if="scope.row.address" type="text" icon="el-icon-document-copy" @click="copyText(scope.row.address)" /></div>
          </template>
        </el-table-column>
        <el-table-column label="钱包 / 上游 / 签名器" width="190">
          <template slot-scope="scope">
            <el-tag size="mini" :type="statusTag(scope.row.status)">{{ scope.row.status || 'UNKNOWN' }}</el-tag>
            <el-tag size="mini" class="second-tag" :type="statusTag(scope.row.upstreamStatus)">{{ scope.row.upstreamStatus || 'UPSTREAM_UNKNOWN' }}</el-tag>
            <el-tag size="mini" class="second-tag" :type="statusTag(scope.row.signingStatus)">{{ scope.row.signingStatus || 'NO_SIGNER' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="USDT 余额" min-width="120" align="right"><template slot-scope="scope">{{ amount(scope.row.usdtBalance) }}</template></el-table-column>
        <el-table-column label="可用于代付" min-width="120" align="right"><template slot-scope="scope">{{ amount(scope.row.availableForPayout) }}</template></el-table-column>
        <el-table-column label="保留金额" min-width="105" align="right"><template slot-scope="scope">{{ amount(scope.row.reservedAmount) }}</template></el-table-column>
        <el-table-column label="Gas 余额" min-width="105" align="right"><template slot-scope="scope">{{ amount(scope.row.gasBalance) }}</template></el-table-column>
        <el-table-column label="路由" width="105">
          <template slot-scope="scope"><div>优先级 {{ scope.row.priority == null ? '-' : scope.row.priority }}</div><el-tag size="mini" :type="scope.row.isAutoSelectEnabled ? 'success' : 'info'">{{ scope.row.isAutoSelectEnabled ? '自动选择' : '不自动选择' }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="lastBalanceSyncTime" label="余额同步时间" min-width="165" />
        <el-table-column fixed="right" label="操作" width="315">
          <template slot-scope="scope">
            <el-button type="text" @click="openDetail(scope.row)">详情</el-button>
            <el-button type="text" :loading="isAction('refresh', scope.row)" @click="refreshWallet(scope.row)">同步余额</el-button>
            <el-button v-has="'usdtWallet:edit'" type="text" @click="openRouting(scope.row)">路由</el-button>
            <el-button v-has="'usdtWallet:edit'" type="text" :class="isWalletActive(scope.row) ? 'danger-action' : ''" :loading="isAction('status', scope.row)" @click="toggleWallet(scope.row)">{{ isWalletActive(scope.row) ? '停用' : '启用' }}</el-button>
            <el-button v-if="String(scope.row.network).toUpperCase() === 'TRC20'" v-has="'usdtWallet:signer'" type="text" @click="openSigner(scope.row)">签名器</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="新增 USDT 钱包" :visible.sync="createVisible" width="520px" :close-on-click-modal="false" @closed="resetCreate">
      <el-alert title="这里只登记钱包地址，不会创建链上钱包。网络和地址必须与供应商侧完全一致。" type="info" :closable="false" show-icon />
      <el-form ref="createForm" :model="createForm" :rules="createRules" label-width="90px" class="dialog-form">
        <el-form-item label="网络" prop="network"><el-select v-model="createForm.network" style="width: 100%" placeholder="请选择网络"><el-option v-for="item in networks" :key="item" :label="item" :value="item" /></el-select></el-form-item>
        <el-form-item label="地址" prop="address"><el-input v-model.trim="createForm.address" maxlength="255" show-word-limit autocomplete="off" placeholder="输入供应商已创建的钱包地址" /></el-form-item>
      </el-form>
      <span slot="footer"><el-button @click="createVisible = false">取消</el-button><el-button type="primary" :loading="createSaving" @click="submitCreate">确认登记</el-button></span>
    </el-dialog>

    <el-dialog title="钱包详情" :visible.sync="detailVisible" width="760px" @closed="detail = null">
      <div v-loading="detailLoading">
        <el-descriptions v-if="detail" :column="2" border size="small">
          <el-descriptions-item label="钱包 ID">{{ detail.walletId }}</el-descriptions-item><el-descriptions-item label="网络">{{ detail.network }}</el-descriptions-item>
          <el-descriptions-item label="地址" :span="2"><span class="break-all">{{ detail.address }}</span></el-descriptions-item>
          <el-descriptions-item label="钱包状态">{{ detail.status }}</el-descriptions-item><el-descriptions-item label="上游状态">{{ detail.upstreamStatus || '-' }}</el-descriptions-item>
          <el-descriptions-item label="签名器状态">{{ detail.signingStatus }}</el-descriptions-item><el-descriptions-item label="余额同步时间">{{ detail.lastBalanceSyncTime || '-' }}</el-descriptions-item>
          <el-descriptions-item label="USDT 余额">{{ amount(detail.usdtBalance) }}</el-descriptions-item><el-descriptions-item label="Gas 余额">{{ amount(detail.gasBalance) }}</el-descriptions-item>
          <el-descriptions-item label="已保留">{{ amount(detail.reservedAmount) }}</el-descriptions-item><el-descriptions-item label="最低保留">{{ amount(detail.minReserveBalance) }}</el-descriptions-item>
          <el-descriptions-item label="可用于代付">{{ amount(detail.availableForPayout) }}</el-descriptions-item><el-descriptions-item label="自动选择">{{ detail.isAutoSelectEnabled ? '是' : '否' }}</el-descriptions-item>
          <el-descriptions-item label="Energy">{{ detail.energy == null ? '-' : detail.energy }}</el-descriptions-item><el-descriptions-item label="Bandwidth">{{ detail.bandwidth == null ? '-' : detail.bandwidth }}</el-descriptions-item>
          <el-descriptions-item label="路由优先级" :span="2">{{ detail.priority == null ? '-' : detail.priority }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>

    <el-dialog title="钱包路由设置" :visible.sync="routingVisible" width="500px" :close-on-click-modal="false" @closed="resetRouting">
      <p class="dialog-note">钱包：{{ routingWallet ? routingWallet.walletId : '-' }} · {{ routingWallet ? routingWallet.address : '-' }}</p>
      <el-form ref="routingForm" :model="routingForm" :rules="routingRules" label-width="110px">
        <el-form-item label="路由优先级" prop="priority"><el-input-number v-model="routingForm.priority" :min="0" :max="2147483647" :precision="0" controls-position="right" /></el-form-item>
        <el-form-item label="允许自动选择"><el-switch v-model="routingForm.isAutoSelectEnabled" /></el-form-item>
      </el-form>
      <span slot="footer"><el-button @click="routingVisible = false">取消</el-button><el-button type="primary" :loading="routingSaving" @click="submitRouting">保存路由</el-button></span>
    </el-dialog>

    <el-dialog title="TRC20 签名器管理" :visible.sync="signerVisible" width="620px" :close-on-click-modal="false" @closed="clearSigner">
      <template v-if="signerWallet">
        <el-alert title="禁止粘贴明文私钥或 SignerEncryptionKey。这里只接受供应商工具生成的、已经加密并 Base64 编码的传输信封。" type="error" :closable="false" show-icon />
        <p class="dialog-note">钱包：{{ signerWallet.walletId }}<br>地址：<span class="break-all">{{ signerWallet.address }}</span><br>当前签名器：{{ signerWallet.signingStatus || 'NO_SIGNER' }}</p>
        <el-form ref="signerForm" :model="signerForm" :rules="signerRules" label-position="top" autocomplete="off">
          <el-form-item label="供应商加密信封（Base64）" prop="encryptedPrivateKey">
            <el-input v-model="signerForm.encryptedPrivateKey" type="password" autocomplete="new-password" maxlength="8192" placeholder="粘贴供应商工具生成的加密信封；内容不会显示或记录" @paste.native="handleSignerPaste" />
          </el-form-item>
        </el-form>
        <div class="signer-actions">
          <el-button type="primary" :loading="signerSaving" @click="submitSigner">提交加密信封</el-button>
          <el-button type="warning" :loading="isAction('signer-disable', signerWallet)" @click="disableSigner">停用签名器</el-button>
          <el-button type="danger" plain :loading="isAction('signer-delete', signerWallet)" @click="deleteSigner">删除签名器</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUsdtMerchants, listUsdtWallets, getUsdtWallet, createUsdtWallet, updateUsdtWalletRouting,
  refreshUsdtWallet, enableUsdtWallet, disableUsdtWallet, setUsdtWalletSigner,
  disableUsdtWalletSigner, deleteUsdtWalletSigner
} from '@/api/finance/usdtWallet'
import { isValidEncryptedEnvelope, statusTag, toSafeId } from './helpers'

export default {
  name: 'UsdtWalletManagement',
  data() {
    return {
      merchants: [], merchantId: '', merchantsLoading: false, network: '', networks: ['TRC20', 'ERC20', 'BEP20'],
      wallets: [], walletsLoading: false, walletLoadId: 0, actionKey: '',
      createVisible: false, createSaving: false, createForm: { network: 'TRC20', address: '' },
      createRules: { network: [{ required: true, message: '请选择网络', trigger: 'change' }], address: [{ required: true, message: '请输入钱包地址', trigger: 'blur' }, { min: 16, max: 255, message: '钱包地址长度不正确', trigger: 'blur' }] },
      detailVisible: false, detailLoading: false, detail: null, detailLoadId: 0,
      routingVisible: false, routingSaving: false, routingWallet: null, routingForm: { priority: 0, isAutoSelectEnabled: false },
      routingRules: { priority: [{ required: true, message: '请输入路由优先级', trigger: 'change' }, { validator: (rule, value, callback) => Number.isInteger(value) && value >= 0 ? callback() : callback(new Error('优先级必须是非负整数')), trigger: 'change' }] },
      signerVisible: false, signerSaving: false, signerWallet: null, signerForm: { encryptedPrivateKey: '' },
      signerRules: { encryptedPrivateKey: [{ validator: (rule, value, callback) => isValidEncryptedEnvelope(value) ? callback() : callback(new Error('请输入供应商工具生成的有效 Base64 加密信封')), trigger: 'blur' }] }
    }
  },
  created() { this.loadMerchants() },
  beforeDestroy() { ++this.walletLoadId; ++this.detailLoadId; this.clearSigner() },
  methods: {
    statusTag,
    amount(value) { return value == null || value === '' ? '-' : String(value) },
    isWalletActive(row) { return String(row && row.status || '').toUpperCase() === 'ACTIVE' },
    actionId(action, row) { return `${action}:${row && row.walletId}` },
    isAction(action, row) { return this.actionKey === this.actionId(action, row) },
    async loadMerchants() {
      this.merchantsLoading = true
      try {
        const { resultSet } = await listUsdtMerchants()
        this.merchants = (Array.isArray(resultSet) ? resultSet : []).map(item => ({ id: toSafeId(item && item.id), name: item && item.name })).filter(item => item.id).map(item => ({ ...item, name: item.name || item.id }))
        if (!this.merchants.some(item => item.id === this.merchantId)) this.merchantId = this.merchants.length ? this.merchants[0].id : ''
        if (this.merchantId) await this.loadWallets()
      } finally { this.merchantsLoading = false }
    },
    handleMerchantChange() { this.wallets = []; this.loadWallets() },
    refreshPage() { return this.loadWallets() },
    async loadWallets() {
      if (!this.merchantId) { this.wallets = []; return }
      const requestId = ++this.walletLoadId; const merchantId = this.merchantId; const network = this.network
      this.walletsLoading = true
      try {
        const { resultSet } = await listUsdtWallets(merchantId, network)
        if (requestId === this.walletLoadId && merchantId === this.merchantId) {
          const rows = Array.isArray(resultSet) ? resultSet : []
          this.wallets = rows.map(item => ({ ...item, walletId: toSafeId(item && item.walletId) })).filter(item => item.walletId)
          if (this.wallets.length !== rows.length) this.$message.error('接口返回了不安全的钱包 ID，相关记录已拒绝显示')
        }
      } finally { if (requestId === this.walletLoadId) this.walletsLoading = false }
    },
    openCreate() { this.resetCreate(); this.createVisible = true },
    resetCreate() { this.createForm = { network: 'TRC20', address: '' }; if (this.$refs.createForm) this.$refs.createForm.clearValidate() },
    submitCreate() {
      this.$refs.createForm.validate(async valid => {
        if (!valid || this.createSaving) return
        try { await this.$confirm(`确认登记 ${this.createForm.network} 钱包地址 ${this.createForm.address}？`, '确认新增钱包', { type: 'warning' }) } catch (_) { return }
        this.createSaving = true
        try { await createUsdtWallet(this.merchantId, { network: this.createForm.network, address: this.createForm.address.trim() }); this.$message.success('钱包已登记'); this.createVisible = false; await this.loadWallets() } finally { this.createSaving = false }
      })
    },
    async openDetail(row) {
      this.detail = null; this.detailVisible = true; this.detailLoading = true
      const requestId = ++this.detailLoadId
      try { const { resultSet } = await getUsdtWallet(this.merchantId, row.walletId); if (requestId === this.detailLoadId) this.detail = resultSet } finally { if (requestId === this.detailLoadId) this.detailLoading = false }
    },
    openRouting(row) { this.routingWallet = row; this.routingForm = { priority: Number.isInteger(Number(row.priority)) ? Number(row.priority) : 0, isAutoSelectEnabled: row.isAutoSelectEnabled === true }; this.routingVisible = true },
    resetRouting() { this.routingWallet = null; this.routingForm = { priority: 0, isAutoSelectEnabled: false }; if (this.$refs.routingForm) this.$refs.routingForm.clearValidate() },
    submitRouting() {
      this.$refs.routingForm.validate(async valid => {
        if (!valid || !this.routingWallet || this.routingSaving) return
        this.routingSaving = true
        try { await updateUsdtWalletRouting(this.merchantId, this.routingWallet.walletId, { priority: this.routingForm.priority, isAutoSelectEnabled: this.routingForm.isAutoSelectEnabled }); this.$message.success('路由设置已保存'); this.routingVisible = false; await this.loadWallets() } finally { this.routingSaving = false }
      })
    },
    async refreshWallet(row) {
      if (this.actionKey) return
      this.actionKey = this.actionId('refresh', row)
      try { await refreshUsdtWallet(this.merchantId, row.walletId); this.$message.success('余额同步请求已受理'); await this.loadWallets() } finally { this.actionKey = '' }
    },
    async toggleWallet(row) {
      if (this.actionKey) return
      const active = this.isWalletActive(row); const verb = active ? '停用' : '启用'
      try { await this.$confirm(`确认${verb}钱包 ${row.walletId}？该操作只影响后续任务。`, `确认${verb}`, { type: 'warning' }) } catch (_) { return }
      this.actionKey = this.actionId('status', row)
      try { await (active ? disableUsdtWallet : enableUsdtWallet)(this.merchantId, row.walletId); this.$message.success(`钱包已${verb}`); await this.loadWallets() } finally { this.actionKey = '' }
    },
    openSigner(row) {
      if (String(row.network).toUpperCase() !== 'TRC20') return this.$message.warning('签名器仅支持 TRC20 钱包')
      this.clearSigner(); this.signerWallet = row; this.signerVisible = true
    },
    clearSigner() { this.signerForm = { encryptedPrivateKey: '' }; this.signerWallet = null; if (this.$refs.signerForm) this.$refs.signerForm.clearValidate() },
    handleSignerPaste(event) {
      const text = event.clipboardData && event.clipboardData.getData('text')
      if (text && !isValidEncryptedEnvelope(text)) { event.preventDefault(); this.$message.error('拒绝粘贴：只接受供应商工具生成的 Base64 加密信封') }
    },
    submitSigner() {
      this.$refs.signerForm.validate(async valid => {
        if (!valid || !this.signerWallet || this.signerSaving) return
        try { await this.$confirm(`确认更新 TRC20 钱包 ${this.signerWallet.walletId} 的签名器？请确认内容来自供应商加密工具。`, '敏感操作确认', { type: 'warning' }) } catch (_) { return }
        const wallet = this.signerWallet; const encryptedPrivateKey = this.signerForm.encryptedPrivateKey.trim()
        this.signerForm.encryptedPrivateKey = ''
        this.signerSaving = true
        try { await setUsdtWalletSigner(this.merchantId, wallet.walletId, encryptedPrivateKey); this.$message.success('加密签名器信封已提交'); this.signerVisible = false; await this.loadWallets() } finally { this.signerSaving = false }
      })
    },
    async disableSigner() {
      if (!this.signerWallet || this.actionKey) return
      try { await this.$confirm(`确认停用钱包 ${this.signerWallet.walletId} 的签名器？`, '确认停用签名器', { type: 'warning' }) } catch (_) { return }
      const wallet = this.signerWallet; this.signerForm.encryptedPrivateKey = ''; this.actionKey = this.actionId('signer-disable', wallet)
      try { await disableUsdtWalletSigner(this.merchantId, wallet.walletId); this.$message.success('签名器已停用'); this.signerVisible = false; await this.loadWallets() } finally { this.actionKey = '' }
    },
    async deleteSigner() {
      if (!this.signerWallet || this.actionKey) return
      try { await this.$confirm(`确认删除钱包 ${this.signerWallet.walletId} 的签名器配置？删除后不能通过后台恢复。`, '高风险操作', { type: 'error', confirmButtonText: '确认删除' }) } catch (_) { return }
      const wallet = this.signerWallet; this.signerForm.encryptedPrivateKey = ''; this.actionKey = this.actionId('signer-delete', wallet)
      try { await deleteUsdtWalletSigner(this.merchantId, wallet.walletId); this.$message.success('签名器已删除'); this.signerVisible = false; await this.loadWallets() } finally { this.actionKey = '' }
    },
    async copyText(value) {
      try { await navigator.clipboard.writeText(String(value)); this.$message.success('复制成功') } catch (_) { this.$message.warning('复制失败，请手动选择复制') }
    }
  }
}
</script>

<style scoped>
.usdt-wallet-page { min-height: calc(100vh - 90px); padding: 24px; background: #f5f7fa; color: #34455b; }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
.page-heading h2 { margin: 0 0 8px; color: #23334a; font-size: 24px; }
.page-heading p, .dialog-note { margin: 0; color: #68778b; font-size: 13px; line-height: 1.7; }
.toolbar, .wallet-card { margin-top: 18px; border-radius: 9px; }
.toolbar /deep/ .el-card__body { padding-bottom: 2px; }
.address-cell { display: flex; align-items: center; gap: 7px; min-width: 0; }
.address-cell span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.second-tag { margin-top: 5px; }
.danger-action { color: #f56c6c; }
.dialog-form { margin-top: 20px; }
.dialog-note { margin: 4px 0 20px; padding: 12px; border-radius: 5px; background: #f5f7fa; overflow-wrap: anywhere; }
.break-all { overflow-wrap: anywhere; word-break: break-all; }
.signer-actions { display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; }
@media (max-width: 760px) { .usdt-wallet-page { padding: 14px; } .page-heading { align-items: flex-start; } .page-heading h2 { font-size: 21px; } }
</style>
