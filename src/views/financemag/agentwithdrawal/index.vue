<template>
  <el-card>
    <Control ref="ControlView" @query="getquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" />
    <Pagination :total="total" @PageChange="getAgentWtihdrawaldata"/>
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import { AgentWtihdrawalPage } from '@/api/finance/agentwithdrawal'
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
      aduitStatus: null, // 审核状态
      agentId: '', // 代理
      cashChannelId: ''
    }
  },
  computed: {
    A_Recharge() {
      return this.$store.state.autorefresh.A_Recharge
    }
  },
  watch: {
    // 监听是否开启自动刷新
    A_Recharge: {
      handler() {
        const _that = this
        const time = setInterval(() => {
          if (this.$store.state.autorefresh.A_Recharge) {
          // 开启
            AgentWtihdrawalPage({ pageNo: _that.pageNo, pageSize: 10, aduitStatus: _that.aduitStatus, agentId: _that.agentId, cashChannelId: _that.cashChannelId })
              .then((res) => {
                _that.total = res.resultSet.total
                _that.tableData = res.resultSet.data
              })
              .catch((err) => {
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
    this.getAgentWtihdrawaldata(1)
  },
  methods: {
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      AgentWtihdrawalPage({ pageNo: this.pageNo, pageSize: 10, aduitStatus: this.aduitStatus, agentId: this.agentId, cashChannelId: this.cashChannelId })
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
    // 请求列表
    getAgentWtihdrawaldata(index) {
      // 记录当前页码
      this.pageNo = index

      AgentWtihdrawalPage({ pageNo: index, pageSize: 10, aduitStatus: this.aduitStatus, agentId: this.agentId, cashChannelId: this.cashChannelId })
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
      this.agentId = e.agentId
      this.cashChannelId = e.cashChannelId
      this.getAgentWtihdrawaldata(1)
    },
    // 恢复默认查询
    getresetting() {
      this.aduitStatus = null
      this.agentId = ''
      this.cashChannelId = ''
      this.getAgentWtihdrawaldata(1)
    }
  }
}
</script>

<style>
</style>
