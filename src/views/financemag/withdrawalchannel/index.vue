<template>
  <el-card>
    <Control ref="ControlView" :channelnamedata="ChannelnameData" @Refresh="HandelRefresh" @query="getquery" @resetting="getresetting" @WithdrawalchannelsAdd="getWithdrawalchannelsAddShow" />
    <Table
      ref="TableView"
      :table-data="tableData"
      @delete="getWithdrawalchannelsDel"
      @eitor="getWithdrawalchannelsEitorShow"
      @updateStatus="getWithdrawalchannelsUdateStatus"
    />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange"
    @PageChange="getWithdrawalchannelsdata"/>
    <withdrawalchannelsAdd
      ref="withdrawalchannelsAdd"
      @confirm="getWithdrawalchannelsAdd"
    />
    <WithdrawalchannelsEitor
      ref="WithdrawalchannelsEitor"
      @confirm="getWithdrawalchannelsEitor"
    />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
// 顶部操作
import Control from './Control'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
// 添加
import withdrawalchannelsAdd from './WithdrawalchannelsAdd.vue'
// 编辑
import WithdrawalchannelsEitor from './WithdrawalchannelsEitor.vue'
import {
  WithdrawalchannelsPage,
  WithdrawalchannelsDel,
  WithdrawalchannelsAdd,
  WithdrawalchannelsEdit,
  WithdrawalchannelsUdateStatus
} from '@/api/finance/withdrawalchannel'
export default {
  components: {
    Table,
    Control,
    Pagination,
    withdrawalchannelsAdd,
    WithdrawalchannelsEitor
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      // 渠道名称
      ChannelnameData: [],
      name: '',
      status: null,
      type: null,
      PagesSize: 20
    }
  },
  created() {
    this.getWithdrawalchannelsdata()
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getWithdrawalchannelsdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      WithdrawalchannelsPage({ pageNo: this.pageNo, pageSize: this.PagesSize, name: this.name, status: this.status, type: this.type })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          // 获取渠道名称
          this.GetChannelname()
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
    // 获取分页数据
    getWithdrawalchannelsdata(index) {
      // 记录当前页码
      this.pageNo = index
      WithdrawalchannelsPage({ pageNo: index, pageSize: this.PagesSize, name: this.name, status: this.status, type: this.type })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          this.GetChannelname()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取渠道名称
    GetChannelname() {
      WithdrawalchannelsPage({ pageNo: 1, pageSize: 1000000, name: this.name, status: this.status, type: this.type })
        .then((res) => {
          this.ChannelnameData = []
          for (let i = 0; i < res.resultSet.data.length; i++) {
            this.ChannelnameData.push(res.resultSet.data[i].name)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getquery(e) {
      this.name = e.name
      this.status = e.status
      this.type = e.type
      this.getWithdrawalchannelsdata(1)
    },
    // 重置
    getresetting() {
      this.name = ''
      this.status = null
      this.type = null
      this.getWithdrawalchannelsdata(1)
    },
    // 添加
    getWithdrawalchannelsAddShow() {
      this.$refs.withdrawalchannelsAdd.getAddstatus()
    },
    getWithdrawalchannelsAdd(data) {
      WithdrawalchannelsAdd(data)
        .then((res) => {
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          this.getWithdrawalchannelsdata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('添加失败!')
          console.log(err)
        })
    },
    // 编辑
    getWithdrawalchannelsEitorShow(data) {
      this.$refs.WithdrawalchannelsEitor.getAddstatus(data)
    },
    getWithdrawalchannelsEitor(data) {
      WithdrawalchannelsEdit(data)
        .then((res) => {
          this.getWithdrawalchannelsdata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('编辑失败!')
          console.log(err)
        })
    },
    // 删除
    getWithdrawalchannelsDel(id) {
      WithdrawalchannelsDel(id)
        .then((res) => {
          this.getWithdrawalchannelsdata(this.pageNo)
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
    // 改变状态
    getWithdrawalchannelsUdateStatus(data) {
      WithdrawalchannelsUdateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getWithdrawalchannelsdata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
