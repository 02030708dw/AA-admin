<template>
  <el-card>
    <!-- @Refresh="HandelRefresh" -->
    <Control ref="ControlView" @AuthorityAdd="getAuthorityAddShow"  />
    <Table
      ref="TableView"
      :table-data="tableData"
      @delete="getAuthorityDel"
      @updateStatus="getAuthorityUdateStatus"
      @eitor="getAuthorityEitorShow"
    />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getAuthoritydata"
    />
    <AuthorityAdd ref="AuthorityAdd" @confirm="getAuthorityAdd" />
    <AuthorityEditor
      ref="AuthorityEditor"
      @confirm="getAuthorityEitor"
    />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
// 顶部操作
import Control from './Control'
// 分页组件
import Pagination from '@/components/Pagination/Pagination.vue'
// 添加
import AuthorityAdd from './AuthorityAdd.vue'
// 编辑
import AuthorityEditor from './AuthorityEditor.vue'
import {
  getAuthorityPage,
  getAuthorityAdd,
  getAuthorityDel,
  getAuthorityEdit,
  getAuthorityUdateStatus
} from '@/api/systemmag/authority'
export default {
  components: { Table, Control, Pagination, AuthorityAdd, AuthorityEditor },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      PagesSize: 20
    }
  },
  created() {
    this.getAuthoritydata(1)
  },
  methods: {
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      getAuthorityPage({ pageNo: this.pageNo, pageSize: this.PagesSize })
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
          }, 1000)
          this.$message.error('刷新失败!')
        })
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getAuthoritydata(this.pageNo)
    },
    // 获取分页数据
    getAuthoritydata(index = 1) {
      // 记录当前页码
      this.pageNo = index
      getAuthorityPage({ pageNo: index, pageSize: this.PagesSize })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 显示添加
    getAuthorityAddShow() {
      this.$refs.AuthorityAdd.getAddstatus()
    },
    // 添加
    getAuthorityAdd(data) {
      getAuthorityAdd(data)
        .then((res) => {
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          this.getAuthoritydata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('添加失败!')
          console.log(err)
        })
    },
    // 显示编辑
    getAuthorityEitorShow(data) {
      this.$refs.AuthorityEditor.getAddstatus(data)
    },
    // 编辑
    getAuthorityEitor(data) {
      getAuthorityEdit(data)
        .then((res) => {
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
          this.getAuthoritydata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('编辑失败!')
          console.log(err)
        })
    },
    // 删除
    getAuthorityDel(id) {
      getAuthorityDel(id)
        .then((res) => {
          this.getAuthoritydata(this.pageNo)
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
    // 修改状态
    getAuthorityUdateStatus(data) {
      getAuthorityUdateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getAuthoritydata(this.pageNo)
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

<style lang="scss">
</style>
