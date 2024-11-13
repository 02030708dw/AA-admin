<template>
  <el-dialog :title="$t('规则修改')" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="条件字段" prop="filed">
        <el-input v-model="ruleForm.filed" />
      </el-form-item>
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-radio v-model="ruleForm.type" :label="1">充值</el-radio>
        <el-radio v-model="ruleForm.type" :label="2">提现</el-radio>
        <el-radio v-model="ruleForm.type" :label="3">进入游戏</el-radio>
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
        filed: '',
        name: '',
        type: null,
      },
      rules: {
        filed: [{ required: true, message: "请输入条件字段", trigger: "blur" }],
        name: [{ required: true, message: "请输入条件名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择条件类型", trigger: "blur" }],
      },
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          filed: '',
          name: '',
          type: null,
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
