<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :result-set="resultSet" :table-data="tableData" @Details="HandelDetails" />
    <Pagination :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <Detail ref="DetailDialog" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import Detail from './details.vue'
import { getReportLiveStream } from '@/api/reportforms/reportforms'

export default {
  components: {
    Table,
    Control,
    Pagination,
    Detail
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      type: 1,       // 类型 1: 刮刮乐, 2: 宾果
      userId: null,     // 代理ID
      resultSet: {},
    }
  },
  created() {
    this.getdata(1)
  },
  methods: {
    HandelDetails(row) {
      this.$refs.DetailDialog.HandelShow(row);
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getdata(this.pageNo)
    },
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      getReportLiveStream({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        type: this.type,
        userId: this.userId,
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          this.resultSet = res.resultSet
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
    getdata(index = 1) {
      this.pageNo = index
      getReportLiveStream({
        pageNo: index,
        pageSize: this.PagesSize,
        type: this.type,
        userId: this.userId,
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          this.resultSet = res.resultSet
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.type = e.type
      this.userId = e.userId || null
      this.getdata(1)
    },
    getresetting() {
      this.type = null
      this.userId = null
      this.getdata(1)
    },
  }
}
</script>

<style lang="scss"></style>
