<template>
  <el-card>
    <Table :tableData="tableData"></Table>
    <Pagination :total="total" @PageChange="getMemWitdata"></Pagination>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
// 分页
import Pagination from "@/components/Pagination/Pagination.vue";
import { MemberwithdrawalPage } from "@/api/finance/memberwithdrawal";
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
    this.getMemWitdata(1);
  },
  methods: {
    getMemWitdata(index) {
      // 记录当前页码
      this.pageNo = index;
      MemberwithdrawalPage({ pageNo: index, pageSize: 10 })
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