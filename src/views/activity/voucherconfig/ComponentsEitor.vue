<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">普通</el-radio>
          <el-radio :label="2">炒群</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代金券名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="代金券金额" prop="amount">
        <el-input v-model="ruleForm.amount" />
      </el-form-item>
      <el-form-item label="有效期(小时)" prop="expirationDate">
        <el-input v-model="ruleForm.expirationDate" />
      </el-form-item>
      <el-form-item label="最低充值金额条件" prop="minRecharge">
        <el-input v-model="ruleForm.minRecharge" />
      </el-form-item>
      <el-form-item label="最大流水倍数" prop="maxTurnoverMultiple">
        <el-input v-model="ruleForm.maxTurnoverMultiple" />
      </el-form-item>
      <el-form-item label="最小流水倍数" prop="minTurnoverMultiple">
        <el-input v-model="ruleForm.minTurnoverMultiple" />
      </el-form-item>
      <el-form-item label="触发条件值" prop="conditionValue">
        <el-input v-model="ruleForm.conditionValue" />
      </el-form-item>
      <el-form-item label='触发类型' prop="triggerType">
        <el-select v-model="ruleForm.triggerType" :placeholder="$t('conditiontype')"
          style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in triggerTypeList" :key="index" :value="item.index"
            :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
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
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "amount": 0,
        "conditionValue": 0,
        "expirationDate": 0,
        "maxTurnoverMultiple": 0,
        "minRecharge": 0,
        "minTurnoverMultiple": 0,
        "name": "",
        "status": 0,
        "triggerType": 0,
        type: null
      },
      rules: {
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        conditionValue: [{ required: true, message: '请输入触发条件值', trigger: 'blur' }],
        expirationDate: [{ required: true, message: '请输入有效期(小时)', trigger: 'blur' }],
        minRecharge: [{ required: true, message: '请输入最低充值金额条件', trigger: 'blur' }],
        name: [{ required: true, message: '请输入代金券名称', trigger: 'blur' }],
        triggerType: [{ required: true, message: '请选择触发类型', trigger: 'blur' }],
        maxTurnoverMultiple: [{ required: true, message: '请输入最大流水倍数', trigger: 'blur' }],
        minTurnoverMultiple: [{ required: true, message: '请输入最小流水倍数', trigger: 'blur' }],
      },
      triggerTypeList: [
        { index: 1, title: '注册' },
        { index: 2, title: '使用优惠券次数' },
        { index: 3, title: '单笔充值总额' },
        { index: 4, title: '充值次数' },
        { index: 5, title: '累计充值' },
      ],
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "amount": null,
          "conditionValue": null,
          "expirationDate": null,
          "minRecharge": null,
          "name": "",
          "status": 0,
          "triggerType": null,
          "maxTurnoverMultiple": null,
          "minTurnoverMultiple": null,
        }
      } else {
        this.ruleForm = { ...data }
      }
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
  }
}
</script>
