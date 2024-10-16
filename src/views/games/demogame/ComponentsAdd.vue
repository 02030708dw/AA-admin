<template>
  <el-dialog title="试玩游戏添加" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('GamemerchantsID')" prop="gamerId">
        <el-input v-model="ruleForm.gamerId" />
      </el-form-item>
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="试玩地址" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="游戏ID" prop="gameId">
        <el-input v-model="ruleForm.gameId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <UploadImage v-if="dialogVisible" @Upload="getImageURL" />
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
        url: "",
        gameId: "",
        gamerId:"",
        status: 0,
        posterImage: 0,
      },
      rules: {
        gamerId: [{ required: true, message: this.$t("GamerIDnotentered"), trigger: "blur" }],
        name: [{ required: true, message: this.$t("Namenotentered"), trigger: "blur" }],
        url: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        gameId: [{ required: true, message: this.$t("GameIDnotentered"), trigger: "blur" }],

      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          url: "",
          gameId: "",
          gamerId:"",
          status: 0,
          posterImage: 0,
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
      this.ruleForm.posterImage = url
    },
  },
};
</script>