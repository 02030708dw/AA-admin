<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @ControlAdd="getAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @EditorShow="getEitorShow" @UdateStatus="getStatus" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsAdd :gamerIdData="GamerIdData" :gameIdData="GameIdData" ref="ComponentsAdd" @confirm="getAdd" />
    <ComponentsEitor :gamerIdData="GamerIdData" :gameIdData="GameIdData" ref="ComponentsEitor" @confirm="getEitor" />
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
  ServiceStatus,
  ServiceEdit
} from '@/api/game/demo'
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
      status: null, // 状态
      type: '',
      account: '',
      PagesSize: 20,
      GameIdData: [],
      GamerIdData: []
    }
  },
  created() {
    this.getdata(1)
    this.GetGamerPages()
    this.GetGamePages()
  },
  methods: {
    // 获取游戏商id
    GetGamerPages() {
      this.GamerIdData = []
      let res = this.$store.state.user.gamer
      for (let i = 0; i < res.length; i++) {
        this.GamerIdData.push({
          title: res[i].name,
          index: res[i].id
        })
      }
    },
    // 获取游戏id
    async GetGamePages() {
      this.GameIdData = []
      let res = this.$store.state.user.game
      for (let i = 0; i < res.length; i++) {
        this.GameIdData.push({
          title: res[i].name,
          index: res[i].id
        })
      }
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
        pageNo: this.pageNo, pageSize: this.PagesSize, status: this.status, account: this.account, type: this.type,
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, status: this.status, account: this.account, type: this.type, })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.status = e.status
      this.account = e.account
      this.type = e.type
      this.getdata(1)
    },
    getresetting() {
      this.status = null
      this.account = null
      this.type = null
      this.getdata(1)
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.ComponentsAdd.getAddstatus()
    },
    // 添加公告
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
      ServiceEdit({
        id: data.id,
        name: data.name,
        posterImage: data.posterImage,
        url: data.url,
      })
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
    // 状态修改
    getStatus(data) {
      console.log(data)
      // return;
      ServiceStatus({
        status: data.status,
        id: data.id,
      })
        .then((res) => {
          // this.getdata(this.pageNo);
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

<style lang="scss"></style>
