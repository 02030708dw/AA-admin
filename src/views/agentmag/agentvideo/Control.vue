<template>
  <div class="video-control">
    <div class="video-control__row">
      <div class="video-control__filters">
        <el-input
          v-model="videoName"
          clearable
          placeholder="Enter video name"
          class="video-control__input"
          @keyup.enter.native="handleQuery"
        />
        <el-select v-model="status" clearable placeholder="Select status" class="video-control__select">
          <el-option :value="1" label="Enabled" />
          <el-option :value="0" label="Disabled" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">Search</el-button>
        <el-button icon="el-icon-refresh-left" @click="handleReset">Reset</el-button>
      </div>
      <div class="video-control__actions">
        <el-button type="success" icon="el-icon-refresh" :loading="refreshLoading" @click="$emit('refresh')">
          Refresh
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$emit('add')">Create</el-button>
      </div>
    </div>

    <el-alert
      v-if="selectedFileName"
      type="success"
      show-icon
      :closable="false"
      class="video-control__alert"
      :title="`Current bucket file: ${selectedFileName}`"
      description="The selected file will be used when creating a short video."
    />
    <el-alert
      v-else
      type="warning"
      show-icon
      :closable="false"
      class="video-control__alert"
      title="No bucket file selected"
      description="Pick a file from Bucket Files before creating a short video."
    />
  </div>
</template>

<script>
export default {
  name: 'Control',
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
      status: undefined
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
