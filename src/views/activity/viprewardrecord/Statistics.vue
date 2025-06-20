<template>
  <el-dialog title="手动更新反水" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="统计日期" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.date" placeholder="统计日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" @blur="onUserNameInput" style="width: 200px" />
      </el-form-item>
      <el-form-item label="等级" prop="vipLevel">
        <el-input v-model="ruleForm.vipLevel" @blur="onVipLevelInput" style="width: 200px" />
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
        "date": "",
        "userName": "",
        "vipLevel": ""
      },
      rules: {
        date: [
          { required: true, message: '统计日期不能为空', trigger: 'blur' }
        ],
        userName: [
          { validator: this.validateUserOrVip, trigger: 'blur' }
        ],
        vipLevel: [
          { validator: this.validateUserOrVip, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateUserOrVip(rule, value, callback) {
      const { userName, vipLevel } = this.ruleForm;
      if ((userName && !vipLevel) || (!userName && vipLevel)) {
        callback(new Error('用户名和等级需同时填写'));
      } else {
        callback();
      }
    },
    onUserNameInput() {
      this.$refs.ruleForm.validateField('vipLevel');
    },
    onVipLevelInput() {
      this.$refs.ruleForm.validateField('userName');
    },
    // 改变弹窗状态
    getstatus(data) {
      this.dialogVisible = !this.dialogVisible

      this.ruleForm = {
        "date": "",
        "userName": "",
        "vipLevel": ""
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
