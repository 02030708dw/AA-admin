<template>
  <el-dialog :title="$t('EditAnnouncement')" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('Trialaddress')" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sort')" prop="sort">
        <el-input type='number' v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <UploadImage v-if="dialogVisible" :img="ruleForm.posterImage" @Upload="getImageURL" />
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
        name: "",
        id: 0,
        url: "",
        sort:0,
        posterImage: "",
      },
      rules: {
        id: [{ required: true, message: this.$t("IDnumbercannotbeempty"), trigger: "blur" }],
        name: [{ required: true, message: this.$t("Namenotentered"), trigger: "blur" }],
        url: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        sort:[{ required: true, message: "排序不能为空", trigger: "blur" }],
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          id: 0,
          url: "",
          posterImage: "",
          sort:0,
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
      this.ruleForm.posterImage = url
    },
  }
}
</script>
