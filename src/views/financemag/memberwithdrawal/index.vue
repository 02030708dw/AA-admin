<template>
  <el-card>
    <Control @query="getquery" @resetting="getresetting"/>
    <Table :table-data="tableData" />
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
  created() {
    this.getMemWitdata(1)
  },
  methods: {
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
