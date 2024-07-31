<template>
  <el-dialog :title="$t('EditAnnouncement')" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="提示消息" prop="msg">
        <el-input v-model="ruleForm.msg" />
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input v-model="ruleForm.priority" />
      </el-form-item>
      <el-form-item label="规则描述" prop="remark">
        <el-input v-model="ruleForm.remark" />
      </el-form-item>
      <el-form-item label="条件" prop="requirement">
        <el-input v-model="ruleForm.requirement" />
      </el-form-item>
      <el-form-item label="规则名称" prop="ruleName">
        <el-input v-model="ruleForm.ruleName" />
      </el-form-item>
      <el-form-item label="跳转地址">
        <el-input v-model="ruleForm.url" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-radio v-model="ruleForm.type" :label="1">充值</el-radio>
        <el-radio v-model="ruleForm.type" :label="2">提现</el-radio>
        <el-radio v-model="ruleForm.type" :label="3">进入游戏</el-radio>
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
        id: 0,
        msg: "",
        priority: 0,
        remark: "",
        requirement: "",
        ruleName: "",
        status: 0,
        type: 0,
        url: ""
      },
      rules: {
        msg: [{ required: true, message: "请输入提示消息", trigger: "blur" }],
        priority: [{ required: true, message: "优先级", trigger: "blur" }],
        remark: [{ required: true, message: "请输入规则描述", trigger: "blur" }],
        requirement: [{ required: true, message: "请输入条件", trigger: "blur" }],
        ruleName: [{ required: true, message: "请输入规则名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        type: [{ required: true, message: "请选择规则类型", trigger: "blur" }],
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          id: 0,
          msg: "",
          priority: 0,
          remark: "",
          requirement: "",
          ruleName: "",
          status: 0,
          type: 0,
          url: ""
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
