<template>
  <el-card>
    <Control ref="ControlView" :agentIddata='agentIddata' @Memquery="getMemquery" @resetting="getresetting"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :gamer-balance-list="gamerBalanceList" :table-data="tableData" @updateStatus="getMemberUdateStatus"
      @Membershiptransfer="getMembershiptransfer" @Proxytransfer="getProxytransfer" @Info="HandelShowInfo"
      @MemberresettingPwd="getMemberresettingPwd" @Updatebalance="HandelUpdatebalance" @MemberEditPayment="HandelEditPayment" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getMemberPage" />
    <Membershiptransfer ref="Membershiptransfer" @confirm="getMembershiptransferok" />
    <Proxytransfer :agentIddata="agentIddata" ref="Proxytransfer" @confirm="getProxytransferok" />
    <!-- 会员详情 -->
    <MamberInfo ref="MamberInfoView" @Refresh="HandelRefresh" />
    <MemberUpdatebalanceview ref="MemberUpdatebalanceview" />
    <MemberEditPayment ref="MemberEditPayment" />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
import Control from './Control.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import Membershiptransfer from './Membershiptransfer.vue'
import Proxytransfer from './Proxytransfer.vue'
// 会员详情
import MamberInfo from './MemberInfo.vue'
import MemberUpdatebalanceview from './MemberUpdatebalance.vue'
import MemberEditPayment from './EditPayment.vue'
import {
  MemberPage,
  MemberTransfer,
  agentTransfer,
  MemberUpdateStatus,
  MemberresettingPwd,
  getGamerBalance
} from '@/api/account/member'
import { AgentPage } from '@/api/account/agent'
export default {
  components: {
    Table,
    Pagination,
    Membershiptransfer,
    Proxytransfer,
    Control,
    MamberInfo,
    MemberUpdatebalanceview,
    MemberEditPayment
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      agentIddata: [],
      gamerBalanceList:[],
      agentId: null,
      userName: null,
      status: null,
      PagesSize: 20
    }
  },
  created() {
    this.getMemberPage(1)
    this.getAgentPage()
  },
  methods: {
    HandelEditPayment(e) {
      this.$refs.MemberEditPayment.HandelChangeShow(e)
    },
    HandelUpdatebalance(e) {
      this.$refs.MemberUpdatebalanceview.HandelChangeShow(e)
    },
    getMemberresettingPwd(e) {
      MemberresettingPwd({ memberId: e }).then(res => {
        this.$message({ message: '重置成功!', type: 'success' })
      }).catch(() => {
        this.$message.error('重置失败!')
      })
    },
    // 查看会员详情
    HandelShowInfo(e) {
      this.$refs.MamberInfoView.HandelUpda(e)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      MemberPage({ pageNo: this.pageNo, pageSize: this.PagesSize, agentId: this.agentId, username: this.userName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          const userIds = this.tableData.map((item) => item.id)
          getGamerBalance({ userIds }).then(res => {
           this.gamerBalanceList = res.resultSet
          })
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
    getMembershiptransfer(data) {
      this.$refs.Membershiptransfer.getAddstatus(data)
    },
    getProxytransfer(data) {
      this.$refs.Proxytransfer.getAddstatus(data)
    },
    getProxytransferok(data) {
      agentTransfer(data)
        .then((res) => {
          this.getMemberPage(this.pageNo)
          this.$message({
            message: '代理转移成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('代理转移失败!')
          console.log(err)
        })
    },
    getMembershiptransferok(data) {
      MemberTransfer(data)
        .then((res) => {
          this.getMemberPage(this.pageNo)
          this.$message({
            message: '会员转移成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('会员转移失败!')
          console.log(err)
        })
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getMemberPage(this.pageNo)
    },
    getMemberPage(index) {
      // 记录当前页码
      this.pageNo = index
      MemberPage({ pageNo: index, pageSize: this.PagesSize, agentId: this.agentId, userName: this.userName, status: this.status, userPhone: this.userPhone })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          const userIds = this.tableData.map((item) => item.id)
          getGamerBalance({ userIds }).then(res => {
           this.gamerBalanceList = res.resultSet
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMemquery(e) {

      this.agentId = e.agentId
      this.userName = e.userName
      this.status = e.status
      this.userPhone = e.userPhone
      this.getMemberPage(1)
    },
    getresetting() {
      this.agentId = ''
      this.userName = ''
      this.status = null
      this.getMemberPage(1)
    },
    getMemberUdateStatus(data) {
      MemberUpdateStatus({ memberId: data.id, status: data.status })
        .then((res) => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.getMemberPage(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    },
    // 获取代理id
    getAgentPage() {
      this.agentIddata = []
      AgentPage({ pageNo: 1, pageSize: 100000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.agentIddata.push({
            title: res.resultSet.data[i].userName,
            index: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style lang="scss"></style>
