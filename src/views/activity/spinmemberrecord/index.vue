<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import {
  ServicePage,
} from '@/api/activity/spinmemberrecord'
export default {
  components: {
    Table,
    Control,
    Pagination,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
    }
  },
  created() {
    this.getdata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      ServicePage({
        pageNo: this.pageNo, pageSize: this.PagesSize
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message({ message: '刷新成功!', type: 'success' })
        })
        .catch(() => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false)
            this.$refs.ControlView.HandelBtnStatus()
          })
          this.$message.error('刷新失败!')
        })
    },
    // 请求分页数据
    getdata(index = 1) {
      this.pageNo = index
      ServicePage({ pageNo: index, pageSize: this.PagesSize })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.getdata(1)
    },
    getresetting() {
      this.getdata(1)
    },

  }
}
</script>

<style lang="scss"></style>
