<template>
  <el-card>
    <!-- 顶部操作 -->
    <Control @userAdd="getUserAddShow"></Control>
    <!-- 表格 -->
    <Table
      @usereitor="getUserEitorShow"
      @updateStatus="getUserupdateStatus"
      :tableData="tableData"
      @userdel="getUserDel"
    ></Table>
    <Pagination @PageChange="getuserdata" :total="total"></Pagination>
    <UserAdd ref="UserAdd" @confirm="getUserAdd"></UserAdd>
    <UserEitor ref="UserEitor" @confirm="getUserEitor"></UserEitor>
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
    };
  },
  created() {
    this.getuserdata();
  },
  methods: {
    // 请求分页数据
    getuserdata(index) {
      this.pageNo = index;
      userPage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
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

<style lang="scss">
</style>