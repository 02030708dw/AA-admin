<template>
  <el-card>
    <!-- 顶部操作 -->
    <Control ref="ControlView" @Refresh="HandelRefresh" @userAdd="getUserAddShow" @userquery="getuserquery"
      @resetting="getresetting" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @usereitor="getUserEitorShow" @updateStatus="getUserupdateStatus"
      @userdel="getUserDel" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getuserdata" />
    <UserAdd ref="UserAdd" @confirm="getUserAdd" />
    <UserEitor ref="UserEitor" @confirm="getUserEitor" />
  </el-card>
</template>

<script>
import {
  userPage,
  userDel,
  userAdd,
  userEitor,
  userUpdateStatus,
} from "@/api/account/user";
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import UserAdd from "./UserAdd.vue";
import UserEitor from "./UserEitor.vue";
export default {
  components: {
    Table,
    Control,
    Pagination,
    UserAdd,
    UserEitor,
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      userName: "",
      status: "",
      PagesSize: 20,
    };
  },
  created() {
    this.getuserdata();
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.getuserdata(this.pageNo);
    },
    // 刷新
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      userPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        userName: this.userName,
        status: this.status,
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
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false);
            this.$refs.ControlView.HandelBtnStatus();
          });
          this.$message.error("刷新失败!");
        });
    },
    // 请求分页数据
    getuserdata(index = 1) {
      this.pageNo = index;
      userPage({
        pageNo: index,
        pageSize: this.PagesSize,
        userName: this.userName,
        status: this.status,
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
    getuserquery(e) {
      this.userName = e.userName;
      this.status = e.status;
      this.getuserdata(1);
    },
    // 恢复默认查询
    getresetting() {
      this.userName = "";
      this.status = null;
      this.getuserdata(1);
    },
    // 显示用户添加弹窗
    getUserAddShow() {
      this.$refs.UserAdd.getAddstatus();
    },
    // 添加用户
    getUserAdd(e) {
      userAdd(e)
        .then((res) => {
          this.getuserdata(this.pageNo);
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("添加失败!");
          console.log(err);
        });
    },
    // 删除用户
    getUserDel(id) {
      userDel(id)
        .then((res) => {
          this.getuserdata(this.pageNo);
          this.$message({
            message: "删除成功!",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("删除失败!");
          console.log(err);
        });
    },
    // 改变用户状态
    getUserupdateStatus(e) {
      userUpdateStatus({ status: e.status, userId: e.id })
        .then((res) => {
          this.$message({
            message: "修改成功!",
            type: "success",
          });
          this.getuserdata(this.pageNo);
        })
        .catch((err) => {
          this.$message.error("修改失败!");
          console.log(err);
        });
    },
    // 显示编辑弹窗
    getUserEitorShow(data) {
      this.$refs.UserEitor.getAddstatus(data);
    },
    // 编辑用户
    getUserEitor(data) {
      userEitor({
        id: data.id,
        status: data.status,
        telPhone: data.telPhone,
        userName: data.userName,
        roleIdS: data.roleIdS,
      })
        .then((res) => {
          this.$message({
            message: "编辑成功!",
            type: "success",
          });
          this.getuserdata(this.pageNo);
        })
        .catch((err) => {
          this.$message.error("编辑失败!");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss"></style>
