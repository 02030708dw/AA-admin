<template>
  <!-- 新增角色弹窗 -->
  <el-dialog title="编辑角色" :visible.sync="dialogVisible" width="40%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="ruleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="角色备注" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
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
        id: "",
        roleName: "",
        code: "",
        remark: "",
        status: 0,
      },
      rules: {
        roleName: [
          { required: true, message: "清输入角色名称", trigger: "blur" },
        ],
        code: [{ required: true, message: "清输入角色编码", trigger: "blur" }],
        remark: [
          { required: true, message: "清输入角色备注", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getEditorstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          roleName: "",
          code: "",
          remark: "",
          status: 0,
        };
      } else {
        this.ruleForm = data;
      }
    },
    // 确定事件
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