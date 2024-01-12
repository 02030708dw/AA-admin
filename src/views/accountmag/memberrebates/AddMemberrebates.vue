<template>
  <el-dialog title="添加会员返点" :visible.sync="dialogVisible" width="30%">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择游戏商" prop="gamerId">
        <el-select
          v-model="ruleForm.gamerId"
          placeholder="选择游戏商"
          style="width: 200px; margin-left: 10px"
        >
          <el-option
            v-for="(item, index) in gamerIdData"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择会员" prop="memberId">
        <el-select
          v-model="ruleForm.memberId"
          placeholder="选择会员"
          style="width: 200px; margin-left: 10px"
        >
          <el-option
            v-for="(item, index) in memberData"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="返点率" prop="rate">
        <el-input v-model="ruleForm.rate" style="width: 200px;" />
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
    memberData: {
      type: Array,
      default: () => {
        return []
      }
    },
    gamerIdData: {
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
        gamerId: '',
        memberId: '',
        rate: ''
      },
      rules: {
        gamerId: [{ required: true, message: '请输入游戏id', trigger: 'blur' }],
        memberId: [{ required: true, message: '请输入会员id', trigger: 'blur' }],
        rate: [{ required: true, message: '请输入返点率', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          gamerId: '',
          memberId: '',
          rate: ''
        }
      }
      this.dialogVisible = !this.dialogVisible
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
