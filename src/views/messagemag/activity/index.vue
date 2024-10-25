<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @activityAdd="getactivityAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @EditorShow="getEitorShow" @UdateStatus="getStatus" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getactivitydata" />
    <ActivityAdd :gamer-id-data="GamerIdData" ref="ActivityAdd" @confirm="getactivityAdd" />
    <ActivityEitor :gamer-id-data="GamerIdData" ref="ActivityEitor" @confirm="getactivityEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ActivityAdd from './activityAdd.vue'
import ActivityEitor from './activityEitor.vue'
import {
  activityPage,
  activityAdd,
  activityDel,
  activityStatus,
  activityEdit
} from '@/api/message/activity'
export default {
  components: {
    Table,
    Control,
    Pagination,
    ActivityAdd,
    ActivityEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      status: null, // 状态
      PagesSize: 20,
      GamerIdData:[]
    }
  },
  created() {
    this.getactivitydata(1)
    this.GetGamerPages()
  },
  methods: {
    // 获取游戏商id
    GetGamerPages() {
      this.GamerIdData = []
      let res = this.$store.state.user.gamer
      for (let i = 0; i < res.length; i++) {
        this.GamerIdData.push({
          title: res[i].name,
          index: res[i].id
        })
      }
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getactivitydata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      activityPage({ pageNo: this.pageNo, pageSize: this.PagesSize, status: this.status, title: this.title, type: this.type })
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
    getactivitydata(index = 1) {
      this.pageNo = index
      activityPage({ pageNo: index, pageSize: this.PagesSize, status: this.status, title: this.title, type: this.type })
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
      this.title = e.title
      this.type = e.type
      this.getactivitydata(1)
    },
    getresetting() {
      this.status = null
      this.title = ''
      this.type = null
      this.getactivitydata(1)
    },
    // 显示添加弹窗
    getactivityAddShow() {
      this.$refs.ActivityAdd.getAddstatus()
    },
    // 添加公告
    getactivityAdd(e) {
      activityAdd(e)
        .then((res) => {
          this.getactivitydata(this.pageNo)
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
      activityDel(id)
        .then((res) => {
          this.getactivitydata(this.pageNo)
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
      this.$refs.ActivityEitor.getAddstatus(e)
    },
    getactivityEitor(data) {
      activityEdit({
        content: data.content,
        id: data.id,
        pictureInfos: data.pictureInfos,
        title: data.title,
        type: data.type,
        isShow: data.isShow,
        gamerId: data.gamerId,
        giftAmount: data.giftAmount,
        rechargeAmount: data.rechargeAmount,
      })
        .then((res) => {
          this.getactivitydata(this.pageNo)
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
      activityStatus({
        status: data.status,
        id: data.id,
      })
        .then((res) => {
          // this.getactivitydata(this.pageNo);
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
