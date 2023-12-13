<template>
  <el-card>
    <Control @Agequery="getAgequery" @resetting="getresetting" />
    <!-- 表格 -->
    <Table :table-data="tableData" @transfer="getAgenttransfer" @updateStatus="getAgentUdateStatus" />
    <Pagination :total="total" @PageChange="getAgentdata" />
  </el-card>
</template>

<script>
// 表格组件
import Table from './Table.vue'
import Control from './Control.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import {
  AgentPage,
  AgentTransfer,
  AgentUpdateStatus

} from '@/api/account/agent'
export default {
  components: { Table, Pagination, Control },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      userName: '',
      status: null
    }
  },
  created() {
    this.getAgentdata(1)
  },
  methods: {
    // 获取分页数据
    getAgentdata(index) {
      // 记录当前页码
      this.pageNo = index
      AgentPage({ pageNo: index, pageSize: 10, userName: this.userName, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
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
    // 转移
    getAgenttransfer(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss"></style>
