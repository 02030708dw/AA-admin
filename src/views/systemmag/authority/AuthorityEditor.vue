<template>
  <el-dialog
    :title="$t('addpermission')"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('PermissionName')" prop="authorityName">
        <el-input v-model="ruleForm.authorityName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Permissioncode')" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Permissiontype')" prop="type">
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择权限类型"
          style="width: 40%"
        >
          <el-option
            v-for="(item, index) in Authoritytype"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('ParentnodeID')" prop="parentId">
        <el-input v-model="ruleForm.parentId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Notes')" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
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
        authorityName: "",
        code: "",
        parentId: null,
        remark: "",
        status: 0,
        type: null,
      },
      //权限类型
      Authoritytype: [
        { value: 1, label: "菜单" },
        { value: 2, label: "按钮" },
        { value: 3, label: "功能" },
      ],

      rules: {
        authorityName: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入权限编码", trigger: "blur" }],
        type: [
          { required: true, message: "请输入选择权限类型", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择权限类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          authorityName: "",
          code: "",
          parentId: null,
          remark: "",
          status: 0,
          type: null,
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