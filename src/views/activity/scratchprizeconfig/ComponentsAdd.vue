<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

      <el-form-item label="奖金" prop="prize">
        <el-input v-model="ruleForm.prize" />
      </el-form-item>
      <el-form-item label="权重分组id" prop="scratchWeightGroupId">
        <el-select clearable v-model="ruleForm.scratchWeightGroupId" placeholder="配置id"
          style="width: 200px">
          <el-option v-for="(item, index) in WeightGroup" :key="index" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input v-model="ruleForm.weight" />
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
  props: {
    WeightGroup: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "prize": 0,
        "scratchWeightGroupId": 0,
        "weight": 0
      },
      rules: {
        prize: [{ required: true, message: '请输入奖金', trigger: 'blur' }],
        scratchWeightGroupId: [
          { required: true, message: '请输入权重分组id', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入权重', trigger: 'blur' }
        ],

      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "prize": null,
          "scratchWeightGroupId": null,
          "weight": null
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