<template>
  <el-dialog :title="$t('edit')" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('ExplanatoryNote')" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sort')" prop="sort">
        <el-input type='number' v-model.number="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <UploadImage v-if="dialogVisible" :img="ruleForm.pictureUrl" fn="banner" @Upload="getImageURL"/>
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
  components:{
    UploadImage
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        note: '',
        pictureInfos: '',
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
          pictureInfos: '',
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
    getImageURL(url){
      this.ruleForm.pictureInfos = url
    },
  }
}
</script>
