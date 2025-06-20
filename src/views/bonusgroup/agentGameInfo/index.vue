<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @EditorShow="getEitorShow" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsEitor ref="ComponentsEitor" @confirm="getEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ComponentsEitor from './ComponentsEitor.vue'
import {
  ServicePage,
  ServiceEdit
} from '@/api/bonusgroup/agentGameInfo'
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      agentName: "",
      gameName: "",
      playName: "",
      playTypeName: "",
    }
  },
  created() {
    this.getdata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      ServicePage({
        pageNo: this.pageNo, pageSize: this.PagesSize, agentName: this.agentName, gameName: this.gameName, playName: this.playName, playTypeName: this.playTypeName
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, agentName: this.agentName, gameName: this.gameName, playName: this.playName, playTypeName: this.playTypeName })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.agentName = e.agentName
      this.gameName = e.gameName
      this.playName = e.playName
      this.playTypeName = e.playTypeName
      this.getdata(1)
    },
    getresetting() {
      this.agentName = null
      this.gameName = null
      this.playName = null
      this.playTypeName = null
      this.getdata(1)
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
  }
}
</script>

<style lang="scss"></style>
