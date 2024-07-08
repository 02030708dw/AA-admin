<template>
  <el-dialog :title="$t('EditAnnouncement')" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('typesof')" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input type='number' v-model.number="ruleForm.sort" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload action="#" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
          :on-error="uploadonerror">
          <img v-if="ruleForm.pictureUrl" :src="ruleForm.pictureUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
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
        note: '',
        pictureUrl: '',
        sort: null,
        status: 0,
      },
      rules: {
        note: [{ required: true, message: "请输入注释", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          note: '',
          pictureUrl: '',
          sort: null,
          status: 0,
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
    uploadonerror(err, file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.ruleForm.pictureUrl = res
      })
    },
    // 上传图片
    handleAvatarSuccess(response, file, fileList) {
      console.log(file)
      this.getBase64(file.raw).then(res => {
        this.ruleForm.pictureUrl = res
      })
    },
    // 图片转base64
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
  }
}
</script>

