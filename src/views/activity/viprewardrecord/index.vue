<template>
  <el-card>
    <Control ref="ControlView" @SelectDate="HandelSelectDate" @resetting="getresetting" @query="getquery"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import {
  ServicePage,
  ServiceAdd,
  ServiceDel,
  ServiceEdit
} from '@/api/activity/vipreward'
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
      startTime: null, //领取类型
      entTime: null,//奖励类型
      isClaimed: null,//是否领取过
      memberId: null,//用户id
      vipRewardId: null,//vip奖励id
    }
  },
  created() {
    this.getdata(1)
  },
  methods: {
    // 时间选择
    HandelSelectDate(data) {
      this.startTime = data.startDate
      this.entTime = data.endDate
      // 请求数据
      this.getData(1)
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
        pageNo: this.pageNo, pageSize: this.PagesSize, startTime: this.startTime, entTime: this.entTime, isClaimed: this.isClaimed, memberId: this.memberId, vipRewardId: this.vipRewardId
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, startTime: this.startTime, entTime: this.entTime, isClaimed: this.isClaimed, memberId: this.memberId, vipRewardId: this.vipRewardId })
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
      this.memberId = e.memberId
      this.vipRewardId = e.vipRewardId
      this.getdata(1)
    },
    getresetting() {
      this.isClaimed = null
      this.memberId = null
      this.vipRewardId = null
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
