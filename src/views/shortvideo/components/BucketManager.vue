<template>
  <el-card shadow="never" class="bucket-card">
    <div class="bucket-toolbar">
      <div class="bucket-toolbar__left">
        <el-button v-has="'bucket:page'" icon="el-icon-back" :disabled="!currentPath" @click="$emit('back')">{{ labels.back }}</el-button>
        <el-button v-has="'bucket:page'" type="primary" icon="el-icon-refresh" @click="$emit('refresh')">{{ labels.refresh }}</el-button>
        <el-select
          v-model="localDbFilter"
          clearable
          size="small"
          class="bucket-toolbar__filter"
          :placeholder="labels.dbFilterPlaceholder"
          @change="handleDbFilterChange"
        >
          <el-option :label="labels.dbFilterAll" :value="dbFilterAllValue" />
          <el-option :label="labels.dbFilterNo" :value="false" />
          <el-option :label="labels.dbFilterYes" :value="true" />
        </el-select>
      </div>
      <div class="bucket-toolbar__right">
        <el-upload
          v-has="'bucket:add'"
          action=""
          :show-file-list="false"
          :http-request="handleUpload"
          :disabled="uploading"
        >
          <el-button type="success" icon="el-icon-upload2" :loading="uploading">{{ labels.upload }}</el-button>
        </el-upload>
      </div>
    </div>

    <div class="bucket-breadcrumb">
      <span class="bucket-breadcrumb__label">{{ labels.pathLabel }}</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a href="javascript:void(0)" @click.prevent="$emit('navigate', '')">{{ labels.root }}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
          <a href="javascript:void(0)" @click.prevent="$emit('navigate', item.path)">{{ item.label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-alert
      v-if="selectedFile && !selectedFile.folder"
      type="info"
      :closable="false"
      show-icon
      class="bucket-alert"
      :title="labels.selectedFile + selectedFile.name"
      :description="selectedFile.key"
    />

    <el-table
      v-loading="loading"
      :data="rows"
      border
      row-key="key"
      :header-cell-style="{ textAlign: 'left' }"
      :cell-style="{ textAlign: 'left' }"
      :empty-text="labels.emptyText"
      @row-click="handleRowClick"
    >
      <el-table-column :label="labels.object" min-width="320">
        <template slot-scope="{ row }">
          <div class="object-cell">
            <i :class="row.folder ? 'el-icon-folder-opened' : 'el-icon-document'" />
            <button class="object-cell__link" type="button" @click.stop="handleNameClick(row)">
              {{ row.displayName }}
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="labels.type" width="120">
        <template slot-scope="{ row }">
          {{ row.folder ? labels.folder : labels.file }}
        </template>
      </el-table-column>
      <el-table-column :label="labels.storageClass" width="120">
        <template>--</template>
      </el-table-column>
      <el-table-column :label="labels.dbStatus" width="120">
        <template slot-scope="{ row }">
          <span v-if="row.folder">--</span>
          <el-tag v-else :type="row.isToDB ? 'success' : 'info'" size="mini">
            {{ row.isToDB ? labels.dbFilterYes : labels.dbFilterNo }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="labels.size" width="140">
        <template slot-scope="{ row }">
          {{ row.folder ? '--' : formatSize(row.size) }}
        </template>
      </el-table-column>
      <el-table-column :label="labels.modified" width="180">
        <template slot-scope="{ row }">
          {{ formatTime(row.lastModified) }}
        </template>
      </el-table-column>
      <el-table-column :label="labels.actions" width="240" fixed="right">
        <template slot-scope="{ row }">
          <el-button v-if="!row.folder" v-has="'bucket:page'" type="text" @click.stop="$emit('select-file', row)">{{ labels.select }}</el-button>
          <el-button v-if="!row.folder && row.url" type="text" @click.stop="openUrl(row.url)">{{ labels.preview }}</el-button>
          <el-button v-if="!row.folder" v-has="'bucket:page'" type="text" style="color: #67c23a" @click.stop="$emit('use-file', row)">
            {{ labels.useInVideo }}
          </el-button>
          <el-button v-if="!row.folder" v-has="'bucket:del'" type="text" style="color: #f56c6c" @click.stop="$emit('delete-file', row)">
            {{ labels.delete }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="bucket-footer">
      <div class="bucket-footer__meta">
        <span>{{ labels.currentPath }}{{ currentPath || '/' }}</span>
        <span>{{ labels.totalItems }}{{ rows.length }}</span>
      </div>
      <el-button v-if="hasMore" v-has="'bucket:page'" :loading="loadingMore" icon="el-icon-more" @click="$emit('load-more')">
        {{ labels.loadMore }}
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ShortVideoBucketManager',
  props: {
    currentPath: {
      type: String,
      default: ''
    },
    rows: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingMore: {
      type: Boolean,
      default: false
    },
    uploading: {
      type: Boolean,
      default: false
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    selectedFile: {
      type: Object,
      default: null
    },
    dbFilter: {
      type: [Boolean, String],
      default: undefined
    }
  },
  data() {
    return {
      dbFilterAllValue: '__all__',
      localDbFilter: '__all__',
      labels: {
        back: '\u8fd4\u56de\u4e0a\u7ea7',
        refresh: '\u5237\u65b0',
        upload: '\u4e0a\u4f20\u6587\u4ef6',
        dbFilterPlaceholder: '\u5165\u5e93\u72b6\u6001',
        dbFilterAll: '\u5168\u90e8',
        dbFilterNo: '\u672a\u5165\u5e93',
        dbFilterYes: '\u5df2\u5165\u5e93',
        pathLabel: '\u5f53\u524d\u4f4d\u7f6e:',
        root: '\u6839\u76ee\u5f55',
        selectedFile: '\u5df2\u9009\u62e9\u6587\u4ef6: ',
        emptyText: '\u5f53\u524d\u76ee\u5f55\u6682\u65e0\u5185\u5bb9',
        object: '\u5bf9\u8c61',
        type: '\u7c7b\u578b',
        folder: '\u76ee\u5f55',
        file: '\u6587\u4ef6',
        storageClass: '\u5b58\u50a8\u7c7b',
        dbStatus: '\u5165\u5e93\u72b6\u6001',
        size: '\u5927\u5c0f',
        modified: '\u5df2\u4fee\u6539',
        actions: '\u64cd\u4f5c',
        select: '\u9009\u62e9',
        preview: '\u9884\u89c8',
        useInVideo: '\u7528\u4e8e\u77ed\u89c6\u9891',
        delete: '\u5220\u9664',
        currentPath: '\u76ee\u5f55: ',
        totalItems: '\u9879\u76ee\u6570: ',
        loadMore: '\u52a0\u8f7d\u66f4\u591a'
      }
    }
  },
  computed: {
    breadcrumbItems() {
      if (!this.currentPath) {
        return []
      }

      const segments = this.currentPath.split('/').filter(function(item) {
        return item
      })
      const items = []
      let tempPath = ''

      segments.forEach(function(segment) {
        tempPath += segment + '/'
        items.push({
          label: segment,
          path: tempPath
        })
      })

      return items
    }
  },
  watch: {
    dbFilter: {
      immediate: true,
      handler(value) {
        this.localDbFilter = value === undefined || value === null || value === ''
          ? this.dbFilterAllValue
          : value
      }
    }
  },
  methods: {
    handleUpload(option) {
      this.$emit('upload', option)
    },
    handleDbFilterChange(value) {
      const nextValue = value === this.dbFilterAllValue || value === null || value === ''
        ? undefined
        : value
      this.$emit('db-filter-change', nextValue)
    },
    handleRowClick(row) {
      if (row.folder) {
        this.$emit('navigate', row.key)
        return
      }

      this.$emit('select-file', row)
    },
    handleNameClick(row) {
      if (row.folder) {
        this.$emit('navigate', row.key)
        return
      }

      this.$emit('select-file', row)
    },
    formatSize(size) {
      if (!size && size !== 0) {
        return '--'
      }

      if (size < 1024) {
        return size + ' B'
      }

      if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + ' KB'
      }

      if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB'
      }

      return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
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

      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    },
    openUrl(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.bucket-card {
  border: none;
}

.bucket-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.bucket-toolbar__left,
.bucket-toolbar__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bucket-toolbar__filter {
  width: 150px;
}

.bucket-breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #f7f9fc;
  border-radius: 8px;
}

.bucket-breadcrumb__label {
  color: #606266;
  font-size: 13px;
  white-space: nowrap;
}

.bucket-alert {
  margin-bottom: 16px;
}

.object-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.object-cell i {
  font-size: 22px;
  color: #409eff;
}

.object-cell__link {
  padding: 0;
  border: none;
  background: transparent;
  color: #1f5ed6;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.bucket-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.bucket-footer__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #909399;
  font-size: 13px;
}
</style>
