<template>
  <el-card>
    <Table :tableData="tableData"></Table>
    <Pagination :total="total"></Pagination>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
// 分页
import Pagination from "@/components/Pagination/Pagination.vue";
import { AgentWtihdrawalPage } from "@/api/finance/agentwithdrawal";
export default {
  components: {
    Table,
    Pagination,
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
    };
  },
  created() {
    this.getAgentWtihdrawaldata(1);
  },
  methods: {
    getAgentWtihdrawaldata(index) {
      // 记录当前页码
      this.pageNo = index;
      AgentWtihdrawalPage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>