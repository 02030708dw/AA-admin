<template>
  <!-- 新增角色弹窗 -->
  <el-dialog title="新增公告类型" :visible.sync="dialogVisible" width="40%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="公告类型" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="公告状态" prop="status">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">取 消</el-button>
      <el-button type="primary" @click="getconfirm()">确 定</el-button>
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
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          status: 0,
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("添加公告", this.ruleForm);
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