<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('ExplanatoryNote')" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sort')" prop="sort">
        <el-input type="number" v-model.number="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('类型')" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">轮播广告</el-radio>
          <el-radio :label="2">弹窗广告</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <UploadImage v-if="dialogVisible" fn="banner" @Upload="getImageURL" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
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
import UploadImage from "@/components/Upload/image.vue";
export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        note: "",
        pictureInfos: "",
        sort: null,
        status: 0,
        type: 1,
      },
      rules: {
        note: [{ required: true, message: "请输入注释", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          note: "",
          pictureInfos: "",
          sort: null,
          status: 0,
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, "this.ruleForm");
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
      this.ruleForm.pictureInfos = url;
    },
  },
};
</script>
