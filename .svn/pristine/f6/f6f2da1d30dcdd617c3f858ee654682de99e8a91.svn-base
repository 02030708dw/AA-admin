<template>
  <el-card>
    <Control @roleAdd="getAdddialog"></Control>
    <!-- 表格 -->
    <Table
      :tableData="tableData"
      @updateStatus="getupdateStatus"
      @roledel="getroledel"
      @roleEditor="getEditordialog"
    ></Table>
    <!-- 分页组件 -->
    <Pagination @PageChange="getroledata" :total="total"></Pagination>
    <!-- 添加组件 -->
    <RoleAdd ref="roleadd" @confirm="getadd"></RoleAdd>
    <!-- 编辑组件 -->
    <RoleEditor ref="roleeditor" @confirm="getroleEditor"></RoleEditor>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
// 分页组件
import Pagination from "@/components/Pagination/Pagination.vue";
// 新增组件
import RoleAdd from "./RoleAdd.vue";
// 编辑组件
import RoleEditor from "./RoleEditor.vue";
// 请求
import {
  getrolePage,
  getroleupdateStatus,
  getroleAdd,
  getroleDel,
  getroleEdit,
} from "@/api/systemmag/role";
export default {
  components: {
    Table,
    Control,
    Pagination,
    RoleAdd,
    RoleEditor,
  },
  data() {
    return {
      //角色数据
      tableData: [],
      // 编辑信息
      EditorData: {},
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
    };
  },
  methods: {
    // 请求角色分页数据
    getroledata(index) {
      // 记录当前页码
      this.pageNo = index;
      getrolePage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 更新角色状态
    getupdateStatus(e) {
      getroleupdateStatus({ id: e.Id, status: e.status })
        .then((res) => {
          this.$message({
            message: "修改成功!",
            type: "success",
          });
          // 刷新数据
          this.getroledata(this.pageNo);
        })
        .catch((err) => {
          this.$message.error("修改失败!");
          console.log(err);
        });
    },
    // 新增角色
    getadd(e) {
      getroleAdd(e)
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo);
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("添加失败!");
        });
    },
    // 删除角色
    getroledel(Id) {
      getroleDel(Id)
        .then((res) => {
          // 刷新数据
          this.getroledata(this.pageNo);
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
    // 编辑角色
    getroleEditor({ code, id, remark, roleName, status }) {
      getroleEdit({ code, id, remark, roleName, status })
        .then((res) => {
          this.$message({
            message: "编辑成功!",
            type: "success",
          });
          // 刷新数据
          this.getroledata(this.pageNo);
        })
        .catch((err) => {
          this.$message.error("编辑失败!");
          console.log(err);
        });
    },
    // 弹窗
    getAdddialog() {
      this.$refs.roleadd.getAddstatus();
    },
    getEditordialog(e) {
      this.$refs.roleeditor.getEditorstatus(e);
    },
  },
  created() {
    // 初始化角色数据
    this.getroledata(1);
  },
};
</script>

<style lang="scss">
</style>