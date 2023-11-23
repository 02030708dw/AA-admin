<template>
  <!-- 新增角色弹窗 -->
  <el-dialog title="新增公告" :visible.sync="dialogVisible" width="60%">
    <el-form label-position="top">
      <!-- 标题 -->
      <el-form-item label="公告标题" prop="name">
        <el-input></el-input>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item label="公告内容" prop="" s>
        <Toolbar
          style="border: 1px solid #ccc; border-bottom: 0px"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 350px; overflow-y: hidden; border: 1px solid #ccc"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </el-form-item>

      <!-- 公告类型 -->
      <el-form-item label="公告类型">
        <!-- <el-select placeholder="请选择公告类型" style="width: 100%">
          <el-option label="公告类型1"></el-option>
          <el-option label="公告类型2"></el-option>
        </el-select> -->
      </el-form-item>
      <!-- 公告状态 -->
      <el-form-item label="公告状态" prop="name">
        <el-switch :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">取 消</el-button>
      <el-button type="primary" @click="getconfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
  
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
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
        name: "",
        status: 0,
      },
      rules: {
        name: [{ required: true, message: "清输入公告类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          status: 0,
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("添加公告", this.ruleForm);
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