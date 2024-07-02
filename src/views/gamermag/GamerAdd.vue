<template>
  <el-dialog
    :title="$t('AddGameMerchant')"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('GameMerchantName')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <el-form-item label="支持币种" prop="currency">
        <el-checkbox-group v-model="ruleForm.currency">
          <el-checkbox label="THB"></el-checkbox>
          <el-checkbox label="IDR"></el-checkbox>
          <el-checkbox label="VND"></el-checkbox>
          <el-checkbox label="PHP"></el-checkbox>
        </el-checkbox-group>
        <!-- <el-input v-model="ruleForm.currency" /> -->
      </el-form-item>
      <el-form-item label="会员返点比例" prop="memberRate">
        <el-input v-model="ruleForm.memberRate" />
      </el-form-item>
      <el-form-item label="游戏商抽成比例" prop="rate">
        <el-input v-model="ruleForm.rate" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="types">
        <el-checkbox-group v-model="ruleForm.types">
          <el-checkbox v-for="(item, index) in gamertype" :key="index" :label="item.value">
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
        <!-- <el-select
          v-model="ruleForm.type"
          :placeholder="$t('Pleaseselectagametype')"
        >
          <el-option
            v-for="(item, index) in gamertype"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">
        {{ $t("determine") }}</el-button
      >
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
        name: "",
        status: 0,
        types: [],
        memberRate: "",
        currency: [],
        code: "",
        rate: "",
      },
      // 游戏类型选项
      gamertype: [
        { label: "未分类", value: 0 },
        { label: "电子（捕鱼+slot）", value: 1 },
        { label: "棋牌", value: 2 },
        { label: "彩票", value: 3 },
        { label: "体育", value: 4 },
        { label: "真人", value: 5 },
        { label: "小游戏", value: 6 },
        { label: "热门", value: 7 },
      ],
      rules: {
        name: [
          { required: true, message: "请输入游戏商名称", trigger: "blur" },
        ],
        types: [{ required: true, message: "请选择游戏类型", trigger: "blur" }],
        memberRate: [
          { required: true, message: "请输入会员返点比例", trigger: "blur" },
        ],
        currency: [
          { required: true, message: "请选择支持币种", trigger: "blur" },
        ],
        code: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur",
          },
        ],
        rate: [
          {
            required: true,
            message: "请输入游戏商抽成比例",
            trigger: "blur",
          },
        ],
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
          types: [],
          memberRate: "",
          currency: [],
          code: "",
        };
      }
      this.dialogVisible = !this.dialogVisible;
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
<style></style>
