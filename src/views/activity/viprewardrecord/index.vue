<template>
  <el-card>
    <Control ref="ControlView" @SelectDate="HandelSelectDate" @resetting="getresetting" @query="getquery"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" />
    <Pagination :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import {
  ServicePage,
} from '@/api/activity/viprewardrecord'
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
      isClaimed: null,//是否领取过
      name: null,//用户名
      // 开始时间
      startDate: '',
      // 结束时间
      endDate: '',
      rewardType: null,
      vipLevel: null,
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
      ServicePage({
        pageNo: this.pageNo, pageSize: this.PagesSize, startDate: this.startDate, endDate: this.endDate, isClaimed: this.isClaimed, name: this.name, vipLevel: this.vipLevel, rewardType: this.rewardType
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, startDate: this.startDate, endDate: this.endDate, isClaimed: this.isClaimed, name: this.name, vipLevel: this.vipLevel, rewardType: this.rewardType })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.isClaimed = e.isClaimed
      this.name = e.name
      this.vipLevel = e.vipLevel
      this.rewardType = e.rewardType
      this.getdata(1)
    },
    getresetting() {
      this.isClaimed = null
      this.name = null
      this.vipLevel = null
      this.rewardType = null
      this.getdata(1)
    },
    // 删除
    getDel(id) {
      ServiceDel(id)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('删除失败!')
          console.log(err)
        })
    },

  }
}
</script>

<style lang="scss"></style>
