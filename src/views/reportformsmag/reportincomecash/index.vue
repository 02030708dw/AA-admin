<template>
  <el-card>
    <Control ref="ControlView" @SelectDate="HandelSelectDate" @resetting="getresetting" @query="getquery"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :result-set="resultSet" :table-data="tableData" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import {
  getReportIncomeCash,
} from '@/api/reportforms/reportforms'
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
      // 开始时间
      startDate: '',
      // 结束时间
      endDate: '',
      threeNames: [],
      resultSet: {},
    }
  },
  created() {
    this.getdata(1)
  },
  methods: {
    // 时间选择
    HandelSelectDate(data) {
      this.startDate = data.startDate
      this.endDate = data.endDate
      // 请求数据
      this.getdata(1)
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      getReportIncomeCash({
        pageNo: this.pageNo, pageSize: this.PagesSize, startDay: this.startDate, endDay: this.endDate, threeNames: this.threeNames
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
    // 请求分页数据
    getdata(index = 1) {
      this.pageNo = index
      getReportIncomeCash({ pageNo: index, pageSize: this.PagesSize, startDay: this.startDate, endDay: this.endDate, threeNames: this.threeNames })
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
      this.threeNames = e.threeNames
      this.getdata(1)
    },
    getresetting() {
      this.threeNames = null
      this.getdata(1)
    },
  }
}
</script>

<style lang="scss"></style>
