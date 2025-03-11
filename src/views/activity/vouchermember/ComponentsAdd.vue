<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('username')" prop="userName">
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item label="流水倍数" prop="turnoverMultiple">
        <el-input v-model="ruleForm.turnoverMultiple" />
      </el-form-item>
      <el-form-item label="代金券配置" prop="voucherConfigId">
        <el-select v-model="ruleForm.voucherConfigId" placeholder="选择代金券配置" style="width: 200px">
          <el-option v-for="(item, index) in voucherConfigIdList" :key="index" :value="item.index"
            :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间" prop="expireAt">
        <el-date-picker v-model="ruleForm.expireAt" type="datetime" placeholder="过期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('state')">
        <el-select v-model="ruleForm.status" placeholder="选择状态" style="width: 200px">
          <el-option v-for="(item, index) in [{ index: 0, title: '未使用' }, { index: 3, title: '未刮开' }]" :key="index"
            :value="item.index" :label="item.title" />
        </el-select>
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
    voucherConfigIdList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "expireAt": "",
        "userName": 0,
        "status": 0,
        "voucherConfigId": 0,
        "turnoverMultiple": null
      },
      rules: {
        expireAt: [{ required: true, message: '请选择过期时间', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        voucherConfigId: [{ required: true, message: '请选择代金券配置', trigger: 'blur' }],
        turnoverMultiple: [{ required: true, message: '请输入流水倍数', trigger: 'blur' }],
      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "expireAt": "",
          "userName": null,
          "status": 0,
          "voucherConfigId": null,
          "turnoverMultiple": null
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'this.ruleForm');
          this.ruleForm.expireAt = this.$YMDHMS(this.ruleForm.expireAt)
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