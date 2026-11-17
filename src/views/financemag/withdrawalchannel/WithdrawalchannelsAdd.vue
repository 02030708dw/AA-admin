<template>
  <el-dialog :title="$t('Addwithdrawalchannels')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('Channelname')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型">
          <el-option v-for="(item, index) in gamertype" :key="index" :label="item.title"
            :value="item.index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 3" label="USDT 代付网络" prop="usdtNetwork">
        <el-select v-model="ruleForm.usdtNetwork" clearable placeholder="未配置时不能发起USDT代付">
          <el-option label="TRC20" value="TRC20" />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">取 消</el-button>
      <el-button type="primary" @click="getconfirm()">确 定</el-button>
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
        name: "",
        status: 0,
        type: null,
        usdtNetwork: null,
      },
      //游戏类型选项
      gamertype: [
        { title: '银行卡', index: 0 },
        { title: '支付宝', index: 1 },
        { title: '微信', index: 2 },
        { title: '虚拟币', index: 3 },
        { title: 'Gcash', index: 4 },
        { title: 'MAYA', index: 5 }
      ],
      rules: {
        name: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          status: 0,
          type: null,
          usdtNetwork: null,
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("confirm", { ...this.ruleForm, usdtNetwork: this.ruleForm.type === 3 ? this.ruleForm.usdtNetwork : null });
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
<style></style>
