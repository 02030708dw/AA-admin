<template>
  <div class="short-video-page">
    <el-card shadow="never" class="page-header-card">
      <div class="page-header">
        <div>
          <div class="page-header__title">Short Video Management</div>
          <div class="page-header__desc">Browse bucket files first, then bind a selected video file to a short video record.</div>
        </div>
        <el-tag v-if="selectedBucketFile" type="success" effect="plain">
          Selected: {{ selectedBucketFile.name }}
        </el-tag>
        <el-tag v-else type="info" effect="plain">
          No file selected
        </el-tag>
      </div>
    </el-card>

    <el-tabs v-model="activeTab" class="page-tabs">
      <el-tab-pane label="Bucket Files" name="bucket">
        <BucketManager
          :current-path="bucketPath"
          :rows="bucketRows"
          :loading="bucketLoading"
          :loading-more="bucketLoadingMore"
          :uploading="bucketUploading"
          :has-more="bucketHasMore"
          :selected-file="selectedBucketFile"
          @refresh="fetchBucketList(bucketPath, true)"
          @navigate="handleBucketNavigate"
          @back="handleBucketBack"
          @select-file="handleBucketFileSelect"
          @use-file="handleUseBucketFile"
          @delete-file="handleBucketDelete"
          @upload="handleBucketUpload"
          @load-more="fetchBucketList(bucketPath, false, bucketNextToken)"
        />
      </el-tab-pane>

      <el-tab-pane label="Short Videos" name="videos">
        <Control
          :refresh-loading="videoRefreshing"
          :selected-file-name="selectedBucketFile ? selectedBucketFile.name : ''"
          @query="handleVideoQuery"
          @reset="handleVideoReset"
          @refresh="refreshVideoList"
          @add="openVideoDialog('add')"
        />
        <Table
          :table-data="videoList"
          :loading="videoLoading"
          @edit="openVideoDialog('edit', $event)"
          @delete="handleVideoDelete"
          @status-change="handleVideoStatusChange"
        />
        <Pagination
          :page-no="videoQuery.pageNo"
          :total="videoTotal"
          @PageSizeChange="handleVideoPageSizeChange"
          @PageChange="fetchVideoList"
        />
      </el-tab-pane>
    </el-tabs>

    <VideoDialog
      :visible.sync="dialogVisible"
      :mode="dialogMode"
      :record="editingVideo"
      :selected-file="selectedBucketFile"
      @confirm="handleVideoSubmit"
      @pick-file="activeTab = 'bucket'"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/Pagination.vue'
import BucketManager from './BucketManager.vue'
import Control from './Control.vue'
import Table from './Table.vue'
import VideoDialog from './VideoDialog.vue'
import { listBucketPath, uploadBucketFile, deleteBucketFile } from '@/api/agent/bucket'
import { listShortVideos, addShortVideo, editShortVideo, deleteShortVideo } from '@/api/agent/shortvideo'

