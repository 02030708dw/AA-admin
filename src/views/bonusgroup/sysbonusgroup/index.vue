<template>
  <el-card>
    <Control
      ref="ControlView"
      @resetting="getresetting"
      @query="getquery"
      @Refresh="HandelRefresh"
      @Add="getBonusAddShow"
    />
    <Table ref="TableView" :table-data="tableData" @delete="getDel" />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getdata"
    />
    <ComponentsAdd ref="bonusAdd" @confirm="getBonusAdd" />
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import ComponentsAdd from "./ComponentsAdd";
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  bonusGroupAdd,
  bonusGroupBind,
  bonusGroupDel,
  bonusGroupInfo,
  bonusGroupPage,
} from "@/api/bonusgroup/sysbonusgroup";
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsAdd,
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
      bonusGroupPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        groupName: this.groupName,
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
      bonusGroupPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        groupName: this.groupName,
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
      this.planName = e.planName;
      this.userName = e.userName;
      this.getdata(1);
    },
    // 重置查询
    getresetting() {
      this.planName = null;
      this.userName = null;
      this.getdata(1);
    },
    // 删除币种
    getDel(id) {
      bonusGroupDel(id)
        .then((res) => {
          this.getdata(this.pageNo);
          this.$message({
            message: "删除成功!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("删除失败!");
        });
    },
    // 显示添加弹窗
    getBonusAddShow() {
      this.$refs.bonusAdd.getAddstatus();
    },
    // 添加币种
    getBonusAdd(e) {
      bonusGroupAdd(e)
        .then((res) => {
          // 刷新数据
          this.getdata(this.pageNo);
          // this.$store.dispatch("user/gamerSet");
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("添加失败!");
        });
    },
  },
  created() {
    this.getdata(1);
  },
};
</script>

<style lang="scss"></style>
