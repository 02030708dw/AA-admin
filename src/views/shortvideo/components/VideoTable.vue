<template>
  <el-card shadow="never">
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      :empty-text="labels.emptyText"
    >
      <el-table-column prop="id" label="ID" width="90" />
      <el-table-column prop="videoName" :label="labels.videoName" min-width="180" show-overflow-tooltip />
      <el-table-column :label="labels.type" width="120">
        <template slot-scope="{ row }">
          {{ formatVideoType(row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="gameName" :label="labels.gameName" min-width="160" show-overflow-tooltip />
      <el-table-column prop="fileName" :label="labels.fileName" min-width="180" show-overflow-tooltip />
      <el-table-column prop="filePath" :label="labels.filePath" min-width="240" show-overflow-tooltip />
      <el-table-column prop="videoComment" :label="labels.comment" min-width="220" show-overflow-tooltip />
      <el-table-column :label="labels.preview" width="120">
        <template slot-scope="{ row }">
          <el-button v-if="row.bucketUrl || row.videoUrl" type="text" @click="openUrl(row.bucketUrl || row.videoUrl)">{{ labels.open }}</el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column :label="labels.status" width="140">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            v-has="'shotvideo:edit'"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
            @change="handleStatusChange(row, $event)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="labels.createdAt" width="180">
        <template slot-scope="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column :label="labels.updatedAt" width="180">
        <template slot-scope="{ row }">
          {{ formatTime(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column :label="labels.actions" width="180" fixed="right">
        <template slot-scope="{ row }">
          <el-button v-has="'shotvideo:edit'" type="text" style="color: #e6a23c" @click="$emit('edit', row)">{{ labels.edit }}</el-button>
          <el-button v-has="'shotvideo:del'" type="text" style="color: #f56c6c" @click="handleDelete(row)">{{ labels.delete }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { formatVideoType } from '@/views/shortvideo/shared/videoMeta'

export default {
  name: 'ShortVideoTable',
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      labels: {
        emptyText: '\u6682\u65e0\u77ed\u89c6\u9891\u6570\u636e',
        videoName: '\u89c6\u9891\u540d\u79f0',
        type: '\u89c6\u9891\u7c7b\u578b',
        gameName: '\u6e38\u620f\u540d\u79f0',
        fileName: '\u6587\u4ef6\u540d',
        filePath: '\u6587\u4ef6\u8def\u5f84',
        comment: '\u89c6\u9891\u63cf\u8ff0',
        preview: '\u89c6\u9891\u9884\u89c8',
        open: '\u6253\u5f00',
        status: '\u72b6\u6001',
        createdAt: '\u521b\u5efa\u65f6\u95f4',
        updatedAt: '\u66f4\u65b0\u65f6\u95f4',
        actions: '\u64cd\u4f5c',
        edit: '\u7f16\u8f91',
        delete: '\u5220\u9664'
      }
    }
  },
  methods: {
    formatVideoType,
    handleDelete(row) {
      this.$confirm('\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u77ed\u89c6\u9891\u8bb0\u5f55\u5417?', '\u63d0\u793a', {
        confirmButtonText: '\u786e\u5b9a',
        cancelButtonText: '\u53d6\u6d88',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete', row)
        })
        .catch(function() {})
    },
    handleStatusChange(row, status) {
      this.$emit('status-change', {
        row: row,
        status: status,
        oldStatus: status === 1 ? 0 : 1
      })
    },
    formatTime(value) {
      if (!value) {
        return '--'
      }

      const date = new Date(value)
      if (Number.isNaN(date.getTime())) {
        return value
      }

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      const second = String(date.getSeconds()).padStart(2, '0')

      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    },
    openUrl(url) {
      window.open(url, '_blank')
    }
  }
}
</script>
