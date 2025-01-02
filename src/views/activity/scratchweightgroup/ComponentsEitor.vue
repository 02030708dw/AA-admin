<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="权重组名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="刮刮乐活动配置id" prop="scratchConfigId">
        <el-input v-model="ruleForm.scratchConfigId" />
      </el-form-item>
      <el-form-item :label="$t('describe')">
        <el-input v-model="ruleForm.description" />
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
        "description": "",
        "name": "",
        "scratchConfigId": 0
      },
      rules: {
        name: [{ required: true, message: '请输入权重组名称', trigger: 'blur' }],
        scratchConfigId: [
          { required: true, message: '请输入刮刮乐活动配置id', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "description": "",
          "name": "",
          "scratchConfigId": null
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
