<template>
  <el-card>
    <Control
      ref="ControlView"
      @resetting="getresetting"
      @query="getquery"
      @Refresh="HandelRefresh"
    />
    <Table ref="TableView" :table-data="tableData" @eitor="getEditShow" />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getdata"
    />
    <ComponentsEdit ref="Edit" @confirm="getGameEdit" />
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import ComponentsEdit from "./ComponentsEdit.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  gameInfoPage,
  agameInfoEdit,
  gameInfoGroup,
} from "@/api/bonusgroup/gwgameinfo";
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsEdit,
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
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.getdata(this.pageNo);
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      // 请求数据
      gameInfoPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        groupName: this.groupName,
        gamePlayName: this.gamePlayName,
        gamePlayTypeName: this.gamePlayTypeName,
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
      gameInfoPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        groupName: this.groupName,
        gamePlayName: this.gamePlayName,
        gamePlayTypeName: this.gamePlayTypeName,
      })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 条件查询
    getquery(e) {
      console.log(e);
      this.groupName = e.groupName;
      this.gamePlayName = e.gamePlayName;
      this.gamePlayTypeName = e.gamePlayTypeName;
      this.getdata(1);
    },
    // 重置查询
    getresetting() {
      this.groupName = null;
      this.gamePlayName = null;
      this.gamePlayTypeName = null;
      this.getdata(1);
    },
    // 显示编辑弹窗
    getEditShow(e) {
      this.$refs.Edit.getEditstatus(e);
    },
    // 编辑币种
    getGameEdit(e) {
      agameInfoEdit({ id: e.id, sign: e.sign, winAmount: e.winAmount })
        .then((res) => {
          this.getdata(this.pageNo);
          this.$message({
            message: "编辑成功!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("编辑失败!");
        });
    },
  },
  created() {
    this.getdata(1);
  },
};
</script>

<style lang="scss"></style>
