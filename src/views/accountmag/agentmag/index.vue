<template>
  <el-card>
    <Control ref="ControlView" @Refresh="HandelRefresh" @AgentAdd="getAgentAddShow" @Agequery="getAgequery"
      @resetting="getresetting" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @Edit="getAgentEditShow" @transfer="getTransferShow"
      @updateStatus="getAgentUdateStatus" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getAgentdata" />
    <AgentAdd ref="AgentAdd" @confirm="getAgentAdd" />
    <AgentEdit ref="AgentEdit" @confirm="getAgentEdit" />
    <AgentTransfer ref="AgentTransfer" @confirm="getTransferConfirm" />
  </el-card>
</template>
<script>
// 表格组件
import Table from './Table.vue'
import Control from './Control.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import AgentAdd from './AgentAdd.vue'
import AgentEdit from './AgentEdit.vue'
import AgentTransfer from './AgentTransfer.vue'
import {
  AgentPage,
  AgentUpdateStatus,
  AddAgent,
  EditAgent,
  TransferAgent
} from '@/api/account/agent'
export default {
  components: { Table, Pagination, Control, AgentAdd, AgentTransfer, AgentEdit },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      userName: '',
      status: null,
      PagesSize: 20
    }
  },
  created() {
    this.getAgentdata(1)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getAgentdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      AgentPage({ pageNo: this.pageNo, pageSize: this.PagesSize, userName: this.userName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message({ message: '刷新成功!', type: 'success' })
        })
        .catch((err) => {
          console.log(err)
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false)
            this.$refs.ControlView.HandelBtnStatus()
          })
          this.$message.error('刷新失败!')
        })
    },
    // 获取分页数据
    getAgentdata(index) {
      // 记录当前页码
      this.pageNo = index
      AgentPage({ pageNo: index, pageSize: this.PagesSize, userName: this.userName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAgentAddShow() {
      this.$refs.AgentAdd.getAddstatus()
    },
    getAgentAdd(e) {
      AddAgent(e).then(res => {
        this.getAgentdata(this.pageNo)
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('添加失败!')
      })
    },
    getAgequery(e) {
      this.userName = e.userName
      this.status = e.status
      this.getAgentdata(1)
    },
    getresetting() {
      this.userName = ''
      this.status = null
      this.getAgentdata(1)
    },
    // 改变状态
    getAgentUdateStatus(data) {
      console.log(data)
      AgentUpdateStatus({
        id: data.id,
        operate: data.type,
        status: data.status
      })
        .then((res) => {
          this.getAgentdata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('修改失败!')

          console.log(err)
        })
    },
    // 转移弹窗
    getTransferShow(data) {
      this.$refs.AgentTransfer.getStatus(data)
    },
    //转移
    getTransferConfirm(data) {
      TransferAgent({
        agentS: data.agentS,
        oldAgentId: data.oldAgentId,
        targetAgentId: data.targetAgentId
      })
        .then((res) => {
          this.getAgentdata(this.pageNo)
          this.$message({
            message: '转移成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 显示编辑弹窗
    getAgentEditShow(e) {
      this.$refs.AgentEdit.getEditstatus(e)
    },
    // 编辑
    getAgentEdit(e) {
      EditAgent({ id: e.id, firstLevelDailyRate: e.firstLevelDailyRate, secondLevelDailyRate: e.secondLevelDailyRate, email: e.email }).then(res => {
        this.getAgentdata(this.pageNo)
        this.$message({
          message: '编辑成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('编辑失败!')
      })
    },
  }
}
</script>

<style lang="scss"></style>
