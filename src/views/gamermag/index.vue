<template>
  <el-card>
    <Control @gamerAdd="getGamerAddshow"></Control>
    <Table
      :tableData="tableData"
      @eitor="getGamerEitorShow"
      @delete="getGamerDelete"
      @updateStatus="getGamerupdateStatus"
    ></Table>
    <Pagination @PageChange="getroledata" :total="total"></Pagination>
    <GamerAdd ref="GamerAdd" @confirm="getGamerAdd"></GamerAdd>
    <GamerEitor ref="GamerEitor" @confirm="getGamerEitor"></GamerEitor>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import GamerAdd from "./GamerAdd.vue";
import GamerEitor from "./GamerEitor.vue";
import {
  gamerPage,
  gamerAdd,
  gamerDel,
  gamerEdit,
  gamerupdateStatus,
} from "@/api/gamer/gamer";
export default {
  components: {
    Table,
    Control,
    Pagination,
    GamerAdd,
    GamerEitor,
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
          // 刷新数据
          this.getroledata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    getGamerDelete(id) {
      gamerDel({ id })
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑事件
    getGamerEitorShow(e) {
      this.$refs.GamerEitor.getAddstatus(e);
    },
    getGamerEitor(item) {
      gamerEdit({
        gamerId: item.id,
        status: item.status,
        name: item.name,
        incomeUrl: item.incomeUrl,
        cashUrl: item.cashUrl,
        betUrl: item.betUrl,
      })
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 状态修改
    getGamerupdateStatus(data) {
      console.log(data);
      gamerupdateStatus({ gamerId: data.id, status: data.status })
        .then((res) => {
          this.getroledata(this.pageNo);
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