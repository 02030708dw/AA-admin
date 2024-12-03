<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="用户id">
        <el-input v-model="ruleForm.memberId" />
      </el-form-item>
      <el-form-item label="下次可领取时间点">
        <el-date-picker v-model="ruleForm.nextSpinTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="剩余转盘次数">
        <el-input v-model="ruleForm.remainingSpins" />
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
        "memberId": 0,
        "nextSpinTime": "",
        "remainingSpins": 0
      },
      rules: {

      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "memberId": null,
          "nextSpinTime": "",
          "remainingSpins": null
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'this.ruleForm');
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