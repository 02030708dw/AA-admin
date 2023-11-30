<template>
  <el-dialog :title="$t('Addgame')" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('gamename')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('GamemerchantsID')" prop="gamerId">
        <el-input v-model="ruleForm.gamerId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('ThirdpartyID')" prop="threeId">
        <el-input v-model="ruleForm.threeId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-input v-model="ruleForm.type"></el-input>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
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
      //表单数据
      ruleForm: {
        gamerId: null,
        name: "",
        status: 0,
        threeId: "",
        type: null,
      },

      rules: {
        name: [{ required: true, message: "请输入游戏名称", trigger: "blur" }],
        threeId: [
          { required: true, message: "请输入第三方id", trigger: "blur" },
        ],
        gamerId: [{ required: true, message: "请输游戏商id", trigger: "blur" }],
        type: [{ required: true, message: "请输游戏类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          gamerId: null,
          name: "",
          status: 0,
          threeId: "",
          type: null,
        };
      }
      this.dialogVisible = !this.dialogVisible;
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