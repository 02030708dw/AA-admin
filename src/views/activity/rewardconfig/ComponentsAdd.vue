<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('Statistictype')" prop="countType">
        <el-select v-model="ruleForm.countType" :placeholder="$t('Statistictype')" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in [{ index: 1, title: 'thesameday' }, { index: 2, title: 'total' }]" :key="index"
            :value="item.index" :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('conditiontype')" prop="thresholdType">
        <el-select v-model="ruleForm.thresholdType" :placeholder="$t('conditiontype')" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in [{ index: 1, title: 'defect' }, { index: 2, title: 'ReverseLoss' }]" :key="index"
            :value="item.index" :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Rewardamount')" prop="rewardAmount">
        <el-input v-model="ruleForm.rewardAmount" />
      </el-form-item>
      <el-form-item :label="$t(conditionvalue)" prop="threshold">
        <el-input v-model="ruleForm.threshold" />
      </el-form-item>
      <el-form-item :label="$t('state')" >
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
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
        "countType": 0,
        "rewardAmount": 0,
        "status": 0,
        "threshold": 0,
        "thresholdType": 0
      },
      rules: {
        countType: [{ required: true, message: '请选择统计类型', trigger: 'blur' }],
        rewardAmount: [{ required: true, message: '请输入奖励金额', trigger: 'blur' }],
        threshold: [{ required: true, message: '请输入条件值', trigger: 'blur' }],
        thresholdType: [{ required: true, message: '请选择条件类型', trigger: 'blur' }],
      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "countType": null,
          "rewardAmount": null,
          "status": null,
          "threshold": null,
          "thresholdType": null
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