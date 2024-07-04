<template>
  <!-- 新增角色弹窗 -->
  <el-dialog :title="$t('Adduser')" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('name')" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('phone')" prop="telPhone">
        <el-input v-model="ruleForm.telPhone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
      </el-form-item>
      <el-form-item :label="$t('RoleName')" prop="status">
        <el-checkbox-group v-model="ruleForm.roleIdS">
              <el-checkbox v-for="(item, index) in roleIdSList" :key="index" :label="item.id">
                {{ item.roleName }}
              </el-checkbox>
        </el-checkbox-group>
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
import { getrolePage } from '@/api/account/user'
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      //表单数据
      ruleForm: {
        status: 0,
        telPhone: "",
        userName: "",
        roleIdS:[]
      },
      roleIdSList:[],
      rules: {
        telPhone: [
          { required: true, message: "请输入用户手机号", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
    
      // 关闭时清空
      if (!this.dialogVisible) {
        getrolePage().then(res=>{
          this.roleIdSList = res.resultSet.data
        })
        this.ruleForm = {
          status: 0,
          telPhone: "",
          userName: "",
          roleIdS:[]
        };
      }else{
    
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