<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" @EditorShow="getInfoShow" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <Info ref="InfoView" @Refresh="HandelRefresh" />
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import Info from "./Info";
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  agentBonusGroupPage,
} from "@/api/bonusgroup/agentbonusgroup";
export default {
  components: {
    Table,
    Control,
    Pagination,
    Info,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
    };
  },
  methods: {
    // 显示详情弹窗
    getInfoShow(e) {
      this.$refs.InfoView.getAddstatus(e)
    },
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.getdata(this.pageNo);
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      // 请求数据
      agentBonusGroupPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        planName: this.planName,
        userName: this.userName,
      })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus();
            this.$refs.TableView.HandelLoading(false);
          }, 1000);
          this.$message({ message: "刷新成功!", type: "success" });
        })
        .catch(() => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false);
            this.$refs.ControlView.HandelBtnStatus();
          });
          this.$message.error("刷新失败!");
        });
    },
    // 请求分页数据
    getdata(index = 1) {
      this.pageNo = index;
      agentBonusGroupPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        planName: this.planName,
        userName: this.userName,
      })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getquery(e) {
      this.planName = e.planName;
      this.userName = e.userName;
      this.getdata(1);
    },
    getresetting() {
      this.planName = null;
      this.userName = null;
      this.getdata(1);
    },
  },
  created() {
    this.getdata(1);
  },
};
</script>

<style lang="scss"></style>
