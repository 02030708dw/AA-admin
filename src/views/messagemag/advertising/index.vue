<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @advertisingAdd="getAdvertisingAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @EditorShow="getEitorShow" @UdateStatus="getStatus" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getadvertisingdata" />
    <advertisingAdd ref="advertisingAdd" @confirm="getAdvertisingAdd" />
    <advertisingEitor ref="advertisingEitor" @confirm="getAdvertisingEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import advertisingAdd from './advertisingAdd.vue'
import advertisingEitor from './advertisingEitor.vue'
import {
  bannerPage,
  bannerAdd,
  bannerDel,
  bannerStatus,
  bannerEdit
} from '@/api/message/advertising'
export default {
  components: {
    Table,
    Control,
    Pagination,
    advertisingAdd,
    advertisingEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      status: null, // 状态
      PagesSize: 20
    }
  },
  created() {
    this.getadvertisingdata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getadvertisingdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      bannerPage({ pageNo: this.pageNo, pageSize: this.PagesSize, status: this.status })
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
    getadvertisingdata(index = 1) {
      this.pageNo = index
      bannerPage({ pageNo: index, pageSize: this.PagesSize, status: this.status })
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
      this.getadvertisingdata(1)
    },
    getresetting() {
      this.status = null
      this.getadvertisingdata(1)
    },
    // 显示添加弹窗
    getAdvertisingAddShow() {
      this.$refs.advertisingAdd.getAddstatus()
    },
    // 添加公告
    getAdvertisingAdd(e) {
      bannerAdd(e)
        .then((res) => {
          this.getadvertisingdata(this.pageNo)
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
      bannerDel(id)
        .then((res) => {
          this.getadvertisingdata(this.pageNo)
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
      this.$refs.advertisingEitor.getAddstatus(e)
    },
    getAdvertisingEitor(data) {
      bannerEdit({
        content: data.content,
        id: data.id,
        status: data.status,
        title: data.title
      })
        .then((res) => {
          this.getadvertisingdata(this.pageNo)
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
      bannerStatus({
        status: data.status,
        id: data.id,
        canceler: data.canceler,
        publisher: data.publisher
      })
        .then((res) => {
          // this.getadvertisingdata(this.pageNo);
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
