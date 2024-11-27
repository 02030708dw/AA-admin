<template>
  <el-dialog
    :title="$t('Editingchannels')"
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
      <el-form-item :label="$t('Channelname')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Channeltype')" prop="type">
        <el-select
      v-model="ruleForm.type"
      :placeholder="$t('Channeltype')"
      style="width: 200px"
    >
      <el-option
        v-for="(item, index) in typeArrList"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
      </el-form-item>
      <el-form-item :label="$t('SelectCurrency')" prop="currency">
        <el-checkbox-group v-model="ruleForm.currency">
          <el-checkbox v-for="v in CurrencytPageData" :label="v.item" :key="v.index">{{v.item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item :label="$t('state')" prop="status">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
      </el-form-item> -->
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
    CurrencytPageData:{
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
      //表单数据
      ruleForm: {
        name: "",
        status: 0,
        type: null,
        currency: [],
      },
      //游戏类型选项
      typeArrList: [
        { title: '银行卡', index: 0 },
        { title: '支付宝', index: 1 },
        { title: '微信', index: 2 },
        { title: '虚拟币', index: 3 },
        { title: 'QR支付', index: 4 },
        { title: 'gcash充值', index: 5 },
        { title: 'PMP充值', index: 6 },
        { title: 'UBP充值', index: 7 },
        { title: 'usdt充值', index: 8 },
        { title: 'MAYA充值', index: 9 },
        { title: '网银', index: 10 },
      ],
      rules: {
        name: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入渠道类型", trigger: "blur" }],
        currency: [{ required: true, message: '请选择币种类型', trigger: 'blur' }]
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
          name: "",
          status: 0,
          type: null,
          currency: [],
        };
      } else {
        this.ruleForm = {...data};
        //回显
        this.ruleForm.currency = data.currency.split(',')
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.currency = this.ruleForm.currency.join(',')
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