export default {
  name: 'AgentVideoIndex',
  components: {
    Pagination,
    BucketManager,
    Control,
    Table,
    VideoDialog
  },
  data() {
    return {
      activeTab: 'bucket',
      bucketPath: '',
      bucketRows: [],
      bucketLoading: false,
      bucketLoadingMore: false,
      bucketUploading: false,
      bucketNextToken: '',
      bucketHasMore: false,
      selectedBucketFile: null,
      videoList: [],
      videoLoading: false,
      videoRefreshing: false,
      videoTotal: 0,
      videoQuery: {
        pageNo: 1,
        pageSize: 20,
        status: undefined,
        videoName: ''
      },
      dialogVisible: false,
      dialogMode: 'add',
      editingVideo: null
    }
  },
  created() {
    this.fetchBucketList('', true)
    this.fetchVideoList(1)
  },
  methods: {
    async fetchBucketList(path, reset, token) {
      const targetPath = typeof path === 'string' ? path : this.bucketPath
      const isReset = reset !== false
      const nextToken = token || ''

      if (isReset) {
        this.bucketLoading = true
      } else {
        this.bucketLoadingMore = true
      }

      try {
        const res = await listBucketPath({
          path: targetPath,
          pageSize: 200,
          continuationToken: nextToken
        })
        const result = res.resultSet || {}
        const folders = (result.folders || []).map(this.normalizeBucketRow)
        const files = (result.files || []).map(this.normalizeBucketRow)
        const nextRows = folders.concat(files)

        this.bucketPath = result.currentPath || targetPath || ''
        this.bucketRows = isReset ? nextRows : this.bucketRows.concat(nextRows)
        this.bucketNextToken = result.nextToken || ''
        this.bucketHasMore = !!result.hasMore
      } catch (error) {
        this.$message.error('Failed to load bucket files')
      } finally {
        this.bucketLoading = false
        this.bucketLoadingMore = false
      }
    },
    normalizeBucketRow(item) {
      const row = Object.assign({}, item)
      row.displayName = row.name || this.getNameFromKey(row.key, row.folder)
      row.name = row.name || this.getNameFromKey(row.key, row.folder)
      return row
    },
    getNameFromKey(key, isFolder) {
      if (!key) {
        return isFolder ? '/' : '--'
      }

      const cleanKey = isFolder ? key.replace(/\/$/, '') : key
      const segments = cleanKey.split('/').filter(function(item) {
        return item
      })
      const name = segments.length ? segments[segments.length - 1] : cleanKey
      return isFolder ? name + '/' : name
    },
    handleBucketNavigate(path) {
      this.fetchBucketList(path, true)
    },
    handleBucketBack() {
      if (!this.bucketPath) {
        return
      }

      const cleanPath = this.bucketPath.replace(/\/$/, '')
      const segments = cleanPath.split('/').filter(function(item) {
        return item
      })
      segments.pop()
      const parentPath = segments.length ? segments.join('/') + '/' : ''
      this.fetchBucketList(parentPath, true)
    },
    handleBucketFileSelect(row) {
      this.selectedBucketFile = Object.assign({}, row)
      this.$message.success('File selected: ' + row.displayName)
    },
    handleUseBucketFile(row) {
      this.selectedBucketFile = Object.assign({}, row)
      this.activeTab = 'videos'
      this.$message.success('File selected for short video creation')
    },
    handleBucketDelete(row) {
      this.$confirm('Delete this file?', 'Confirm', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteBucketFile(row.key)
          this.$message.success('File deleted')
          if (this.selectedBucketFile && this.selectedBucketFile.key === row.key) {
            this.selectedBucketFile = null
          }
          this.fetchBucketList(this.bucketPath, true)
        })
        .catch(function() {})
    },
    handleBucketUpload(option) {
      this.bucketUploading = true
      uploadBucketFile(option.file, this.bucketPath, option.onProgress)
        .then((res) => {
          const result = res.resultSet || {}
          const uploadedFile = this.normalizeBucketRow({
            folder: false,
            key: result.key,
            lastModified: result.lastModified,
            name: this.getNameFromKey(result.key, false),
            size: result.size,
            url: result.url
          })
          this.selectedBucketFile = uploadedFile
          if (option.onSuccess) {
            option.onSuccess(res)
          }
          this.$message.success('Upload complete')
          this.fetchBucketList(this.bucketPath, true)
        })
        .catch((error) => {
          if (option.onError) {
            option.onError(error)
          }
          this.$message.error('Upload failed')
        })
        .finally(() => {
          this.bucketUploading = false
        })
    },
    async fetchVideoList(pageNo) {
      if (pageNo) {
        this.videoQuery.pageNo = pageNo
      }

      this.videoLoading = true
      try {
        const res = await listShortVideos({
          pageNo: this.videoQuery.pageNo,
          pageSize: this.videoQuery.pageSize,
          status: this.videoQuery.status,
          videoName: this.videoQuery.videoName
        })
        const result = res.resultSet || {}
        this.videoList = result.data || []
        this.videoTotal = result.total || 0
      } catch (error) {
        this.$message.error('Failed to load short videos')
      } finally {
        this.videoLoading = false
        this.videoRefreshing = false
      }
    },
    handleVideoQuery(filters) {
      this.videoQuery.videoName = filters.videoName
      this.videoQuery.status = filters.status
      this.fetchVideoList(1)
    },
    handleVideoReset() {
      this.videoQuery.videoName = ''
      this.videoQuery.status = undefined
      this.fetchVideoList(1)
    },
    refreshVideoList() {
      this.videoRefreshing = true
      this.fetchVideoList(this.videoQuery.pageNo)
    },
    handleVideoPageSizeChange(size) {
      this.videoQuery.pageSize = size
      this.fetchVideoList(1)
    },
    openVideoDialog(mode, row) {
      if (mode === 'add' && !this.selectedBucketFile) {
        this.$message.warning('Pick a bucket file first')
        return
      }

      this.dialogMode = mode
      this.editingVideo = row ? Object.assign({}, row) : null
      this.dialogVisible = true
    },
    async handleVideoSubmit(form) {
      const payload = this.dialogMode === 'add'
        ? form
        : {
          id: form.id,
          status: form.status,
          videoComment: form.videoComment,
          videoName: form.videoName
        }
      const submitter = this.dialogMode === 'add' ? addShortVideo : editShortVideo

      try {
        await submitter(payload)
        this.$message.success(this.dialogMode === 'add' ? 'Short video created' : 'Short video updated')
        this.dialogVisible = false
        this.fetchVideoList(this.videoQuery.pageNo)
      } catch (error) {
        this.$message.error(this.dialogMode === 'add' ? 'Create failed' : 'Update failed')
      }
    },
    handleVideoDelete(row) {
      deleteShortVideo(row.id)
        .then(() => {
          this.$message.success('Short video deleted')
          const hasOnlyOneRow = this.videoList.length === 1 && this.videoQuery.pageNo > 1
          this.fetchVideoList(hasOnlyOneRow ? this.videoQuery.pageNo - 1 : this.videoQuery.pageNo)
        })
        .catch(() => {
          this.$message.error('Delete failed')
        })
    },
    handleVideoStatusChange(payload) {
      const row = payload.row
      editShortVideo({
        id: row.id,
        status: payload.status,
        videoComment: row.videoComment,
        videoName: row.videoName
      })
        .then(() => {
          this.$message.success('Status updated')
        })
        .catch(() => {
          row.status = payload.oldStatus
          this.$message.error('Status update failed')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.short-video-page {
  padding: 16px;
}

.page-header-card {
  margin-bottom: 16px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.page-header__title {
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.page-header__desc {
  color: #606266;
}

.page-tabs ::v-deep .el-tabs__nav-wrap::after {
  height: 1px;
}
</style>
