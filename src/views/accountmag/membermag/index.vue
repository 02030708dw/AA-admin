<template>
  <el-card>
    <Control ref="ControlView" @Memquery="getMemquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table
      ref="TableView"
      :table-data="tableData"
      @updateStatus="getMemberUdateStatus"
      @Membershiptransfer="getMembershiptransfer"
      @Proxytransfer="getProxytransfer"
    />
    <Pagination :total="total" />
    <Membershiptransfer ref="Membershiptransfer" @confirm="getMembershiptransferok" />
    <Proxytransfer ref="Proxytransfer" @confirm="getProxytransferok" />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
import Control from './Control.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import Membershiptransfer from './Membershiptransfer.vue'
import Proxytransfer from './Proxytransfer.vue'
import {
  MemberPage,
  MemberTransfer,
  agentTransfer,
  MemberUpdateStatus
} from '@/api/account/member'
export default {
  components: {
    Table,
    Pagination,
    Membershiptransfer,
    Proxytransfer,
    Control
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      agentId: '',
      userName: '',
      status: null
    }
  },
  created() {
    this.getMemberPage()
  },
  methods: {
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      MemberPage({ pageNo: this.pageNo, pageSize: 10, agentId: this.agentId, username: this.userName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message({ message: '刷新成功!', type: 'success' })
        })
        .catch((err) => {
          console.log(err)
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false)
            this.$refs.ControlView.HandelBtnStatus()
          })
          this.$message.error('刷新失败!')
        })
    },
    getMembershiptransfer(data) {
      this.$refs.Membershiptransfer.getAddstatus(data)
    },
    getProxytransfer(data) {
      this.$refs.Proxytransfer.getAddstatus(data)
    },
    getProxytransferok(data) {
      agentTransfer(data)
        .then((res) => {
          this.getMemberPage(this.pageNo)
          this.$message({
            message: '代理转移成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('代理转移失败!')
          console.log(err)
        })
    },
    getMembershiptransferok(data) {
      MemberTransfer(data)
        .then((res) => {
          this.getMemberPage(this.pageNo)
          this.$message({
            message: '会员转移成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('会员转移失败!')
          console.log(err)
        })
    },
    getMemberPage(index) {
      // 记录当前页码
      this.pageNo = index

      MemberPage({ pageNo: index, pageSize: 10, agentId: this.agentId, username: this.userName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMemquery(e) {
      this.agentId = e.agentId
      this.userName = e.userName
      this.status = e.status
      this.getMemberPage(1)
    },
    getresetting() {
      this.agentId = ''
      this.userName = ''
      this.status = null
      this.getMemberPage(1)
    },
    getMemberUdateStatus(data) {
      MemberUpdateStatus({ memberId: data.id, status: data.status })
        .then((res) => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.getMemberPage(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss"></style>
