<template>
  <el-card shadow="never">
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      empty-text="No short video records"
    >
      <el-table-column prop="id" label="ID" width="90" />
      <el-table-column prop="videoName" label="Video name" min-width="180" show-overflow-tooltip />
      <el-table-column prop="fileName" label="File name" min-width="180" show-overflow-tooltip />
      <el-table-column prop="filePath" label="File path" min-width="240" show-overflow-tooltip />
      <el-table-column prop="videoComment" label="Comment" min-width="220" show-overflow-tooltip />
      <el-table-column label="Preview" width="120">
        <template slot-scope="{ row }">
          <el-button v-if="row.videoUrl" type="text" @click="openUrl(row.videoUrl)">Open</el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="140">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
            @change="handleStatusChange(row, $event)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Created" width="180">
        <template slot-scope="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="Updated" width="180">
        <template slot-scope="{ row }">
          {{ formatTime(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="180" fixed="right">
        <template slot-scope="{ row }">
          <el-button type="text" style="color: #e6a23c" @click="$emit('edit', row)">Edit</el-button>
          <el-button type="text" style="color: #f56c6c" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
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
  methods: {
    handleDelete(row) {
      this.$confirm('Delete this short video record?', 'Confirm', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
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
