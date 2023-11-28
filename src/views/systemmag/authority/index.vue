<template>
  <el-card>
    <Control @AuthorityAdd="getAuthorityAddShow"></Control>
    <Table
      :tableData="tableData"
      @delete="getAuthorityDel"
      @updateStatus="getAuthorityUdateStatus"
      @eitor="getAuthorityEitorShow"
    ></Table>
    <Pagination :total="total" @PageChange="getAuthoritydata"></Pagination>
    <AuthorityAdd ref="AuthorityAdd" @confirm="getAuthorityAdd"></AuthorityAdd>
    <AuthorityEditor
      ref="AuthorityEditor"
      @confirm="getAuthorityEitor"
    ></AuthorityEditor>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
// 分页组件
import Pagination from "@/components/Pagination/Pagination.vue";
// 添加
import AuthorityAdd from "./AuthorityAdd.vue";
// 编辑
import AuthorityEditor from "./AuthorityEditor.vue";
import {
  getAuthorityPage,
  getAuthorityAdd,
  getAuthorityDel,
  getAuthorityEdit,
  getAuthorityUdateStatus,
} from "@/api/systemmag/authority";
export default {
  components: { Table, Control, Pagination, AuthorityAdd, AuthorityEditor },
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
    this.getAuthoritydata(1);
  },
  methods: {
    // 获取分页数据
    getAuthoritydata(index = 1) {
      // 记录当前页码
      this.pageNo = index;
      getAuthorityPage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示添加
    getAuthorityAddShow() {
      this.$refs.AuthorityAdd.getAddstatus();
    },
    // 添加
    getAuthorityAdd(data) {
      getAuthorityAdd(data)
        .then((res) => {
          this.getAuthoritydata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示编辑
    getAuthorityEitorShow(data) {
      this.$refs.AuthorityEditor.getAddstatus(data);
    },
    // 编辑
    getAuthorityEitor(data) {
      getAuthorityEdit(data)
        .then((res) => {
          this.getAuthoritydata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    getAuthorityDel(id) {
      getAuthorityDel(id)
        .then((res) => {
          this.getAuthoritydata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改状态
    getAuthorityUdateStatus(data) {
      getAuthorityUdateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getAuthoritydata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
</style>
