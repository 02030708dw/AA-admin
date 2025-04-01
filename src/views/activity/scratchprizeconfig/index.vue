<template>
  <el-card>
    <Control :WeightGroup="WeightGroup" ref="ControlView" @resetting="getresetting" @query="getquery" @ControlAdd="getAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @EditorShow="getEitorShow" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsAdd :WeightGroup="WeightGroup" ref="ComponentsAdd" @confirm="getAdd" />
    <ComponentsEitor :WeightGroup="WeightGroup" ref="ComponentsEitor" @confirm="getEitor" />
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
} from '@/api/activity/scratchprizeconfig'
import { getWeightGroup } from '@/api/activity/scratchweightgroup'
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
      name: null, //
      status: null,//
      WeightGroup:[],
    }
  },
  created() {
    this.getdata(1)
    getWeightGroup().then(res => {
      this.WeightGroup = res.resultSet
    })
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
        pageNo: this.pageNo, pageSize: this.PagesSize, id:this.id
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, id:this.id})
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.id = e.id
      this.getdata(1)
    },
    getresetting() {
      this.id = null
      this.getdata(1)
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.ComponentsAdd.getAddstatus()
    },
  
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
  }
}
</script>

<style lang="scss"></style>
