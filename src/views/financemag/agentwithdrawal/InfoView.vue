<!-- eslint-disable vue/return-in-computed-property -->
<template>
  <!-- 查看详情 -->
  <el-dialog
    title="代理提现详情"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('WithdrawalchannelID')">
        <el-input v-model="ruleForm.cashChannelId" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('Nameofwithdrawalbank')">
        <el-input v-model="ruleForm.bankName" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('Withdrawalbankcardnumber')">
        <el-input v-model="ruleForm.bankCardNo" :disabled="true" />
      </el-form-item>

      <el-form-item :label="$t('Alipayaccount')">
        <el-input v-model="ruleForm.alipay" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('Virtualcoinaddress')">
        <el-input v-model="ruleForm.coin" :disabled="true" />
      </el-form-item>

      <el-form-item :label="$t('amountofmoney')">
        <el-input v-model="ruleForm.amount" :disabled="true" />
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

