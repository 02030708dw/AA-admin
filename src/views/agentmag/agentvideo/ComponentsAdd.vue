<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="视频id" prop="videoId">
        <el-input v-model="ruleForm.videoId" />
      </el-form-item>
      <el-form-item label="播放次数">
        <el-input v-model="ruleForm.playCount" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="ruleForm.publishTime"
          type="datetime"
          :placeholder="$t('Selectdateandtime')"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="类型" prop="isAgent">
        <el-select
          v-model="ruleForm.isAgent"
          :placeholder="$t('customertype')"
          style="width: 200px"
        >
          <el-option
            v-for="(item, index) in [
              { index: 0, title: '会员' },
              { index: 1, title: '代理' },
            ]"
            :key="index"
            :value="item.index"
            :label="$t(item.title)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item :label="$t('icon')">
        <el-input v-model="ruleForm.image" />
      </el-form-item>
      <el-form-item :label="$t('state')">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
        />
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
import UploadImage from "@/components/Upload/imageDemo.vue";
export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        image: "",
        isAgent: null,
        playCount: null,
        publishTime: "",
        status: 0,
        title: "",
        videoId: null,
      },
      rules: {
        videoId: [{ required: true, message: "请输入视频id", trigger: "blur" }],
      },
      loading: false,
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          image: "",
          isAgent: null,
          playCount: null,
          publishTime: "",
          status: null,
          title: "",
          videoId: null,
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
      this.ruleForm.image = url;
    },
  },
};
</script>
