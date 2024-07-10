<template>
  <el-dialog :title="$t('AddAnnouncementtype')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input  v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input  v-model="ruleForm.linkUrl" />
      </el-form-item>
       <el-form-item label="注释" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio v-model="ruleForm.type" :label="1" >skype</el-radio>
        <el-radio v-model="ruleForm.type" :label="2" >telegram</el-radio>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <UploadImage v-if="dialogVisible" fn="banner" @Upload="getImageURL" />
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
        account: "",
        linkUrl: "",
        note: "",
        pictureUrl: "",
        status: 0,
        type: 0
      },
      rules: {
        account: [{ required: true, message: "请输入注释", trigger: "blur" }],
        type: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          account: "",
          linkUrl: "",
          note: "",
          pictureUrl: "",
          status: 0,
          type: 0
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'this.ruleForm');
          this.$emit("confirm", this.ruleForm);
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
    getImageURL(url) {
      this.ruleForm.pictureUrl = url
    },
  },
};
</script>