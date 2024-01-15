<template>
  <el-dialog
    :title="$t('Addrechargeconfiguration')"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('AccountName')" prop="account">
        <el-input v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item :label="$t('ChannelID')" prop="channelId">
        <el-select
          v-model="ruleForm.channelId"
          placeholder="选择渠道"
          style="width: 200px"
        >
          <el-option
            v-for="(item, index) in channelidList"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="$t('ChannelID')" prop="channelId">
        <el-input v-model="ruleForm.channelId" />
      </el-form-item> -->
      <!-- 渠道类型 -->
      <el-form-item :label="$t('Channeltype')" prop="type">
        <el-select
          v-model="ruleForm.type"
          :placeholder="$t('typesof')"
          style="width: 200px"
          @change="HandelChange"
        >
          <el-option
            v-for="(item, index) in TypeList"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 1" :label="$t('Alipayaccount')" prop="alipay">
        <el-input v-model="ruleForm.alipay" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('Bankaccount')" prop="bankCardNo">
        <el-input v-model="ruleForm.bankCardNo" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('BankName')" prop="bankName">
        <el-input v-model="ruleForm.bankName" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" :label="$t('WeChataccount')" prop="wechat">
        <el-input v-model="ruleForm.wechat" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 3" :label="$t('Virtualcoinaddress')" prop="coin">
        <el-input v-model="ruleForm.coin" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">{{
        $t("determine")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    channelidList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 渠道类型
      TypeList: [
        { title: '银行卡', index: 0 },
        { title: '支付宝', index: 1 },
        { title: '微信', index: 2 },
        { title: '虚拟币', index: 3 }
      ],
      // 表单数据
      ruleForm: {
        account: '',
        alipay: '',
        bankCardNo: '',
        bankName: '',
        channelId: null,
        coin: '',
        status: 0,
        type: null,
        wechat: ''
      },
      rules: {
        account: [{ required: true, message: '请输入户名', trigger: 'blur' }],
        alipay: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' }
        ],
        bankCardNo: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '请输入渠道ID', trigger: 'blur' }
        ],
        coin: [
          { required: true, message: '请输入虚拟币地址', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入微信账号', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请输入渠道类型', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          account: '',
          alipay: '',
          bankCardNo: '',
          bankName: '',
          channelId: null,
          coin: '',
          status: 0,
          type: null,
          wechat: ''
        }
      }
      this.dialogVisible = !this.dialogVisible
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.ruleForm)
          // 关闭弹窗
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
          return false
        }
      })
    },
    HandelChange() {
      console.log(this.ruleForm.type)
    }
  }
}
</script>
    <style>
</style>
