<template>
  <el-dialog
    :title="$t('EditAnnouncement')"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 标题 -->
      <el-form-item :label="$t('AnnouncementTitle')" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item :label="$t('Announcementcontent')" prop="content">
        <Toolbar
          style="border: 1px solid #ccc; border-bottom: 0px"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 350px; overflow-y: hidden; border: 1px solid #ccc"
          v-model="ruleForm.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </el-form-item>

      <!-- 公告类型 -->
      <el-form-item :label="$t('typesof')" prop="noteTypeId">
        <el-select
          v-model="ruleForm.noteTypeId"
          :placeholder="$t('Pleaseselecttheannouncementtype')"
          style="width: 30%"
        >
          <el-option
            v-for="(item, index) in noticetype"
            :key="index"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 公告状态 -->
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
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
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { NoticeData } from "@/api/message/noticetype";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: {
        excludeKeys: [
          "group-video", //去掉视频
        ],
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default",
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        title: "",
        noteTypeId: null,
        status: 0,
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
        noteTypeId: [
          { required: true, message: "请选择公告类型", trigger: "blur" },
        ],
      },
      // 公告类型
      noticetype: [],
    };
  },
  created() {
    this.getnoticetypePage();
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // 请求公告类型
    getnoticetypePage() {
      this.noticetype = [];
      NoticeData()
        .then((res) => {
          for (let i = 0; i < res.resultSet.length; i++) {
            this.noticetype.push({
              id: res.resultSet[i].id,
              name: res.resultSet[i].name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      if (!this.dialogVisible) {
        this.ruleForm = {
          title: "",
          noteTypeId: null,
          status: 0,
          content: "",
        };
      } else {
        this.ruleForm = data;
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
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
  },

  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
  <style src="@wangeditor/editor/dist/css/style.css"></style>
  <style>
</style>