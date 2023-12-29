<template>
  <el-card>
    <Control
      ref="ControlView"
      @RechargelAdd="getRechargeAddShow"
      @query="getRechargeQuery"
      @clear="getRechargedata"
      @queryT="getqueryT"
      @resetting="getresetting"
      @Refresh="HandelRefresh"
    />
    <Table
      ref="TableView"
      :table-data="tableData"
      @delete="getRechargeDel"
      @eitor="getRechargeEitorShow"
      @updateStatus="getRechargeUdateStatus"
    />
    <Pagination :total="total" @PageChange="getRechargedata" />
    <rechargeAdd ref="rechargeAdd" @confirm="getRechargeAdd" />
    <rechargeEitor
      ref="rechargeEitor"
      @confirm="getRechargeEitor"
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
// 添加配置
import rechargeAdd from './RechargeAdd.vue'
import rechargeEitor from './RechargeEitor.vue'
// 接口
import {
  RechargePage,
  RechargeDel,
  RechargeAdd,
  RechargeQuery,
  RechargeEdit,
  RechargeUdateStatus
} from '@/api/finance/rechargeconfiguration'
export default {
  components: {
    Table,
    Control,
    Pagination,
    rechargeAdd,
    rechargeEitor
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      type: null,
      channelId: ''
    }
  },
  created() {
    this.getRechargedata(1)
  },
  methods: {
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      RechargePage({ pageNo: this.pageNo, pageSize: 10, channelId: this.channelId, type: this.type })
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
    getRechargedata(index = 1) {
      // 记录当前页码
      this.pageNo = index
      RechargePage({ pageNo: index, pageSize: 10, channelId: this.channelId, type: this.type })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getqueryT(e) {
      this.type = e.type
      this.channelId = e.channelId
      this.getRechargedata(1)
    },
    // 重置
    getresetting() {
      this.type = null
      this.channelId = ''
      this.getRechargedata(1)
    },
    // 显示添加弹窗
    getRechargeAddShow() {
      this.$refs.rechargeAdd.getAddstatus()
    },
    // 添加
    getRechargeAdd(data) {
      RechargeAdd(data)
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('添加失败!')
        })
    },
    // 查询
    getRechargeQuery(channelId) {
      console.log(channelId)
      RechargeQuery(channelId)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除
    getRechargeDel(id) {
      RechargeDel(id)
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除失败!')
        })
    },
    // 显示编辑
    getRechargeEitorShow(data) {
      this.$refs.rechargeEitor.getAddstatus(data)
    },
    // 编辑
    getRechargeEitor(data) {
      RechargeEdit({
        account: data.account,
        alipay: data.alipay,
        bankCardNo: data.bankCardNo,
        bankName: data.bankName,
        channelId: data.channelId,
        coin: data.coin,
        id: data.id,
        status: data.status,
        type: data.type,
        wechat: data.wechat
      })
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('编辑失败!')
        })
    },
    // 修改状态
    getRechargeUdateStatus(data) {
      RechargeUdateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('修改失败!')
        })
    }
  }
}
</script>

<style>
</style>
