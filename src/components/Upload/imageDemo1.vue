<template>
  <div class="upload-list">
    <div class="upload-img">
      <el-upload
        action=""
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="httpRequest"
        accept="image/*,video/mp4"
      >
        <!-- 图片显示 -->
        <img
          v-if="isImage && imageURL && !imageFlag"
          :src="base_img + imageURL"
          class="avatar"
        />

        <!-- 视频显示 -->
        <video
          v-else-if="isVideo && imageURL && !imageFlag"
          :src="base_img + imageURL"
          controls
          class="avatar"
          style="width: 100px; height: 100px"
        ></video>

        <!-- 上传图标 -->
        <i v-else-if="!imageFlag" class="el-icon-plus avatar-uploader-icon"></i>

        <!-- 进度条 -->
        <el-progress
          v-if="imageFlag"
          type="circle"
          :percentage="UploadPercent"
        ></el-progress>
      </el-upload>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "UploadImage",
  props: {
    img: {
      type: String,
      default: "",
    },
    code: {
      type: String,
      default: "",
    },
    Fn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imageURL: "",
      imageFlag: false,
      UploadPercent: 0,
      base_img: "",
      isImage: false,
      isVideo: false,
    };
  },
  created() {
    this.base_img =
      process.env.NODE_ENV === "development"
        ? "https://gwstatic.mvkbnb.com/"
        : "https://static.44dog.cc/";
    this.imageURL = this.img;
    this.updateFileType(this.img);
  },
  methods: {
    httpRequest(item) {
      this.UploadPercent = 0;
      this.imageFlag = true;
      const Fn = this.Fn || "demogame";

      // 判断类型
      this.isImage = item.file.type.startsWith("image/");
      this.isVideo = item.file.type === "video/mp4";

      const formData = new FormData();
      formData.append("file", item.file);

      request({
        url: this.isImage ? `/upload/image/single` : `/upload/image/video`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Function: Fn,
          GamerCode: "",
        },
        onUploadProgress: (progressEvent) => {
          this.UploadPercent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
        },
      })
        .then((res) => {
          this.imageFlag = false;
          this.imageURL = res.resultSet;
          this.$emit("Upload", res.resultSet);
          this.$message.success("上传成功！");
        })
        .catch((err) => {
          console.log(err);
          this.imageFlag = false;
          this.UploadPercent = 0;
          this.imageURL = "";
          this.$message.error("出错了！");
        });
    },
    updateFileType(fileUrl) {
      if (!fileUrl) {
        this.isImage = false;
        this.isVideo = false;
        return;
      }
      const ext = fileUrl.split(".").pop().toLowerCase();
      this.isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
      this.isVideo = ["mp4", "mov", "webm"].includes(ext);
    },
  },
};
</script>

<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: cover;
  border-radius: 6px;
}
</style>
