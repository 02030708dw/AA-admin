<template>
  <el-dialog :title="$t('AddAnnouncementtype')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio v-model="ruleForm.type" :label="1" >体育</el-radio>
        <el-radio v-model="ruleForm.type" :label="2" >彩票</el-radio>
      </el-form-item>
      <el-form-item label="图片" prop="icon">
        <UploadImage v-if="dialogVisible" :img="ruleForm.pictureUrl" fn="activity" @Upload="getImageURL" />
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
import UploadImage from '@/components/Upload/image.vue'
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        content: "",
        pictureUrl: "",
        title: "",
        type: 0
      },
      rules: {
        note: [{ required: true, message: "请输入注释", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          content: "",
          pictureUrl: "",
          title: "",
          type: 0
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
    getImageURL(url) {
      this.ruleForm.pictureUrl = url
    },
  }
}
</script>
