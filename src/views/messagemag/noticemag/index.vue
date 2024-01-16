<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @NoticeAdd="getNoticeAddShow" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table
      ref="TableView"
      :table-data="tableData"
      @UdateStatusClose="getnoticedata"
      @NoticeDel="getNoticeDel"
      @NoticeUpdateStatus="getNoticeUpdateStatus"
      @NoticeEitor="getNotcieEitorShow"
    />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange"  @PageChange="getnoticedata" />
    <noticeAdd ref="noticeAdd" :noticetype-page="noticetypePage" @confirm="getNoticeAdd" />
    <noticeEitor ref="noticeEitor" :noticetype-page="noticetypePage" @confirm="getNoticeEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import noticeAdd from './noticeAdd.vue'
import noticeEitor from './noticeEitor.vue'
import {
  noticePage,
  addnotice,
  delnotice,
  updateStatus,
  editnotice
} from '@/api/message/notice'
import { noticetypePage } from '@/api/message/noticetype'
export default {
  components: {
    Table,
    Control,
    Pagination,
    noticeAdd,
    noticeEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      noteTypeId: '', // 公告类型id
      status: null, // 状态
      noticetypePage: [],
      PagesSize: 20
    }
  },
  created() {
    this.getnoticedata(1)
    this.getnoticetypePage()
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getnoticedata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      noticePage({ pageNo: this.pageNo, pageSize: this.PagesSize, noteTypeId: this.noteTypeId, status: this.status })
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
    // 请求公告类型
    getnoticetypePage() {
      this.noticetypePage = []
      noticetypePage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.noticetypePage.push({
            id: res.resultSet.data[i].id,
            name: res.resultSet.data[i].name
          })
        }
        console.log(this.noticetypePage)
      }).catch(err => {
        console.log(err)
      })
    },
    // 请求分页数据
    getnoticedata(index = 1) {
      this.pageNo = index
      noticePage({ pageNo: index, pageSize: this.PagesSize, noteTypeId: this.noteTypeId, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.noteTypeId = e.noteTypeId
      this.status = e.status
      this.getnoticedata(1)
    },
    getresetting() {
      this.noteTypeId = ''
      this.status = null
      this.getnoticedata(1)
    },
    // 显示添加公告弹窗
    getNoticeAddShow() {
      this.$refs.noticeAdd.getAddstatus()
    },
    // 添加公告
    getNoticeAdd(e) {
      addnotice(e)
        .then((res) => {
          this.getnoticedata(this.pageNo)
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
    getNoticeDel(id) {
      delnotice(id)
        .then((res) => {
          this.getnoticedata(this.pageNo)
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
    getNotcieEitorShow(e) {
      this.$refs.noticeEitor.getAddstatus(e)
    },
    getNoticeEitor(data) {
      editnotice({
        content: data.content,
        id: data.id,
        noteTypeId: data.noteTypeId,
        status: data.status,
        title: data.title
      })
        .then((res) => {
          this.getnoticedata(this.pageNo)
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
    getNoticeUpdateStatus(data) {
      console.log(data)
      // return;
      updateStatus({
        status: data.status,
        id: data.id,
        canceler: data.canceler,
        publisher: data.publisher
      })
        .then((res) => {
          // this.getnoticedata(this.pageNo);
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
