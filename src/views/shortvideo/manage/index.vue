<template>
  <div class="page-wrap">
    <el-card shadow="never" class="page-header-card">
      <div class="page-header">
        <div>
          <div class="page-header__title">{{ labels.title }}</div>
          <div class="page-header__desc">{{ labels.description }}</div>
        </div>
      </div>
    </el-card>

    <VideoControl
      :refresh-loading="videoRefreshing"
      :selected-file-name="selectedBucketFile ? selectedBucketFile.name : ''"
      @query="handleVideoQuery"
      @reset="handleVideoReset"
      @refresh="refreshVideoList"
      @add="openVideoDialog('add')"
      @open-bucket="goBucketPage"
    />
    <VideoTable
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

    <VideoDialog
      :visible.sync="dialogVisible"
      :mode="dialogMode"
      :record="editingVideo"
      :selected-file="selectedBucketFile"
      :game-options="lotteryGameOptions"
      :game-loading="lotteryGameLoading"
      @confirm="handleVideoSubmit"
      @pick-file="goBucketPage"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/Pagination.vue'
import VideoControl from '@/views/shortvideo/components/VideoControl.vue'
import VideoTable from '@/views/shortvideo/components/VideoTable.vue'
import VideoDialog from '@/views/shortvideo/components/VideoDialog.vue'
import { listShortVideos, addShortVideo, editShortVideo, deleteShortVideo, listLotteryGames } from '@/api/agent/shortvideo'
import { getSelectedBucketFile } from '@/views/shortvideo/shared/fileSelection'

export default {
  name: 'ShortVideoManagePage',
  components: {
    Pagination,
    VideoControl,
    VideoTable,
    VideoDialog
  },
  data() {
    return {
      labels: {
        title: '\u77ed\u89c6\u9891\u7ba1\u7406',
        description: '\u7ba1\u7406\u77ed\u89c6\u9891\u5217\u8868\uff0c\u5e76\u4ece\u5b58\u50a8\u6876\u4e2d\u9009\u62e9\u6587\u4ef6\u7528\u4e8e\u65b0\u589e\u3002',
        loadFailed: '\u83b7\u53d6\u77ed\u89c6\u9891\u5217\u8868\u5931\u8d25',
        pickFileFirst: '\u8bf7\u5148\u5728\u5b58\u50a8\u6876\u6587\u4ef6\u7ba1\u7406\u4e2d\u9009\u62e9\u4e00\u4e2a\u89c6\u9891\u6587\u4ef6',
        createSuccess: '\u77ed\u89c6\u9891\u65b0\u589e\u6210\u529f',
        createFailed: '\u77ed\u89c6\u9891\u65b0\u589e\u5931\u8d25',
        updateSuccess: '\u77ed\u89c6\u9891\u66f4\u65b0\u6210\u529f',
        updateFailed: '\u77ed\u89c6\u9891\u66f4\u65b0\u5931\u8d25',
        gameLoadFailed: '\u83b7\u53d6\u5f69\u7968\u6e38\u620f\u5217\u8868\u5931\u8d25',
        deleteSuccess: '\u77ed\u89c6\u9891\u5220\u9664\u6210\u529f',
        deleteFailed: '\u77ed\u89c6\u9891\u5220\u9664\u5931\u8d25',
        statusSuccess: '\u72b6\u6001\u66f4\u65b0\u6210\u529f',
        statusFailed: '\u72b6\u6001\u66f4\u65b0\u5931\u8d25'
      },
      lotteryGameLoading: false,
      lotteryGameOptions: [],
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
    this.restoreSelectedFile()
    this.fetchLotteryGames()
    this.fetchVideoList(1)
  },
  methods: {
    restoreSelectedFile() {
      this.selectedBucketFile = getSelectedBucketFile()
    },
    async fetchLotteryGames() {
      this.lotteryGameLoading = true
      try {
        const res = await listLotteryGames()
        if (!res || res.resCode !== '000000') {
          throw new Error((res && res.resDesc) || 'load game list failed')
        }
        const list = Array.isArray(res.resultSet) ? res.resultSet : []
        this.lotteryGameOptions = list.map(function(item) {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
            type: item.type
          }
        })
      } catch (error) {
        this.$message.error(this.labels.gameLoadFailed)
      } finally {
        this.lotteryGameLoading = false
      }
    },
    async fetchVideoList(pageNo) {
      if (pageNo) {
        this.videoQuery.pageNo = pageNo
      }

      this.videoLoading = true
      this.restoreSelectedFile()
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
        this.$message.error(this.labels.loadFailed)
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
      this.restoreSelectedFile()
      if (mode === 'add' && !this.selectedBucketFile) {
        this.$message.warning(this.labels.pickFileFirst)
        return
      }

      this.dialogMode = mode
      this.editingVideo = row ? Object.assign({}, row) : null
      this.dialogVisible = true
    },
    async handleVideoSubmit(form) {
      const payload = this.dialogMode === 'add'
        ? form
        : this.buildEditPayload(form)
      const submitter = this.dialogMode === 'add' ? addShortVideo : editShortVideo

      try {
        await submitter(payload)
        this.$message.success(this.dialogMode === 'add' ? this.labels.createSuccess : this.labels.updateSuccess)
        this.dialogVisible = false
        this.fetchVideoList(this.videoQuery.pageNo)
      } catch (error) {
        this.$message.error(this.dialogMode === 'add' ? this.labels.createFailed : this.labels.updateFailed)
      }
    },
    handleVideoDelete(row) {
      deleteShortVideo(row.id)
        .then(() => {
          this.$message.success(this.labels.deleteSuccess)
          const hasOnlyOneRow = this.videoList.length === 1 && this.videoQuery.pageNo > 1
          this.fetchVideoList(hasOnlyOneRow ? this.videoQuery.pageNo - 1 : this.videoQuery.pageNo)
        })
        .catch(() => {
          this.$message.error(this.labels.deleteFailed)
        })
    },
    handleVideoStatusChange(payload) {
      const row = payload.row
      editShortVideo(this.buildEditPayload(Object.assign({}, row, {
        status: payload.status
      })))
        .then(() => {
          this.$message.success(this.labels.statusSuccess)
        })
        .catch(() => {
          row.status = payload.oldStatus
          this.$message.error(this.labels.statusFailed)
        })
    },
    buildEditPayload(form) {
      const payload = {
        id: form.id,
        status: form.status,
        type: form.type,
        videoComment: form.videoComment,
        videoName: form.videoName
      }

      if (Number(form.type) === 3) {
        payload.gameCode = form.gameCode
        payload.gameId = form.gameId
        payload.gameName = form.gameName
      }

      return payload
    },
    goBucketPage() {
      this.$router.push('/shortvideo/bucket')
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
