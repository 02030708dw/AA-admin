<template>
  <el-card>
    <Control @gamerAdd="getGamerAddshow"></Control>
    <Table :tableData="tableData"></Table>
    <Pagination @PageChange="getroledata" :total="total"></Pagination>
    <GamerAdd ref="GamerAdd" @confirm="getGamerAdd"></GamerAdd>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import GamerAdd from "./GamerAdd.vue";
import { gamerPage, gamerAdd } from "@/api/gamer/gamer";
export default {
  components: {
    Table,
    Control,
    Pagination,
    GamerAdd,
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
    this.getroledata(1);
  },
  methods: {
    // 请求分页数据
    getroledata(index) {
      // 记录当前页码
      this.pageNo = index;
      gamerPage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGamerAddshow() {
      this.$refs.GamerAdd.getAddstatus();
    },
    // 添加
    getGamerAdd(e) {
      gamerAdd(e)
        .then((res) => {
          console.log(res);
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