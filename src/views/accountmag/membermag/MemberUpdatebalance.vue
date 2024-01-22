<template>
  <el-dialog
    title="余额加/减"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form ref="FormData" :rules="rules" :model="FormData" label-width="110px">
      <el-form-item label="操作金额" prop="amt">
        <el-input v-model="FormData.amt" />
      </el-form-item>
      <el-form-item label="提现所需流水" prop="flowAmt">
        <el-input v-model="FormData.flowAmt" />
      </el-form-item>
      <el-form-item label="操作类型" prop="operate">
        <el-radio-group v-model="FormData.operate">
          <el-radio-button :label="1">加钱</el-radio-button>
          <el-radio-button :label="2">扣钱</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="FormData.remark"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="HandelUpdataBalance">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { MemberUpdatebalance } from '@/api/account/member'
export default {
  data() {
    return {
      dialogVisible: false,
      FormData: {
        amt: '',
        flowAmt: '',
        operate: null,
        remark: '',
        memberId: ''
      },
      rules: {
        amt: [{ required: true, message: '请输入操作金额', trigger: 'blur' }],
        flowAmt: [{ required: true, message: '请输入提现所需流水金额', trigger: 'blur' }],
        operate: [{ required: true, message: '请选择操作类型', trigger: 'blur' }]
      }
    }
  },
  methods: {
    HandelChangeShow(id = null) {
      this.dialogVisible = !this.dialogVisible
      if (this.dialogVisible) {
        this.FormData.memberId = id
      } else {
        this.FormData = {
          amt: '',
          flowAmt: '',
          operate: null,
          remark: '',
          memberId: ''
        }
      }
    },
    HandelUpdataBalance() {
      this.$refs.FormData.validate((valid) => {
        if (!valid) {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
        } else {
          MemberUpdatebalance(this.FormData).then(res => {
            this.$message({ message: '操作成功!', type: 'success' })
          }).catch(() => {
            this.$message.error('操作失败!')
          })
          this.HandelChangeShow()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
