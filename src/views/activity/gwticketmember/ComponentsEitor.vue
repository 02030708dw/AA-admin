<template>
  <el-dialog :title="$t('edit')"  :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="是否是代理" prop="isAgent">
        <el-select v-model="ruleForm.isAgent" :placeholder="$t('customertype')" style="width: 200px">
          <el-option v-for="(item, index) in [{ index: 0, title: '普通用户' }, { index: 1, title: '代理' }]" :key="index"
            :value="item.index" :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item label="获得奖励投注次数">
        <el-input v-model="ruleForm.bonusNumbers" />
      </el-form-item>
      <el-form-item label="待领取奖励投注次数">
        <el-input v-model="ruleForm.pendingNumbers" />
      </el-form-item>
      <el-form-item label="已充值用户数量">
        <el-input v-model="ruleForm.recharged" />
      </el-form-item>
      <el-form-item label="已注册用户数量">
        <el-input v-model="ruleForm.registered" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-select clearable v-model="ruleForm.status" :placeholder="$t('state')" style="width: 200px">
          <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
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
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "bonusNumbers": 0,
        "gwTicketConfigId": 0,
        "isAgent": 0,
        "memberId": 0,
        "pendingNumbers": 0,
        "planId": 0,
        "recharged": 0,
        "registered": 0,
        "status": 1
      },
      rules: {
      },
      loading: false,
      statusType: [
        { index: 0, title: '禁用' },
        { index: 1, title: '正常' },
        { index: 2, title: '删除' },
      ]
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "bonusNumbers": null,
          "gwTicketConfigId": null,
          "isAgent": null,
          "memberId": null,
          "pendingNumbers": null,
          "planId": null,
          "recharged": null,
          "registered": null,
          "status": 1
        };
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
