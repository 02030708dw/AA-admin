<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @ControlAdd="getAddShow"
      @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @UdateStatus="getUdateStatus"
      @EditorShow="getEitorShow" />
    <Pagination :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsAdd ref="ComponentsAdd" @confirm="getAdd" />
    <ComponentsEitor ref="ComponentsEitor" @confirm="getEitor" />
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
  ServiceEdit,
} from '@/api/activity/voucherlinkconfig'

export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsAdd,
    ComponentsEitor,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      name: '',
      status: null,
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
      ServicePage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        name: this.name,
        status: this.status,
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 500)
          this.$message.success('刷新成功!')
        })
        .catch(() => {
          this.$refs.TableView.HandelLoading(false)
          this.$refs.ControlView.HandelBtnStatus()
          this.$message.error('刷新失败!')
        })
    },
    getdata(index = 1) {
      this.pageNo = index
      ServicePage({
        pageNo: index,
        pageSize: this.PagesSize,
        name: this.name,
        status: this.status,
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getquery(e) {
      this.status = e.status
      this.name = e.name
      this.getdata(1)
    },
    getresetting() {
      this.status = null
      this.name = ''
      this.getdata(1)
    },
    getAddShow() {
      this.$refs.ComponentsAdd.getAddstatus()
    },
    getAdd(data) {
      ServiceAdd(data)
        .then(() => {
          this.getdata(this.pageNo)
          this.$message.success('添加成功!')
        })
        .catch(() => {
          this.$message.error('添加失败!')
        })
    },
    getDel(id) {
      ServiceDel(id)
        .then(() => {
          this.getdata(this.pageNo)
          this.$message.success('删除成功!')
        })
        .catch(() => {
          this.$message.error('删除失败!')
        })
    },
    getUdateStatus(data) {
      ServiceEdit(data)
        .then(() => {
          this.$message.success('修改成功!')
          this.getdata(this.pageNo)
        })
        .catch(() => {
          this.$message.error('修改失败!')
        })
    },
    getEitorShow(row) {
      this.$refs.ComponentsEitor.getAddstatus(row)
    },
    getEitor(data) {
      ServiceEdit(data)
        .then(() => {
          this.getdata(this.pageNo)
          this.$message.success('编辑成功!')
        })
        .catch(() => {
          this.$message.error('编辑失败!')
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
