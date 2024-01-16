<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @noticetypeAdd="getAdddialog" @Refresh="HandelRefresh" />
    <Table
      ref="TableView"
      :table-data="tableData"
      @Edl="getDel"
      @EditorShow="getnottypeeditorshow"
      @UdateStatus="getUdateStatus"
    />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getnoticetypedata"
    />
    <NoticetypeAdd ref="nottypeadd" @confirm="getaddnoticetype" />
    <NoticetypeEditor
      ref="nottypeeditor"
      @confirm="getEditornoticetype"
    />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import NoticetypeAdd from './NoticetypeAdd'
import NoticetypeEditor from './NoticetypeEditor.vue'
import {
  noticetypePage,
  addnoticetype,
  delnoticetype,
  editnoticetype,
  updateStatus
} from '@/api/message/noticetype'
export default {
  components: {
    Table,
    Control,
    Pagination,
    NoticetypeAdd,
    NoticetypeEditor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      name: '',
      status: null,
      PagesSize: 20
    }
  },
  created() {
    this.getnoticetypedata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getnoticetypedata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      noticetypePage({ pageNo: this.pageNo, pageSize: this.PagesSize, name: this.name, status: this.status })
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
    // 删除公告类型
    getDel(id) {
      delnoticetype(id)
        .then((res) => {
          this.getnoticetypedata(this.pageNo)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除失败!')
        })
    },
    // 请求分页数据
    getnoticetypedata(index) {
      this.pageNo = index
      noticetypePage({ pageNo: index, pageSize: this.PagesSize, name: this.name, status: this.status })
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
      this.status = e.status
      this.getnoticetypedata(1)
    },
    getresetting() {
      this.name = ''
      this.status = null
      this.getnoticetypedata(1)
    },
    // 打开公告类型弹窗
    getAdddialog() {
      this.$refs.nottypeadd.getAddstatus()
    },
    getEditornoticetype(data) {
      editnoticetype({ status: data.status, name: data.name, id: data.id })
        .then((res) => {
          this.getnoticetypedata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('编辑失败!')
        })
    },
    getUdateStatus(data) {
      updateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getnoticetypedata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('修改失败!')
        })
    },
    // 添加公告
    getaddnoticetype(e) {
      addnoticetype(e)
        .then((res) => {
          // 刷新数据
          this.getnoticetypedata(this.pageNo)
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
    // 打开编辑公告弹窗
    getnottypeeditorshow(item) {
      this.$refs.nottypeeditor.getEditorstatus(item)
    }
  }
}
</script>

<style>
</style>
