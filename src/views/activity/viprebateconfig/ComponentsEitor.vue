<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('GameType')">
        <el-select v-model="ruleForm.gameType" style="width: 200px;margin-right:10px;"
          :placeholder="$t('Pleaseselectagametype')">
          <el-option v-for="(item, index) in gamertype" :key="index" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Reversewaterrate')">
        <el-input v-model="ruleForm.rebate" />
      </el-form-item>
      <el-form-item :label="$t('VIPlevelconfigurationID')">
        <el-input v-model="ruleForm.vipConfigId" />
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
        "amount": 0,
        "description": "",
        "memberId": 0,
        "spinTime": ""
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
        { label: "斗鸡", value: 9 },
      ],
      rules: {

      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "amount": null,
          "description": "",
          "memberId": null,
          "spinTime": ""
        }
      } else {
        this.ruleForm = { ...data }
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.ruleForm)
          // 关闭弹窗
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
          return false
        }
      })
    },
  }
}
</script>
