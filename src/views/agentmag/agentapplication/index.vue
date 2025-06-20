<template>
  <el-card>
    <Control ref="ControlView" @ApplicationDate="ApplicationDate" @ReviewDate="ReviewDate" @resetting="getresetting"
      @query="getquery" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @EditorShow="getExamineShow" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsExamine ref="ComponentsExamine" @confirm="getExamine" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ComponentsExamine from './ComponentsExamine.vue'
import {
  ServicePage,
  ServiceExamine
} from '@/api/agent/application'
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsExamine
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      form: {
        status: null, // 状态
        memberId: null,
        reviewerId: null,
        applicationEndDate: '',//申请结束时间
        applicationStartDate: '',//申请开始时间
        reviewEndDate: '',//审核结束时间
        reviewStartDate: '',//审核开始时间
      }
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
    // 申请时间
    ApplicationDate(data) {
      this.form.applicationStartDate = data.startDate
      this.form.applicationEndDate = data.endDate
      // 请求数据
      this.getdata(1)
    },
    // 审核时间
    ReviewDate(data) {
      this.form.reviewStartDate = data.startDate
      this.form.reviewEndDate = data.endDate
      // 请求数据
      this.getdata(1)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      ServicePage({
        pageNo: this.pageNo, pageSize: this.PagesSize, ...this.form
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
      ServicePage({ pageNo: index, pageSize: this.PagesSize, ...this.form })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.form.status = e.status
      this.form.memberId = e.memberId
      this.form.reviewerId = e.reviewerId
      this.getdata(1)
    },
    getresetting() {
      this.form = {
        status: null, // 状态
        memberId: null,
        reviewerId: null,
        applicationEndDate: '',//申请结束时间
        applicationStartDate: '',//申请开始时间
        reviewEndDate: '',//审核结束时间
        reviewStartDate: '',//审核开始时间
      }
      this.getdata(1)
    },
    // 显示编辑弹窗
    getExamineShow(e) {
      this.$refs.ComponentsExamine.getAddstatus(e)
    },
    getExamine(data) {
      ServiceExamine(data)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '审核成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('审核失败!')
          console.log(err)
        })
    },

  }
}
</script>

<style lang="scss"></style>
