<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('Typeofclaim')">
        <el-select v-model="ruleForm.repeatableType" :placeholder="$t('Typeofclaim')" style="width: 200px">
          <el-option v-for="(item, index) in [{ index: 1, title: 'Takeonce' }, { index: 2, title: 'Receiveddaily' }]" :key="index"
            :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('RewardType')">
        <el-select v-model="ruleForm.rewardType" :placeholder="$t('RewardType')" style="width: 200px">
          <el-option v-for="(item, index) in [{ index: 1, title: 'bonus' }, { index: 2, title: 'defect' }]" :key="index"
            :value="item.index" :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('VIPlevel')">
        <el-select v-model="ruleForm.vipConfigId" :placeholder="$t('VIPlevel')" style="width: 200px">
          <el-option v-for="(item, index) in vipLevelList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Rewardvalue')">
        <el-input v-model="ruleForm.rewardValue" />
      </el-form-item>
      <el-form-item :label="$t('describe')">
        <el-input v-model="ruleForm.description" />
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
    vipLevelList: {
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
        "description": "",
        "repeatableType": 0,
        "rewardType": 0,
        "rewardValue": 0,
        "vipConfigId": 0
      },
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
          "description": "",
          "repeatableType": null,
          "rewardType": null,
          "rewardValue": null,
          "vipConfigId": null
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
