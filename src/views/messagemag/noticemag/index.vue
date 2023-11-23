<template>
  <el-card>
    <Control></Control>
    <!-- 表格 -->
    <Table :tableData="tableData"></Table>
    <Pagination :total="total" @PageChange="getnoticedata"></Pagination>
    <noticeAdd></noticeAdd>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import noticeAdd from "./noticeAdd.vue";
import { noticePage } from "@/api/message/notice";
export default {
  components: {
    Table,
    Control,
    Pagination,
    noticeAdd,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
    };
  },
  methods: {
    // 请求分页数据
    getnoticedata(index) {
      this.pageNo = index;
      noticePage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          console.log(res);
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getnoticedata();
  },
};
</script>

<style lang="scss">
</style>