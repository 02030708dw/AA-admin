<template>
  <el-dialog title="添加" :before-close="handleClose" :visible.sync="dialogVisible" width="70%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入模板名称" />
      </el-form-item>
      <el-form-item label="内容标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入内容标题" />
      </el-form-item>
      <el-form-item label="内容副标题" prop="subtitle">
        <el-input v-model="ruleForm.subtitle" placeholder="请输入内容副标题" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型" style="width: 200px">
          <el-option v-for="item in typeData" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-radio-group v-model="timeType">
          <el-radio :label="1">每天</el-radio>
          <el-radio :label="2">每N小时</el-radio>
          <el-radio :label="3">每N分钟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="timeType == 2 || timeType == 3" label="时间间隔">
        <el-input-number v-if="timeType == 2" :max="24" v-model="timeScale" placeholder="时间间隔" />
        <el-input-number v-else :max="60" v-model="timeScale" placeholder="时间间隔" />
      </el-form-item>
      <el-form-item label="时间点" v-else>
        <template>
          <el-input v-model="timeScale" placeholder="请输入时间点，如 07:00,09:00" :style="{ width: '250px' }" />
        </template>
      </el-form-item>
      <el-form-item :label="$t('content')" prop="content">
        <el-input type="textarea" v-model="ruleForm.content" :autosize="{ minRows: 5 }"></el-input>
      </el-form-item>

      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="ruleForm.link" placeholder="请输入跳转链接" />
      </el-form-item>
      <el-form-item label="图片" prop="picture">
        <UploadImage v-if="dialogVisible" Fn="groupsendmould" @Upload="getImageURL" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">取消</el-button>
      <el-button type="primary" @click="getconfirm()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import UploadImage from "@/components/Upload/imageDemo1.vue";
import Tinymce from "@/components/Editor/index.vue";
export default {
  components: {
    UploadImage,
    Tinymce,
  },
  watch: {
    timeType(newVal) {
      this.timeScale = null;
    },
  },
  data() {
    return {
      dialogVisible: false,
      timeType: null,
      timeScale: null,
      ruleForm: {
        name: "",
        title: "",
        subtitle: "",
        type: null,
        time: "",
        content: "",
        link: "",
        picture: "",
        status: null,
      },
      typeData: [
        { value: 1, label: "红包" },
        { value: 2, label: "刮刮乐" },
        { value: 3, label: "免费彩票" },
        { value: 4, label: "转盘" },
        { value: 5, label: "宾果" },
        { value: 6, label: "代金券" },
        { value: 7, label: "预告" },
      ],
      rules: {},
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    getAddstatus() {
      this.dialogVisible = !this.dialogVisible;
      this.ruleForm = {
        name: "",
        title: "",
        subtitle: "",
        type: null,
        time: "",
        content: "",
        link: "",
        picture: "",
        status: 1,
      };
      this.timeScale = null;
      this.timeType = null;
    },
    getconfirm() {
      const valid = this.updateCron();
      if (!valid) return;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.content = this.convertToTelegramHtml(
            this.ruleForm.content
          );
          this.$emit("confirm", this.ruleForm);
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
        }
      });
    },
    getImageURL(url) {
      this.ruleForm.picture = url;
    },
    updateCron() {
      let cron = "";
      if (this.timeType === 1) {
        // 每天指定时间点，例如 07:00,09:00
        if (!this.timeScale || typeof this.timeScale !== "string") {
          this.$message.warning("请输入时间点，格式如 07:00,09:00");
          return false;
        }

        const times = this.timeScale.split(",").map((t) => t.trim());
        const validTimes = times.filter((t) => /^\d{1,2}:\d{2}$/.test(t));

        if (validTimes.length !== times.length) {
          this.$message.warning("时间点格式错误，请使用 07:00 格式并用英文逗号分隔");
          return false;
        }

        // 提取小时和分钟
        const hourList = [];
        let minute = null;
        for (const t of validTimes) {
          const [h, m] = t.split(":").map(Number);
          if (h < 0 || h > 23 || m < 0 || m > 59) {
            this.$message.warning("请确保时间点在合法范围内（小时0-23，分钟0-59）");
            return false;
          }
          if (minute === null) {
            minute = m;
          } else if (minute !== m) {
            this.$message.warning("多个时间点的分钟数必须相同，例如 09:00,13:00");
            return false;
          }
          hourList.push(h);
        }

        // 合并小时
        cron = `0 ${minute} ${hourList.join(",")} * * ?`;
      } else if (this.timeType === 2) {
        // 每 N 小时
        const n = parseInt(this.timeScale);
        if (isNaN(n) || n <= 0 || n > 24) {
          this.$message.warning("请输入合法的小时间隔（1-24）");
          return false;
        }
        // 从第 0 分钟的第 0 秒开始，每 N 小时执行一次
        cron = `0 0 0/${n} * * ?`;
      } else if (this.timeType === 3) {
        // 每 N 分钟
        const n = parseInt(this.timeScale);
        if (isNaN(n) || n <= 0 || n > 60) {
          this.$message.warning("请输入合法的分钟间隔（1-60）");
          return false;
        }
        // 从第 0 秒开始，每 N 分钟执行一次
        cron = `0 0/${n} * * * ?`;
      }

      this.ruleForm.time = cron;
      return true;
    },

    convertToTelegramHtml(text) {
      return text
        .replace(/<p>/g, "") // 去掉 <p>
        .replace(/<\/p>/g, "\n") // </p> 换行
        .replace(/<br\s*\/?>/g, "\n") // <br> 或 <br/> 换行
        .replace(/&nbsp;/g, " ") // 可选：处理空格实体
        .trim(); // 去掉首尾空行
    },
  },
};
</script>
