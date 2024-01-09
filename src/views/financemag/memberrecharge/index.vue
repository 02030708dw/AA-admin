<template>
  <!-- 会员充值管理 -->
  <el-card>
    <!-- @Refresh="HandelRefresh" -->
    <Control ref="ControlView" @Refresh="HandelRefresh" @Gamequery="getgetquery" @resetting="getresetting" />
    <Table ref="TableView" :table-data="tableData" @option="getoption" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="memberrechargedata" />
    <Dialog ref="DialogView" @toexamine="gettoexamine" />
  </el-card>
</template>

<script >
import { MemberrechargelPage, MemberrechargelToexamine } from '../../../api/finance/memberrecharge'
import Table from './Table.vue'
import Control from './Control.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Dialog from './Dialog.vue'
export default {
  components: {
    Table,
    Control,
    Pagination,
    Dialog
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      amount: '',
      auditStatus: '',
      cardNo: '',
      channelId: '',
      date: '',
      memberId: '',
      PagesSize: 10
    }
  },
  computed: {
    M_Recharge() {
      return this.$store.state.autorefresh.M_Recharge
    }
  },
  watch: {
    M_Recharge: {
      handler(newvalue, oldvalue) {
        const _that = this
        const time = setInterval(() => {
          if (this.$store.state.autorefresh.M_Recharge) {
          // 刷新
            MemberrechargelPage({ pageNo: _that.pageNo, pageSize: this.PagesSize, amount: _that.amount, auditStatus: _that.auditStatus, cardNo: _that.cardNo, channelId: _that.channelId, date: _that.date, memberId: _that.memberId }).then(res => {
              console.log(res.resultSet.data)
              _that.total = res.resultSet.total
              _that.tableData = res.resultSet.data
            }).catch(err => {
              console.log(err)
            })
          } else {
          // 清除
            clearInterval(time)
          }
        }, 3000)
      },
      immediate: true
    }
  },
  created() {
    this.memberrechargedata(1)
  },
  methods: {
    // 刷新
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      MemberrechargelPage({ pageNo: this.pageNo, pageSize: this.PagesSize, amount: this.amount, auditStatus: this.auditStatus, cardNo: this.cardNo, channelId: this.channelId, date: this.date, memberId: this.memberId }).then(res => {
        this.total = res.resultSet.total
        this.tableData = res.resultSet.data
        setTimeout(() => {
          this.$refs.ControlView.HandelBtnStatus()
          this.$refs.TableView.HandelLoading(false)
        }, 1000)
        this.$message({ message: '刷新成功!', type: 'success' })
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.$refs.TableView.HandelLoading(false)
          this.$refs.ControlView.HandelBtnStatus()
        })
        this.$message.error('刷新失败!')
      })
    },
    // 请求分页数据
    memberrechargedata(index) {
      this.pageNo = index
      MemberrechargelPage({ pageNo: index, pageSize: this.PagesSize, amount: this.amount, auditStatus: this.auditStatus, cardNo: this.cardNo, channelId: this.channelId, date: this.date, memberId: this.memberId }).then(res => {
        this.total = res.resultSet.total
        this.tableData = res.resultSet.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 改变每页条数
    HandelPagesChange(e) {
      this.PagesSize = e
      this.memberrechargedata(this.pageNo)
    },
    // 条件查询
    getgetquery(e) {
      this.amount = e.amount
      this.auditStatus = e.auditStatus
      this.cardNo = e.cardNo
      this.channelId = e.channelId
      this.date = e.date
      this.memberId = e.memberId
      this.memberrechargedata(1)
    },
    // 重置
    getresetting() {
      this.amount = ''
      this.auditStatus = ''
      this.cardNo = ''
      this.channelId = ''
      this.date = ''
      this.memberId = ''
      this.memberrechargedata(1)
    },
    // 操作
    getoption(e) {
      this.$refs.DialogView.HandelDialogStatus(e)
    },
    gettoexamine(e) {
      // 审核
      MemberrechargelToexamine({ auditStatus: e.type, recordId: e.id, reason: e.reason }).then(res => {
        // 刷新数据
        this.memberrechargedata(this.pageNo)
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('操作失败!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
