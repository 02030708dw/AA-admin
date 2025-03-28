<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @ControlAdd="getAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @EditorShow="getEitorShow" @UdateStatus="getStatus" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <businessAdd ref="businessAdd" @confirm="getAdd" />
    <businessEitor ref="businessEitor" @confirm="getEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import businessAdd from './businessAdd.vue'
import businessEitor from './businessEitor.vue'
import {
  bussinesPage,
  bussinesAdd,
  bussinesDel,
  bussinesStatus,
  bussinesEdit
} from '@/api/rule/bussines'
export default {
  components: {
    Table,
    Control,
    Pagination,
    businessAdd,
    businessEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      status: null, // 状态
      type: '',
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
      bussinesPage({ pageNo: this.pageNo, pageSize: this.PagesSize, status: this.status, type: this.type, })
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
      bussinesPage({ pageNo: index, pageSize: this.PagesSize, status: this.status, type: this.type, })
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
      this.type = e.type
      this.getdata(1)
    },
    getresetting() {
      this.status = null
      this.type = null
      this.getdata(1)
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.businessAdd.getAddstatus()
    },
    // 添加公告
    getAdd(e) {
      bussinesAdd(e)
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
      bussinesDel(id)
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
      this.$refs.businessEitor.getAddstatus(e)
    },
    getEitor(data) {
      bussinesEdit({
        id: data.id,
        msg: data.msg,
        priority: data.priority,
        remark: data.remark,
        requirement: data.requirement,
        ruleName: data.ruleName,
        status: data.status,
        type: data.type,
        url: data.url
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
      bussinesStatus({
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
