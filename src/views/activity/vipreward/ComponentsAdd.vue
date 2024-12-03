<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="领取类型">
        <el-select v-model="ruleForm.repeatableType" placeholder="领取类型" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in [{ index: 1, title: '领一次' }, { index: 2, title: '每天领取' }]" :key="index"
            :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="奖励类型">
        <el-select v-model="ruleForm.rewardType" placeholder="奖励类型" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in [{ index: 1, title: '奖金' }, { index: 2, title: '反水' }]" :key="index"
            :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="vip等级配置id">
        <el-input v-model="ruleForm.vipConfigId" />
      </el-form-item>
      <el-form-item label="奖励数值">
        <el-input v-model="ruleForm.rewardValue" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="ruleForm.description" />
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
        "description": "",
        "repeatableType": 0,
        "rewardType": 0,
        "rewardValue": 0,
        "vipConfigId": 0
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
          "description": "",
          "repeatableType": null,
          "rewardType": null,
          "rewardValue": null,
          "vipConfigId": null
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