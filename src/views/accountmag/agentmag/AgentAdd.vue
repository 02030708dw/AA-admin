<template>
  <el-dialog :title="$t('AddProxy')" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('Allocablerebates')" prop="assiRate">
        <el-input v-model="ruleForm.assiRate" />
      </el-form-item>
      <el-form-item :label="$t('realName')" prop="realName">
        <el-input v-model="ruleForm.realName" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item :label="$t('phone')" prop="telPhone">
        <el-input v-model="ruleForm.telPhone" />
      </el-form-item>
      <el-form-item :label="$t('username')" prop="userName">
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item :label="$t('parentId')" prop="">
        <el-input v-model="ruleForm.parentId" />
      </el-form-item>
      <el-form-item :label="$t('Superiorrebate')" prop="">
        <el-input v-model="ruleForm.parentRate" />
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
      // 表单数据
      ruleForm: {
        assiRate: '', // 可分配返点
        realName: '', // 真实姓名
        status: 0, // 状态
        telPhone: '', // 电话
        userName: '', // 用户名
        parentId: '', // 上级代理ip
        parentRate: '' // 上级返点
      },
      rules: {
        assiRate: [{ required: true, message: '请输入可分配返点', trigger: 'blur' }],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        telPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          assiRate: '', // 可分配返点
          realName: '', // 真实姓名
          status: 0, // 状态
          telPhone: '', // 电话
          userName: '', // 用户名
          parentId: '', // 上级代理ip
          parentRate: '' // 上级返点
        }
      }
      this.dialogVisible = !this.dialogVisible
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
    }
  }
}
</script>
    <style>
  </style>

