<template>
  <el-dialog
    :title="mode === 'add' ? labels.createTitle : labels.editTitle"
    :visible.sync="dialogVisible"
    width="620px"
    @close="handleClose"
  >
    <el-alert
      v-if="mode === 'add' && selectedFile"
      type="success"
      show-icon
      :closable="false"
      class="dialog-alert"
      :title="labels.selectedFile + selectedFile.name"
      :description="selectedFile.key"
    />
    <el-alert
      v-else-if="mode === 'add'"
      type="warning"
      show-icon
      :closable="false"
      class="dialog-alert"
      :title="labels.noFileTitle"
      :description="labels.noFileDescription"
    />

    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item :label="labels.videoName" prop="videoName">
        <el-input v-model="form.videoName" maxlength="100" show-word-limit :placeholder="labels.videoNamePlaceholder" />
      </el-form-item>
      <el-form-item :label="labels.type" prop="type">
        <el-select v-model="form.type" :placeholder="labels.typePlaceholder" class="dialog-full-width">
          <el-option
            v-for="item in videoTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="requiresLotteryGame" :label="labels.gameName" prop="gameName">
        <el-select
          v-model="form.gameName"
          filterable
          :loading="gameLoading"
          :placeholder="labels.gamePlaceholder"
          class="dialog-full-width"
          @change="handleGameChange"
        >
          <el-option
            v-for="item in gameOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-row v-if="requiresLotteryGame" :gutter="12">
        <el-col :span="12">
          <el-form-item :label="labels.gameId" prop="gameId">
            <el-input :value="displayGameId" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="labels.gameCode" prop="gameCode">
            <el-input v-model="form.gameCode" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="labels.comment" prop="videoComment">
        <el-input
          v-model="form.videoComment"
          type="textarea"
          :rows="4"
          maxlength="500"
          show-word-limit
          :placeholder="labels.commentPlaceholder"
        />
      </el-form-item>
      <el-form-item :label="labels.fileName" prop="fileName">
        <el-input v-model="form.fileName" disabled :placeholder="labels.filePlaceholder" />
      </el-form-item>
      <el-form-item :label="labels.filePath" prop="filePath">
        <el-input v-model="form.filePath" disabled :placeholder="labels.filePlaceholder" />
      </el-form-item>
      <el-form-item v-if="mode === 'add'" :label="labels.pickFile">
        <el-button type="primary" plain icon="el-icon-folder-opened" @click="$emit('pick-file')">
          {{ labels.openBucket }}
        </el-button>
      </el-form-item>
      <el-form-item :label="labels.status" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ labels.cancel }}</el-button>
      <el-button type="primary" @click="handleConfirm">{{ labels.confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { VIDEO_TYPE_OPTIONS } from '@/views/shortvideo/shared/videoMeta'

export default {
  name: 'ShortVideoDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add'
    },
    record: {
      type: Object,
      default: null
    },
    selectedFile: {
      type: Object,
      default: null
    },
    gameOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    gameLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: this.getDefaultForm(),
      videoTypeOptions: VIDEO_TYPE_OPTIONS,
      labels: {
        createTitle: '\u65b0\u589e\u77ed\u89c6\u9891',
        editTitle: '\u7f16\u8f91\u77ed\u89c6\u9891',
        selectedFile: '\u5df2\u5e26\u5165\u6587\u4ef6: ',
        noFileTitle: '\u8fd8\u672a\u9009\u62e9\u6587\u4ef6',
        noFileDescription: '\u8bf7\u5148\u5230\u5b58\u50a8\u6876\u6587\u4ef6\u7ba1\u7406\u9875\u9762\u9009\u62e9\u6587\u4ef6\u3002',
        videoName: '\u89c6\u9891\u540d\u79f0',
        type: '\u89c6\u9891\u7c7b\u578b',
        typePlaceholder: '\u8bf7\u9009\u62e9\u89c6\u9891\u7c7b\u578b',
        gameName: '\u6e38\u620f\u540d\u79f0',
        gameId: '\u6e38\u620fID',
        gameCode: '\u6e38\u620fCode',
        gamePlaceholder: '\u8bf7\u9009\u62e9\u6e38\u620f\u540d\u79f0',
        comment: '\u89c6\u9891\u63cf\u8ff0',
        fileName: '\u6587\u4ef6\u540d',
        filePath: '\u6587\u4ef6\u8def\u5f84',
        pickFile: '\u9009\u62e9\u6587\u4ef6',
        openBucket: '\u524d\u5f80\u5b58\u50a8\u6876',
        status: '\u72b6\u6001',
        cancel: '\u53d6\u6d88',
        confirm: '\u786e\u5b9a',
        videoNamePlaceholder: '\u8bf7\u8f93\u5165\u89c6\u9891\u540d\u79f0',
        commentPlaceholder: '\u8bf7\u8f93\u5165\u89c6\u9891\u63cf\u8ff0',
        filePlaceholder: '\u8bf7\u4ece\u5b58\u50a8\u6876\u9009\u62e9\u6587\u4ef6',
        bucketUrlMissing: '\u5f53\u524d\u5b58\u50a8\u6876\u6587\u4ef6\u7f3a\u5c11\u64ad\u653e\u5730\u5740\uff0c\u65e0\u6cd5\u65b0\u589e'
      },
      rules: {
        videoName: [
          { required: true, message: '\u8bf7\u8f93\u5165\u89c6\u9891\u540d\u79f0', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '\u8bf7\u9009\u62e9\u89c6\u9891\u7c7b\u578b', trigger: 'change' }
        ],
        gameName: [
          { validator: this.validateLotteryGame, trigger: 'change' }
        ],
        fileName: [
          { required: true, message: '\u8bf7\u9009\u62e9\u6587\u4ef6', trigger: 'blur' }
        ],
        filePath: [
          { required: true, message: '\u8bf7\u9009\u62e9\u6587\u4ef6\u8def\u5f84', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    requiresLotteryGame() {
      return Number(this.form.type) === 3
    },
    displayGameId() {
      if (this.form.gameId === undefined || this.form.gameId === null || this.form.gameId === '') {
        return ''
      }

      return String(this.form.gameId)
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        this.dialogVisible = val
        if (val) {
          this.syncForm()
        }
      }
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    },
    selectedFile: {
      deep: true,
      handler() {
        if (this.dialogVisible && this.mode === 'add') {
          this.applySelectedFile()
        }
      }
    },
    record: {
      deep: true,
      handler() {
        if (this.dialogVisible && this.mode === 'edit') {
          this.syncForm()
        }
      }
    },
    'form.type'(value) {
      if (Number(value) !== 3) {
        this.clearGameFields()
      }
    }
  },
  methods: {
    getDefaultForm() {
      return {
        bucketUrl: '',
        gameCode: '',
        gameId: undefined,
        gameName: '',
        id: undefined,
        fileName: '',
        filePath: '',
        status: 1,
        type: 0,
        videoComment: '',
        videoName: ''
      }
    },
    syncForm() {
      if (this.mode === 'edit' && this.record) {
        this.form = {
          bucketUrl: this.record.bucketUrl || '',
          gameCode: this.record.gameCode || '',
          gameId: this.record.gameId,
          gameName: this.record.gameName || '',
          id: this.record.id,
          fileName: this.record.fileName || '',
          filePath: this.record.filePath || '',
          status: this.record.status,
          type: this.record.type,
          videoComment: this.record.videoComment || '',
          videoName: this.record.videoName || ''
        }
      } else {
        this.form = this.getDefaultForm()
        this.applySelectedFile()
      }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
      })
    },
    applySelectedFile() {
      if (!this.selectedFile) {
        return
      }

      this.form.bucketUrl = this.selectedFile.url || this.selectedFile.bucketUrl || ''
      this.form.fileName = this.selectedFile.name || ''
      this.form.filePath = this.getDirectoryPath(this.selectedFile.key)
    },
    getDirectoryPath(key) {
      if (!key) {
        return ''
      }

      const segments = key.split('/').filter(function(item) {
        return item
      })

      if (segments.length <= 1) {
        return ''
      }

      segments.pop()
      return segments.join('/') + '/'
    },
    clearGameFields() {
      this.form.gameCode = ''
      this.form.gameId = undefined
      this.form.gameName = ''
    },
    handleGameChange(value) {
      const target = this.gameOptions.find(function(item) {
        return item.name === value
      })

      if (!target) {
        this.clearGameFields()
        return
      }

      this.form.gameName = target.name
      this.form.gameCode = target.code
      this.form.gameId = Number(target.id)
    },
    validateLotteryGame(rule, value, callback) {
      if (!this.requiresLotteryGame) {
        callback()
        return
      }

      if (!value || !this.form.gameCode || this.form.gameId === undefined || this.form.gameId === null || this.form.gameId === '') {
        callback(new Error('\u8bf7\u9009\u62e9\u5f69\u7968\u6e38\u620f'))
        return
      }

      callback()
    },
    handleClose() {
      this.form = this.getDefaultForm()
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }

        if (this.mode === 'add' && !this.form.bucketUrl) {
          this.$message.warning(this.labels.bucketUrlMissing)
          return
        }

        this.$emit('confirm', Object.assign({}, this.form))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-alert {
  margin-bottom: 16px;
}

.dialog-full-width {
  width: 100%;
}
</style>
