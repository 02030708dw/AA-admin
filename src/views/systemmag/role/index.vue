<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @roleAdd="getAdddialog" @rolequery="getrolequery" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @updateStatus="getupdateStatus" @roledel="getroledel" @roleEditor="getEditordialog" />
    <!-- 分页组件 -->
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getroledata" />
    <!-- 添加组件 -->
    <RoleAdd ref="roleadd" @confirm="getadd" />
    <!-- 编辑组件 -->
    <RoleEditor ref="roleeditor" @confirm="getroleEditor" />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
// 顶部操作
import Control from './Control'
// 分页组件
import Pagination from '@/components/Pagination/Pagination.vue'
// 新增组件
import RoleAdd from './RoleAdd.vue'
// 编辑组件
import RoleEditor from './RoleEditor.vue'
// 请求
import {
  getrolePage,
  getroleupdateStatus,
  getroleAdd,
  getroleDel,
  getroleEdit
} from '@/api/systemmag/role'
export default {
  components: {
    Table,
    Control,
    Pagination,
    RoleAdd,
    RoleEditor
  },
  data() {
    return {
      // 角色数据
      tableData: [],
      // 编辑信息
      EditorData: {},
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      status: null,
      code: '',
      roleName: '',
      PagesSize: 10
    }
  },
  created() {
    // 初始化角色数据
    this.getroledata(1)
    this.getroledata(this.pageNo)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      getrolePage({ pageNo: this.pageNo, pageSize: this.PagesSize, code: this.code, roleName: this.roleName, status: this.status })
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
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message.error('刷新失败!')
        })
    },
    // 请求角色分页数据
    getroledata(index) {
      // 记录当前页码
      this.pageNo = index
      // 条件查询
      getrolePage({ pageNo: index, pageSize: this.PagesSize, code: this.code, roleName: this.roleName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getrolequery(e) {
      this.status = e.status
      this.code = e.code
      this.roleName = e.roleName
      this.getroledata(1)
    },
    // 重置查询
    getresetting() {
      this.status = null
      this.code = ''
      this.roleName = ''
      this.getroledata(1)
    },
    // 更新角色状态
    getupdateStatus(e) {
      getroleupdateStatus({ id: e.Id, status: e.status })
        .then((res) => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          // 刷新数据
          this.getroledata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    },
    // 新增角色
    getadd(e) {
      getroleAdd(e)
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo)
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message.error('添加失败!')
        })
    },
    // 删除角色
    getroledel(Id) {
      getroleDel(Id)
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo)
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
    // 编辑角色
    getroleEditor({ code, id, remark, roleName, status }) {
      getroleEdit({ code, id, remark, roleName, status })
        .then((res) => {
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
          // 刷新数据
          this.getroledata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('编辑失败!')
          console.log(err)
        })
    },
    // 弹窗
    getAdddialog() {
      this.$refs.roleadd.getAddstatus()
    },
    getEditordialog(e) {
      this.$refs.roleeditor.getEditorstatus(e)
    }
  }
}
</script>

<style lang="scss"></style>
