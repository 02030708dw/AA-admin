<template>
  <el-dialog
    :title="$t('Bindgametypes')"
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
      <el-form-item :label="$t('GamemerchantsID')" prop="gamerId">
        <el-input v-model="ruleForm.gamerId" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="types">
        <el-checkbox-group v-model="ruleForm.types">
          <el-checkbox
            v-for="(item, index) in gamertype"
            :key="index"
            :label="item.value"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
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
        gamerId: "", // 游戏商id
        types: [], // 游戏类型
      },
      // 游戏类型选项
      gamertype: [
        { label: "未分类", value: 0 },
        { label: "电子", value: 1 },
        { label: "棋牌", value: 2 },
        { label: "彩票", value: 3 },
        { label: "体育", value: 4 },
        { label: "真人", value: 5 },
        { label: "小游戏", value: 6 },
        { label: "热门", value: 7 },
        { label: "捕鱼", value: 8 },
      ],
      rules: {
        gamerId: [
          { required: true, message: "请输入游戏商ID", trigger: "blur" },
        ],
        types: [{ required: true, message: "请选择游戏类型", trigger: "blur" }],
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
          gamerId: "", // 游戏商id
          types: [], // 游戏类型
        };
      } else {
        this.ruleForm.gamerId = data.id;
        this.ruleForm.types = data.data;
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.ruleForm);
          this.getAddstatus();
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
