<template>
  <el-card>
    <Control ref="ControlView" @query="getquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" />
    <Pagination :total="total" @PageChange="getMemWitdata" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import { MemberwithdrawalPage } from '@/api/finance/memberwithdrawal'
export default {
  components: {
    Table,
    Pagination,
    Control
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      aduitStatus: null,
      memberId: '',
      cashChannelId: ''
    }
  },

  computed: {
    A_T_Recharge() {
      return this.$store.state.autorefresh.A_T_Recharge
    }
  },
  watch: {
    A_T_Recharge: {
      handler() {
        const _that = this
        const time = setInterval(() => {
          if (this.$store.state.autorefresh.A_T_Recharge) {
            MemberwithdrawalPage({ pageNo: _that.pageNo, pageSize: 10, aduitStatus: _that.aduitStatus, memberId: _that.memberId, cashChannelId: _that.cashChannelId })
              .then((res) => {
                _that.total = res.resultSet.total
                _that.tableData = res.resultSet.data
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            clearInterval(time)
          }
        }, 3000)
      },
      immediate: true
    }
  },
  created() {
    this.getMemWitdata(1)
  },
  methods: {
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      MemberwithdrawalPage({ pageNo: this.pageNo, pageSize: 10, aduitStatus: this.aduitStatus, memberId: this.memberId, cashChannelId: this.cashChannelId })
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
    getMemWitdata(index) {
      // 记录当前页码
      this.pageNo = index
      MemberwithdrawalPage({ pageNo: index, pageSize: 10, aduitStatus: this.aduitStatus, memberId: this.memberId, cashChannelId: this.cashChannelId })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getquery(e) {
      this.aduitStatus = e.aduitStatus
      this.memberId = e.memberId
      this.cashChannelId = e.cashChannelId
      this.getMemWitdata(1)
    },
    // 恢复默认查询
    getresetting() {
      this.aduitStatus = null
      this.memberId = ''
      this.cashChannelId = ''
      this.getMemWitdata(1)
    }
  }
}
</script>

<style>
</style>
