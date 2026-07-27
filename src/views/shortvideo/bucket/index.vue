<template>
  <div class="page-wrap">
    <el-card shadow="never" class="page-header-card">
      <div class="page-header">
        <div>
          <div class="page-header__title">{{ labels.title }}</div>
          <div class="page-header__desc">{{ labels.description }}</div>
        </div>
        <el-button v-if="selectedBucketFile" type="primary" @click="goManagePage">
          {{ labels.goManage }}
        </el-button>
      </div>
    </el-card>

    <BucketManager
      :current-path="bucketPath"
      :rows="bucketRows"
      :db-filter="bucketIsToDB"
      :loading="bucketLoading"
      :loading-more="bucketLoadingMore"
      :uploading="bucketUploading"
      :has-more="bucketHasMore"
      :selected-file="selectedBucketFile"
      @db-filter-change="handleBucketDbFilterChange"
      @refresh="fetchBucketList(bucketPath, true)"
      @navigate="handleBucketNavigate"
      @back="handleBucketBack"
      @select-file="handleBucketFileSelect"
      @use-file="handleUseBucketFile"
      @delete-file="handleBucketDelete"
      @upload="handleBucketUpload"
      @load-more="fetchBucketList(bucketPath, false, bucketNextToken)"
    />
  </div>
</template>

<script>
import BucketManager from '@/views/shortvideo/components/BucketManager.vue'
import { listBucketPath, uploadBucketFile, deleteBucketFile } from '@/api/agent/bucket'
import { saveSelectedBucketFile, getSelectedBucketFile, clearSelectedBucketFile } from '@/views/shortvideo/shared/fileSelection'

export default {
  name: 'BucketFileManagePage',
  components: {
    BucketManager
  },
  data() {
    return {
      labels: {
        title: '\u5b58\u50a8\u6876\u6587\u4ef6\u7ba1\u7406',
        description: '\u50cf\u6587\u4ef6\u7ba1\u7406\u5668\u4e00\u6837\u6d4f\u89c8\u5b58\u50a8\u6876\u76ee\u5f55\uff0c\u9009\u62e9\u89c6\u9891\u6587\u4ef6\u540e\u53ef\u76f4\u63a5\u8df3\u8f6c\u5230\u77ed\u89c6\u9891\u7ba1\u7406\u3002',
        goManage: '\u524d\u5f80\u77ed\u89c6\u9891\u7ba1\u7406',
        loadFailed: '\u83b7\u53d6\u5b58\u50a8\u6876\u6587\u4ef6\u5931\u8d25',
        selected: '\u5df2\u9009\u62e9\u6587\u4ef6: ',
        selectedForManage: '\u5df2\u9009\u62e9\u6587\u4ef6\uff0c\u6b63\u5728\u8df3\u8f6c\u5230\u77ed\u89c6\u9891\u7ba1\u7406',
        deleteConfirm: '\u786e\u5b9a\u5220\u9664\u8be5\u6587\u4ef6\u5417?',
        deleteSuccess: '\u6587\u4ef6\u5220\u9664\u6210\u529f',
        deleteFailed: '\u6587\u4ef6\u5220\u9664\u5931\u8d25',
        uploadSuccess: '\u4e0a\u4f20\u6210\u529f',
        uploadFailed: '\u4e0a\u4f20\u5931\u8d25',
        confirm: '\u63d0\u793a',
        ok: '\u786e\u5b9a',
        cancel: '\u53d6\u6d88'
      },
      bucketPath: '',
      bucketRows: [],
      bucketIsToDB: undefined,
      bucketLoading: false,
      bucketLoadingMore: false,
      bucketUploading: false,
      bucketNextToken: '',
      bucketHasMore: false,
      selectedBucketFile: null
    }
  },
  created() {
    this.selectedBucketFile = getSelectedBucketFile()
    this.fetchBucketList('', true)
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
          isToDB: this.bucketIsToDB,
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
        this.$message.error(this.labels.loadFailed)
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
    handleBucketDbFilterChange(value) {
      this.bucketIsToDB = value
      this.fetchBucketList(this.bucketPath, true)
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
      saveSelectedBucketFile(this.selectedBucketFile)
      this.$message.success(this.labels.selected + row.displayName)
    },
    handleUseBucketFile(row) {
      this.selectedBucketFile = Object.assign({}, row)
      saveSelectedBucketFile(this.selectedBucketFile)
      this.$message.success(this.labels.selectedForManage)
      this.goManagePage()
    },
    handleBucketDelete(row) {
      this.$confirm(this.labels.deleteConfirm, this.labels.confirm, {
        confirmButtonText: this.labels.ok,
        cancelButtonText: this.labels.cancel,
        type: 'warning'
      })
        .then(async() => {
          await deleteBucketFile(row.key)
          this.$message.success(this.labels.deleteSuccess)
          if (this.selectedBucketFile && this.selectedBucketFile.key === row.key) {
            this.selectedBucketFile = null
            clearSelectedBucketFile()
          }
          this.fetchBucketList(this.bucketPath, true)
        })
        .catch(() => {})
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
          saveSelectedBucketFile(uploadedFile)
          if (option.onSuccess) {
            option.onSuccess(res)
          }
          this.$message.success(this.labels.uploadSuccess)
          this.fetchBucketList(this.bucketPath, true)
        })
        .catch((error) => {
          if (option.onError) {
            option.onError(error)
          }
          this.$message.error(this.labels.uploadFailed)
        })
        .finally(() => {
          this.bucketUploading = false
        })
    },
    goManagePage() {
      this.$router.push('/shortvideo/shotvideo')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
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
</style>
