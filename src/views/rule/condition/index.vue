<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @ControlAdd="getAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @EditorShow="getEitorShow" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ConditionAdd ref="ConditionAdd" @confirm="getAdd" />
    <ConditionEitor ref="ConditionEitor" @confirm="getEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ConditionAdd from './conditionAdd.vue'
import ConditionEitor from './conditionEitor.vue'
import {
  conditionPage,
  conditionAdd,
  conditionDel,
  conditionEdit
} from '@/api/rule/condition'
export default {
  components: {
    Table,
    Control,
    Pagination,
    ConditionAdd,
    ConditionEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      status: null, // 状态
      type: '',
      name: '',
      PagesSize: 20
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
      conditionPage({ pageNo: this.pageNo, pageSize: this.PagesSize,name: this.name, type: this.type, })
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
      conditionPage({ pageNo: index, pageSize: this.PagesSize, name: this.name, type: this.type, })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.name = e.name
      this.type = e.type
      this.getdata(1)
    },
    getresetting() {
      this.name = null
      this.type = null
      this.getdata(1)
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.ConditionAdd.getAddstatus()
    },
    // 添加公告
    getAdd(e) {
      conditionAdd(e)
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
      conditionDel(id)
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
      this.$refs.ConditionEitor.getAddstatus(e)
    },
    getEitor(data) {
      conditionEdit({
        id: data.id,
        filed: data.filed,
        name: data.name,
        type: data.type,
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
  }
}
</script>

<style lang="scss"></style>
