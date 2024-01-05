<template>
  <!-- 会员充值管理 -->
  <el-card>
    <Control ref="ControlView" @Gamequery="getgetquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" @option="getoption" />
    <Pagination :total="total" @PageChange="memberrechargedata" />
    <Dialog ref="DialogView" @toexamine="gettoexamine" />
  </el-card>
</template>

<script >
import { MemberrechargelPage, MemberrechargelToexamine } from '../../../api/finance/memberrecharge'
import Table from './Table.vue'
import Control from './Control.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Dialog from './Dialog.vue'
import { mapState } from 'vuex'
import { time } from 'echarts'
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
      memberId: ''
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
            MemberrechargelPage({ pageNo: _that.pageNo, pageSize: 10, amount: _that.amount, auditStatus: _that.auditStatus, cardNo: _that.cardNo, channelId: _that.channelId, date: _that.date, memberId: _that.memberId }).then(res => {
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
    // 自动刷新开启关闭
    // getUpdataRefresh() {
    //   const _that = this
    //   console.log(this.$store.state.autorefresh.M_Recharge, this.M_Recharge)
    //   const time = setInterval(() => {
    //     if (this.$store.state.autorefresh.M_Recharge) {
    //       MemberrechargelPage({ pageNo: _that.pageNo, pageSize: 10, amount: _that.amount, auditStatus: _that.auditStatus, cardNo: _that.cardNo, channelId: _that.channelId, date: _that.date, memberId: _that.memberId }).then(res => {
    //         console.log(res.resultSet.data)
    //         _that.total = res.resultSet.total
    //         _that.tableData = res.resultSet.data
    //       }).catch(err => {
    //         console.log(err)
    //       })
    //     } else {
    //       clearInterval(time)
    //     }
    //   }, 60000)
    // },
    // 刷新
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      MemberrechargelPage({ pageNo: this.pageNo, pageSize: 10, amount: this.amount, auditStatus: this.auditStatus, cardNo: this.cardNo, channelId: this.channelId, date: this.date, memberId: this.memberId }).then(res => {
        this.total = res.resultSet.total
        this.tableData = res.resultSet.data
        setTimeout(() => {
          this.$refs.ControlView.HandelBtnStatus()
          this.$refs.TableView.HandelLoading(false)
        }, 60000)
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
      MemberrechargelPage({ pageNo: index, pageSize: 10, amount: this.amount, auditStatus: this.auditStatus, cardNo: this.cardNo, channelId: this.channelId, date: this.date, memberId: this.memberId }).then(res => {
        console.log(res.resultSet.data)
        this.total = res.resultSet.total
        this.tableData = res.resultSet.data
      }).catch(err => {
        console.log(err)
      })
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
