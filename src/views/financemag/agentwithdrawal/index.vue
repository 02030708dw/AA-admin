<template>
  <el-card>
    <Control @query="getquery" @resetting="getresetting" />
    <Table :table-data="tableData" />
    <Pagination :total="total" />
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
  created() {
    this.getAgentWtihdrawaldata(1)
  },
  methods: {
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
