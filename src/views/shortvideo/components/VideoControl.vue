<template>
  <div class="video-control">
    <div class="video-control__row">
      <div class="video-control__filters">
        <el-input
          v-model="videoName"
          clearable
          :placeholder="labels.videoNamePlaceholder"
          class="video-control__input"
          @keyup.enter.native="handleQuery"
        />
        <el-select v-model="status" clearable :placeholder="labels.statusPlaceholder" class="video-control__select">
          <el-option :value="1" :label="labels.enabled" />
          <el-option :value="0" :label="labels.disabled" />
        </el-select>
        <el-button v-has="'shotvideo:page'" type="primary" icon="el-icon-search" @click="handleQuery">{{ labels.search }}</el-button>
        <el-button icon="el-icon-refresh-left" @click="handleReset">{{ labels.reset }}</el-button>
      </div>
      <div class="video-control__actions">
        <el-button icon="el-icon-folder-opened" @click="$emit('open-bucket')">{{ labels.openBucket }}</el-button>
        <el-button v-has="'shotvideo:page'" type="success" icon="el-icon-refresh" :loading="refreshLoading" @click="$emit('refresh')">
          {{ labels.refresh }}
        </el-button>
        <el-button v-has="'shotvideo:add'" type="primary" icon="el-icon-plus" @click="$emit('add')">{{ labels.create }}</el-button>
      </div>
    </div>

    <el-alert
      v-if="selectedFileName"
      type="success"
      show-icon
      :closable="false"
      class="video-control__alert"
      :title="labels.currentBucketFile + selectedFileName"
      :description="labels.selectedTip"
    />
    <el-alert
      v-else
      type="warning"
      show-icon
      :closable="false"
      class="video-control__alert"
      :title="labels.noBucketFile"
      :description="labels.noBucketFileTip"
    />
  </div>
</template>

<script>
export default {
  name: 'ShortVideoControl',
  props: {
    refreshLoading: {
      type: Boolean,
      default: false
    },
    selectedFileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      videoName: '',
      status: undefined,
      labels: {
        videoNamePlaceholder: '\u8bf7\u8f93\u5165\u89c6\u9891\u540d\u79f0',
        statusPlaceholder: '\u8bf7\u9009\u62e9\u72b6\u6001',
        enabled: '\u542f\u7528',
        disabled: '\u7981\u7528',
        search: '\u67e5\u8be2',
        reset: '\u91cd\u7f6e',
        openBucket: '\u524d\u5f80\u5b58\u50a8\u6876',
        refresh: '\u5237\u65b0',
        create: '\u65b0\u589e\u77ed\u89c6\u9891',
        currentBucketFile: '\u5f53\u524d\u5df2\u9009\u6587\u4ef6: ',
        selectedTip: '\u65b0\u589e\u77ed\u89c6\u9891\u65f6\u4f1a\u81ea\u52a8\u5e26\u5165\u5f53\u524d\u6587\u4ef6\u3002',
        noBucketFile: '\u8fd8\u6ca1\u6709\u9009\u62e9\u5b58\u50a8\u6876\u6587\u4ef6',
        noBucketFileTip: '\u8bf7\u5148\u5230\u201c\u5b58\u50a8\u6876\u6587\u4ef6\u7ba1\u7406\u201d\u91cc\u9009\u62e9\u4e00\u4e2a\u89c6\u9891\u6587\u4ef6\u3002'
      }
    }
  },
  methods: {
    handleQuery() {
      this.$emit('query', {
        videoName: this.videoName,
        status: this.status
      })
    },
    handleReset() {
      this.videoName = ''
      this.status = undefined
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.video-control {
  margin-bottom: 16px;
}

.video-control__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.video-control__filters,
.video-control__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.video-control__input {
  width: 240px;
}

.video-control__select {
  width: 160px;
}

.video-control__alert {
  margin-top: 12px;
}
</style>
