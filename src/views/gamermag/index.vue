<template>
  <el-card>
    <Control ref="ControlView" @Refresh="HandelRefresh" @gamerAdd="getGamerAddshow" @query="getquery" @resetting="getresetting" />
    <Table
      ref="TableView"
      :table-data="tableData"
      @eitor="getGamerEitorShow"
      @delete="getGamerDelete"
      @updateStatus="getGamerupdateStatus"
      @bind="getbindShow"
    />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getroledata" />
    <GamerAdd ref="GamerAdd" @confirm="getGamerAdd" />
    <GamerEitor ref="GamerEitor" @confirm="getGamerEitor" />
    <BindGamer ref="BindGamer" @confirm="getBind" />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
// 顶部操作
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import GamerAdd from './GamerAdd.vue'
import GamerEitor from './GamerEitor.vue'
import BindGamer from './GamerBind.vue'
import {
  gamerPage,
  gamerAdd,
  gamerDel,
  gamerEdit,
  gamerupdateStatus,
  gamerbind
} from '@/api/gamer/gamer'
export default {
  components: {
    Table,
    Control,
    Pagination,
    GamerAdd,
    GamerEitor,
    BindGamer
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      name: '',
      status: null,
      PagesSize: 10
    }
  },
  created() {
    this.getroledata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getroledata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      gamerPage({ pageNo: this.pageNo, pageSize: this.PagesSize, name: this.name, status: this.status })
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
    getroledata(index) {
      // 记录当前页码
      this.pageNo = index
      gamerPage({ pageNo: index, pageSize: this.PagesSize, name: this.name, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getquery(e) {
      this.name = e.name
      this.status = e.status
      this.getroledata(1)
    },
    // 重置
    getresetting() {
      this.name = ''
      this.status = null
      this.getroledata(1)
    },
    getGamerAddshow() {
      this.$refs.GamerAdd.getAddstatus()
    },
    // 添加
    getGamerAdd(e) {
      gamerAdd(e)
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo)
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
    getGamerDelete(id) {
      gamerDel({ id })
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo)
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
    // 编辑事件
    getGamerEitorShow(e) {
      this.$refs.GamerEitor.getAddstatus(e)
    },
    getGamerEitor(item) {
      gamerEdit({
        gamerId: item.id,
        status: item.status,
        name: item.name,
        incomeUrl: item.incomeUrl,
        cashUrl: item.cashUrl,
        betUrl: item.betUrl
      })
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo)
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
    // 状态修改
    getGamerupdateStatus(data) {
      console.log(data)
      gamerupdateStatus({ gamerId: data.id, status: data.status })
        .then((res) => {
          this.getroledata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('修改失败!')
        })
    },
    // 绑定游戏商游戏类型
    getbindShow(data) {
      this.$refs.BindGamer.getAddstatus(data)
    },
    getBind(e) {
      gamerbind({ gamerId: e.gamerId, types: e.types }).then(res => {
        this.getroledata(this.pageNo)
        this.$message({
          message: '绑定成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('绑定失败!')
      })
    }
  }
}
</script>
<style>
</style>
