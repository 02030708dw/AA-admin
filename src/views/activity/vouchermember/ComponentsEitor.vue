<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

      <el-form-item label="过期时间" prop="expireAt">
        <el-date-picker v-model="ruleForm.expireAt" type="datetime" placeholder="过期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用时间">
        <el-date-picker v-model="ruleForm.useAt" type="datetime" placeholder="使用时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('state')">
        <el-select v-model="ruleForm.status" placeholder="选择状态" style="width: 200px">
          <el-option v-for="(item, index) in statusList" :key="index" :value="item.index" :label="item.title" />
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
import { status } from 'nprogress';

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
        "useAt": "",
        "status": 0,
        "expireAt": null,
      },
      rules: {
        expireAt: [{ required: true, message: '请选择过期时间', trigger: 'blur' }],
      },
      statusList: [
        { index: 0, title: '未刮开' },
        { index: 1, title: '已使用' },
        { index: 2, title: '已过期' },
        { index: 3, title: '未使用' },
        { index: 4, title: '使用中' }
      ]
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "useAt": "",
          "status": 0,
          "expireAt": null,
        };
      } else {
        this.ruleForm = {
          useAt: data.useAt,
          status: data.status,
          expireAt: data.expireAt,
          id: data.id
        }
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.expireAt = this.$YMDHMS(this.ruleForm.expireAt)
          this.ruleForm.useAt = this.$YMDHMS(this.ruleForm.useAt)
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
