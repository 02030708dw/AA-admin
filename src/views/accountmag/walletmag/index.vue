<template>
  <el-card>
    <Table ref="TableView" :table-data="tableData" @getCreate="getCreateData" />
    <Pagination :total="total" @PageChange="getWalletData" />
  </el-card>
</template>

<script>
import { walletPage, createGameUser } from "@/api/account/wallet";

import Table from "./Table";
import Pagination from "@/components/Pagination/Pagination";

export default {
  components: {
    Table,
    Pagination
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      PagesSize: 20,
      userName: "",
      tableData: [],
    };
  },
  created() {
    this.getWalletData();
  },
  methods: {
    getWalletData(index = 1) {
      this.pageNo = index;
      walletPage({
        pageNo: index,
        pageSize: this.PagesSize,
        userName: this.userName,
      }).then((res) => {
        this.tableData = res.resultSet.data;
        this.total = res.resultSet.total;
      });
    },
    getCreateData(data) {
      this.$refs.TableView.HandelLoading(true);
      createGameUser(data)
        .then((res) => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false);
          }, 1000);
          this.$message({ message: "创建成功!", type: "success" });
          this.getWalletData();
        })
        .catch((err) => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false);
          });
          this.$message.error("创建失败!");
        });
    },
  },
};
</script>

<style></style>
