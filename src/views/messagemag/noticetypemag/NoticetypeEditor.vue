<template>
  <el-dialog
    :title="$t('EditAnnouncementType')"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('typesof')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="getEditorstatus()">{{ $t("cancellation") }}</el-button>
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
        name: "",
        status: 0,
      },
      rules: {
        name: [{ required: true, message: "清输入公告类型", trigger: "blur" }],
      },
    };
  },

  methods: {
    // 改变弹窗状态
    getEditorstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          status: 0,
        };
      } else {
        this.ruleForm = { ...data };
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.ruleForm);
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>
    
    <style>
</style>