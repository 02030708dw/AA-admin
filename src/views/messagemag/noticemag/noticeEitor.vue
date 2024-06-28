<template>
  <el-dialog
    :title="$t('EditAnnouncement')"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 标题 -->
      <el-form-item :label="$t('AnnouncementTitle')" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <!-- 内容 -->
      <el-form-item :label="$t('Announcementcontent')" prop="content">
        <Toolbar
          style="border: 1px solid #ccc; border-bottom: 0px"
          :editor="editor"
          :default-config="toolbarConfig"
          :mode="mode"
        />
        <Editor
          v-model="ruleForm.content"
          style="height: 350px; overflow-y: hidden; border: 1px solid #ccc"
          :default-config="editorConfig"
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
            v-for="(item, index) in noticetypePage"
            :key="index"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <!-- 公告状态 -->
      <el-form-item :label="$t('state')" prop="status">
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
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  props: {
    noticetypePage: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: {
        excludeKeys: [
          'group-video' // 去掉视频
        ]
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default',
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        title: '',
        noteTypeId: null,
        status: 0,
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ],
        noteTypeId: [
          { required: true, message: '请选择公告类型', trigger: 'blur' }
        ]
      }
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          title: '',
          noteTypeId: null,
          status: 0,
          content: ''
        }
      } else {
        this.ruleForm = {...data}
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
    }
  }
}
</script>
  <style src="@wangeditor/editor/dist/css/style.css"></style>
  <style>
</style>
