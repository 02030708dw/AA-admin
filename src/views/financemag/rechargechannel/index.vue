<template>
  <el-card>
    <!-- 充值渠道管理 -->
    <Control ref="ControlView" :channelnamedata="ChannelnameData" @RechargeannelAdd="getChannelAddShow" @query="getquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <Table
      ref="TableView"
      :table-data="tableData"
      @updateStatus="getChannelUpdateStatus"
      @delete="getChannelDelete"
      @eitor="getChannelEitorShow"
    />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getchanneldata"
    />
    <RechargechannelAdd
      ref="RechargechannelAdd"
      @confirm="getChannelAdd"
    />
    <RechargechannelEitor
      ref="RechargechannelEitor"
      @confirm="getChannelEitor"
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
import RechargechannelAdd from './RechargechannelAdd.vue'
// 编辑
import RechargechannelEitor from './RechargechannelEitor.vue'
// 接口
import {
  channelPage,
  channelAdd,
  channelDel,
  channelEdit,
  channelUdateStatus
} from '@/api/finance/rechargechannel'
export default {
  components: {
    Table,
    Control,
    Pagination,
    RechargechannelAdd,
    RechargechannelEitor
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
      // 条件查询
      name: '',
      status: null,
      type: null,
      PagesSize: 20
    }
  },
  created() {
    this.getchanneldata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getchanneldata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      channelPage({ pageNo: this.pageNo, pageSize: this.PagesSize, status: this.status, type: this.type, name: this.name })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
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
    // 请求分页数据
    getchanneldata(index) {
      // 记录当前页码
      this.pageNo = index
      channelPage({ pageNo: index, pageSize: this.PagesSize, status: this.status, type: this.type, name: this.name })
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
      channelPage({ pageNo: 1, pageSize: 10000, status: this.status, type: this.type, name: this.name })
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
      this.getchanneldata(1)
    },
    // 恢复默认查询
    getresetting() {
      this.name = ''
      this.status = null
      this.type = null
      this.getchanneldata(1)
    },
    // 状态修改
    getChannelUpdateStatus(data) {
      channelUdateStatus({ channelId: data.id, status: data.status })
        .then((res) => {
          this.getchanneldata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    },
    // 删除
    getChannelDelete(id) {
      channelDel(id)
        .then((res) => {
          this.getchanneldata(this.pageNo)
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
    // 显示编辑弹窗
    getChannelEitorShow(data) {
      this.$refs.RechargechannelEitor.getAddstatus(data)
    },
    // 编辑
    getChannelEitor(data) {
      channelEdit({
        id: data.id,
        name: data.name,
        status: data.status,
        type: data.type
      })
        .then((res) => {
          this.getchanneldata(this.pageNo)
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
    // 显示添加弹窗
    getChannelAddShow() {
      this.$refs.RechargechannelAdd.getAddstatus()
    },
    // 添加
    getChannelAdd(data) {
      channelAdd(data)
        .then((res) => {
          this.getchanneldata(this.pageNo)
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('添加失败!')
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
