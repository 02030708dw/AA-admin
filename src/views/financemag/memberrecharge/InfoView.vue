<!-- eslint-disable vue/return-in-computed-property -->
<template>
  <!-- 查看详情 -->
  <el-dialog
    title="会员充值详情"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('Membername')">
        <el-input v-model="ruleForm.memberName" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('amountofmoney')">
        <el-input v-model="ruleForm.amount" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('RechargeChannels')">
        <el-input v-model="channel_c" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('PaymentCardNumber')">
        <el-input v-model="ruleForm.cardNo" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('BankName')">
        <el-input v-model="ruleForm.bankName" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('payee')">
        <el-input v-model="ruleForm.payee" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('Reviewstatus')">
        <el-input v-model="Aduit_Status" :disabled="true" />
      </el-form-item>
      <el-form-item v-if="ruleForm.aduitStatus === 2" :label="$t('Reasonforrejection')">
        <el-input v-model="ruleForm.rejection" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('Audittime')">
        <el-input v-model="Aduit_Time" :disabled="true" />
      </el-form-item>
    </el-form>

  </el-dialog>
</template>
<script>
import { formatDate } from '../../../utils/formattime'
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {}
    }
  },
  computed: {
    // 时间格式化
    Aduit_Time() {
      return formatDate(this.ruleForm.aduitTime)
    },
    // 审核状态
    Aduit_Status() {
      return this.ruleForm.aduitStatus < 1 ? '待审核' : (this.ruleForm.aduitStatus < 2 ? '审核通过' : (this.ruleForm.aduitStatus < 3 ? '驳回' : '已取消'))
    },
    channel_c() {
      return this.ruleForm.channel < 1 ? '银行卡' : (this.ruleForm.channel < 2 ? '支付宝' : (this.ruleForm.channel < 3 ? '微信' : '虚拟币'))
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {}
      } else {
        this.ruleForm = data
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
