<template>
  <el-dialog
    :title="$t('AddGameMerchant')"
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
      <el-form-item :label="$t('GameMerchantName')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item
        :label="$t('Bettinginformationinterfaceaddress')"
        prop="betUrl"
      >
        <el-input v-model="ruleForm.betUrl" />
      </el-form-item>
      <el-form-item :label="$t('Integralinterfaceaddress')" prop="cashUrl">
        <el-input v-model="ruleForm.cashUrl" />
      </el-form-item>
      <el-form-item :label="$t('Rechargeinterfaceaddress')" prop="incomeUrl">
        <el-input v-model="ruleForm.incomeUrl" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-select
          v-model="ruleForm.type"
          :placeholder="$t('Pleaseselectagametype')"
        >
          <el-option
            v-for="(item, index) in gamertype"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <el-button type="primary" @click="getconfirm()">
        {{ $t("determine") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 表单数据
      ruleForm: {
        name: '',
        status: 0,
        type: null,
        incomeUrl: '',
        cashUrl: '',
        betUrl: ''
      },
      // 游戏类型选项
      gamertype: [
        { label: '真人', value: 1 },
        { label: '体育', value: 2 },
        { label: '老虎机', value: 3 },
        { label: '棋牌', value: 4 },
        { label: '彩票', value: 5 }
      ],
      rules: {
        name: [
          { required: true, message: '请输入游戏商名称', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择游戏类型', trigger: 'blur' }],
        incomeUrl: [
          { required: true, message: '请输入充值接口地址', trigger: 'blur' }
        ],
        cashUrl: [
          { required: true, message: '请输入积分接口地址', trigger: 'blur' }
        ],
        betUrl: [
          {
            required: true,
            message: '请输入投注信息接口地址',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: '',
          status: 0,
          type: null,
          incomeUrl: '',
          cashUrl: '',
          betUrl: ''
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
    }
  }
}
</script>
<style>
</style>
