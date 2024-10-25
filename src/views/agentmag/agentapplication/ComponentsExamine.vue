<template>
  <el-dialog :title="$t('EditAnnouncement')" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="审核状态" prop="status">
        <el-select v-model="ruleForm.status" :placeholder="$t('state')" style="width: 200px">
          <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('notes')" prop="name">
        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="ruleForm.remarks" />
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
import UploadImage from '@/components/Upload/imageDemo.vue'
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        id: 0,
        remarks: "",
        status: ""
      },
      rules: {
        status: [
          { required: true, message: "审核状态不能为空", trigger: "blur" },
        ],
      },
      statusType: [
        { title: '通过', index: 2 },
        { title: '拒绝', index: 3 }
      ],
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      this.ruleForm = {
        id: 0,
        remarks: "",
        status: ""
      }
      this.ruleForm.id = data.id
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
