<template>
  <el-card>
    <Control @gameAdd="getGameAddShow"></Control>
    <Table
      :tableData="tableData"
      @gamedel="getGameDel"
      @gameeitor="getGameEitorShow"
      @updateStatus="getGameupdateStatus"
    ></Table>
    <Pagination @PageChange="getgamedata" :total="total"></Pagination>
    <GameAdd ref="GameAdd" @confirm="getGameAdd"></GameAdd>
    <GameEitor ref="GameEitor" @confirm="getGameEitor"></GameEitor>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Control from "./Control";
import GameAdd from "./GameAdd.vue";
import GameEitor from "./GameEitor.vue";
import {
  gamePage,
  gameAdd,
  gameDel,
  gameupdateStatus,
  gameEdit,
} from "@/api/game/game";
export default {
  components: {
    Table,
    Control,
    Pagination,
    GameAdd,
    GameEitor,
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
    this.getgamedata(1);
  },
  methods: {
    // 请求分页数据
    getgamedata(index) {
      // 记录当前页码
      this.pageNo = index;
      gamePage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示添加游戏
    getGameAddShow() {
      this.$refs.GameAdd.getAddstatus();
    },
    // 添加游戏
    getGameAdd(e) {
      console.log(e);
      gameAdd(e)
        .then((res) => {
          this.getgamedata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    getGameDel(e) {
      gameDel(e)
        .then((res) => {
          this.getgamedata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示编辑
    getGameEitorShow(e) {
      this.$refs.GameEitor.getEitorstatus(e);
    },
    // 编辑
    getGameEitor(data) {
      gameEdit({
        gameId: data.id,
        gamerId: data.gamerId,
        name: data.name,
        status: data.status,
        threeId: data.threeId,
        type: data.type,
      })
        .then((res) => {
          this.getgamedata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变状态
    getGameupdateStatus(e) {
      gameupdateStatus({ status: e.status, gameId: e.id })
        .then((res) => {
          this.getgamedata(this.pageNo);
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