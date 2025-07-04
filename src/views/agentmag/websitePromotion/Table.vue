<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" border :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="agentName" label="代理名称" />
      <el-table-column prop="name" label="网站名称" />
      <el-table-column prop="domainName" label="域名" />
      <el-table-column prop="adPosition" label="广告位置">
        <template slot-scope="scope">
          {{ adPositionMap[scope.row.adPosition] || '无' }}
        </template>
      </el-table-column>
      <el-table-column prop="adType" label="广告类型">
        <template slot-scope="scope">
          {{ adTypeMap[scope.row.adType] || '无' }}
        </template>
      </el-table-column>
      <el-table-column label="中转页地址" width="200">
        <template slot-scope="scope">
          <div v-if="parseLinks(scope.row.transferLinks)">
            <div>Facebook：{{ parseLinks(scope.row.transferLinks).facebook || '无' }}</div>
            <div>Telegram：{{ parseLinks(scope.row.transferLinks).telegram || '无' }}</div>
          </div>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          {{ formatValue(scope.row.remark) }}
        </template>
      </el-table-column>
      <el-table-column prop="domainStatus" label="域名状态">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.domainStatus)">
            {{ getStatusText(scope.row.domainStatus) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.domainStatus === 2" type="text" style="color: #e6a23c"
            @click="$emit('examine', scope.row.id)">
            {{ $t('toexamine') }}
          </el-button>
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
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      adPositionMap: {
        1: '上',
        2: '下',
        3: '右下',
        4: '左下',
      },
      adTypeMap: {
        1: '刮刮乐',
        2: '红包',
        3: '彩票',
      },
    }
  },
  methods: {
    parseLinks(val) {
      try {
        if (typeof val === 'string') {
          return JSON.parse(val)
        }
        return val || {}
      } catch (err) {
        return null
      }
    },
    getStatusText(status) {
      switch (status) {
        case 1: return '未申请'
        case 2: return '已申请'
        case 3: return '通过'
        case 4: return '拒绝'
        default: return '未知'
      }
    },
    getStatusType(status) {
      switch (status) {
        case 1:
        case 2:
          return 'warning'
        case 3:
          return 'success'
        case 4:
          return 'danger'
        default:
          return 'info'
      }
    },
    formatValue(val) {
      return val !== null && val !== undefined && val !== '' ? val : '无'
    },
    HandelLoading(status) {
      this.loading = status
    },
  },
}
</script>
