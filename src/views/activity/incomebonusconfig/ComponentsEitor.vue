<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('Statistictype')" prop="countType">
        <el-select v-model="ruleForm.countType" :placeholder="$t('Statistictype')" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in [{ index: 1, title: 'thesameday' }, { index: 2, title: 'total' }]" :key="index"
            :value="item.index" :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Quantityofredenvelopes')" prop="bonusNumbers">
        <el-input v-model="ruleForm.bonusNumbers" />
      </el-form-item>
      <el-form-item :label="$t('Maximumvalueofrandomredenvelope')" prop="randomMax">
        <el-input v-model="ruleForm.randomMax" />
      </el-form-item>
      <el-form-item :label="$t('Minimumvalueofrandomredenvelope')" prop="randomMin">
        <el-input v-model="ruleForm.randomMin" />
      </el-form-item>
      <el-form-item :label="$t('Rechargeconditionamount')" prop="rechargeAmount">
        <el-input v-model="ruleForm.rechargeAmount" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
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
        "bonusNumbers": 0,
        "countType": 0,
        "randomMax": 0,
        "randomMin": 0,
        "rechargeAmount": 0,
        "status": 0
      },
      rules: {
        bonusNumbers: [{ required: true, message: '请输入红包数量', trigger: 'blur' }],
        countType: [{ required: true, message: '请选择统计类型', trigger: 'blur' }],
        randomMax: [{ required: true, message: '请输入红包最大值', trigger: 'blur' }],
        randomMin: [{ required: true, message: '请输入红包最小值', trigger: 'blur' }],
        rechargeAmount: [{ required: true, message: '请输入充值条件金额', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "bonusNumbers": null,
          "countType": null,
          "randomMax": null,
          "randomMin": null,
          "rechargeAmount": null,
          "status": null
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
