<template>
  <el-card>
    <Control :channelid-list="channelIdList" ref="ControlView" @resetting="getresetting" @query="getquery"
      @ControlAdd="getAddShow" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @UdateStatus="getUdateStatus"
      @EditorShow="getEitorShow" />
    <Pagination :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsAdd :channelid-list="channelIdList" ref="ComponentsAdd" @confirm="getAdd" />
    <ComponentsEitor :channelid-list="channelIdList" ref="ComponentsEitor" @confirm="getEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ComponentsAdd from './ComponentsAdd.vue'
import ComponentsEitor from './ComponentsEitor.vue'
import {
  ServicePage,
  ServiceAdd,
  ServiceDel,
  ServiceEdit
} from '@/api/finance/membercashmanage'
import { WithdrawalchannelsPage } from '@/api/finance/withdrawalchannel'
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsAdd,
    ComponentsEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      bankAccount: "",
      bankName: "",
      cashChannelId: null,
      memberName: "",
      channelIdList: []
    }
  },
  created() {
    this.getdata(1)
    this.GetChannelname()
  },
  methods: {
    // 获取渠道名称
    GetChannelname() {
      WithdrawalchannelsPage({ pageNo: 1, pageSize: 1000000, name: this.name, status: this.status, type: this.type })
        .then((res) => {
          this.channelIdList = []
          for (let i = 0; i < res.resultSet.data.length; i++) {
            this.channelIdList.push({
              title: res.resultSet.data[i].name,
              index: res.resultSet.data[i].id,
              type: res.resultSet.data[i].type
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
        pageNo: this.pageNo, pageSize: this.PagesSize, memberName: this.memberName, bankAccount: this.bankAccount, bankName: this.bankName, cashChannelId: this.cashChannelId
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, memberName: this.memberName, bankAccount: this.bankAccount, bankName: this.bankName, cashChannelId: this.cashChannelId })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.memberName = e.memberName
      this.bankAccount = e.bankAccount
      this.bankName = e.bankName
      this.cashChannelId = e.cashChannelId
      this.getdata(1)
    },
    getresetting() {
      this.memberName = ""
      this.bankAccount = ""
      this.bankName = ""
      this.cashChannelId = null
      this.getdata(1)
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.ComponentsAdd.getAddstatus()
    },
    // 添加
    getAdd(e) {
      ServiceAdd(e)
        .then((res) => {
          this.getdata(this.pageNo)
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
    // 显示编辑弹窗
    getEitorShow(e) {
      this.$refs.ComponentsEitor.getAddstatus(e)
    },
    getEitor(data) {
      ServiceEdit(data)
        .then((res) => {
          this.getdata(this.pageNo)
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
    //修改状态
    getUdateStatus(data) {
      ServiceEdit(data)
        .then((res) => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.getdata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    },
  }
}
</script>

<style lang="scss"></style>
