<template>
  <!-- 添加币种弹窗 -->
  <el-dialog :title="$t('修改代理平台游戏信息')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('游戏ID')" prop="gameId">
        <el-input v-model="ruleForm.gameId" />
      </el-form-item>
      <el-form-item :label="$t('游戏名称')" prop="gameName">
        <el-input v-model="ruleForm.gameName" />
      </el-form-item>
      <el-form-item :label="$t('玩法ID')" prop="gamePlayId">
        <el-input v-model="ruleForm.gamePlayId" />
      </el-form-item>
      <el-form-item :label="$t('玩法名称')" prop="gamePlayName">
        <el-input v-model="ruleForm.gamePlayName" />
      </el-form-item>
      <el-form-item :label="$t('游戏类型ID')" prop="gamePlayTypeId">
        <el-input v-model="ruleForm.gamePlayTypeId" />
      </el-form-item>
      <el-form-item :label="$t('游戏类型名称')" prop="gamePlayTypeName">
        <el-input v-model="ruleForm.gamePlayTypeName" />
      </el-form-item>
      <el-form-item :label="$t('单注中奖金额')" prop="winAmount">
        <el-input v-model="ruleForm.winAmount" />
      </el-form-item>
      <el-form-item :label="$t('单倍满水金额')" prop="fullAmount">
        <el-input v-model="ruleForm.fullAmount" />
      </el-form-item>
      <el-form-item :label="$t('展示标识')">
        <el-select clearable v-model="ruleForm.sign" :placeholder="$t('是否展示')" style="width: 200px;margin:0 5px">
          <el-option v-for="(item, index) in [{ index: 1, title: '展示' }, { index: 0, title: '不展示' }]" :key="index"
            :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getEditstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">
        {{ $t("determine") }}</el-button>
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
        "gameId": null,
        "gameName": "",
        "gamePlayId": null,
        "gamePlayName": null,
        "gamePlayTypeId": null,
        "gamePlayTypeName": null,
        "sign": null,
        "winAmount": null,
        "fullAmount": null
      },
      rules: {
        gameId: [{ required: true, message: "请输入游戏ID", trigger: "blur" }],
        gameName: [{ required: true, message: "请输入游戏名称", trigger: "blur" }],
        gamePlayId: [{ required: true, message: "请输入玩法ID", trigger: "blur" }],
        gamePlayName: [{ required: true, message: "请输入玩法名称", trigger: "blur" }],
        gamePlayTypeId: [{ required: true, message: "请输入游戏类型ID", trigger: "blur" }],
        gamePlayTypeName: [{ required: true, message: "请输入游戏类型名称", trigger: "blur" }],
        winAmount: [{ required: true, message: "请输入单注中奖金额", trigger: "blur" }],
        fullAmount: [{ required: true, message: "请输入单倍满水金额", trigger: "blur" }],

      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      if (!this.dialogVisible) {
        this.ruleForm = {
          "gameId": null,
          "gameName": "",
          "gamePlayId": null,
          "gamePlayName": null,
          "gamePlayTypeId": null,
          "gamePlayTypeName": null,
          "sign": null,
          "winAmount": null,
          "fullAmount": null
        };
      } else {
        this.ruleForm = { ...data };
      }
    },
    // 确定事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
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
<style lang="scss" scoped></style>
