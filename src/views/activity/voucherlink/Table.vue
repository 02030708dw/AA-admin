<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">

      <el-table-column prop="userName" label="会员名称" />
      <el-table-column prop="title" label="标题" />

      <el-table-column prop="isAgent" label="用户类型">
        <template slot-scope="scope">
          {{ { 0: '普通用户', 1: '代理' }[scope.row.isAgent] || '未知' }}
        </template>
      </el-table-column>

      <el-table-column prop="createType" label="创建类型">
        <template slot-scope="scope">
          {{ { 1: '平台赠送', 2: '用户余额创建' }[scope.row.createType] || '未知' }}
        </template>
      </el-table-column>

      <el-table-column prop="linkType" label="链接类型">
        <template slot-scope="scope">
          {{ {
            0: '普通链接',
            1: '直播推广',
            2: '特殊链接',
            3: '炒群',
            4: '网址推广'
          }[scope.row.linkType] || '未知' }}
        </template>
      </el-table-column>

      <el-table-column prop="recharged" label="已充值用户数量" />
      <el-table-column prop="registered" label="已注册用户数量" />
      <el-table-column prop="requirement" label="获取条件" />
      <el-table-column prop="shareCards" label="可分享代金券次数" />
      <el-table-column prop="transferLinks" label="中转页链接" />

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="{
            0: 'danger',
            1: 'success',
            2: 'info'
          }[scope.row.status]">
            {{
              {
                0: '禁用',
                1: '正常',
                2: '删除'
              }[scope.row.status] || '未知'
            }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
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
      default: () => []
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    HandelLoading(status) {
      this.loading = status
    },
    getEditor(item) {
      this.$emit('EditorShow', item)
    }
  }
}
</script>
