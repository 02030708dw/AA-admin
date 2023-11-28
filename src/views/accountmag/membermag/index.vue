<template>
  <el-card>
    <!-- 表格 -->
    <Table
      :tableData="tableData"
      @updateStatus="getMemberUdateStatus"
      @Membershiptransfer="getMembershiptransfer"
      @Proxytransfer="getProxytransfer"
    ></Table>
    <Pagination :total="total"></Pagination>
    <Membershiptransfer
      ref="Membershiptransfer"
      @confirm="getMembershiptransferok"
    ></Membershiptransfer>
    <Proxytransfer
      ref="Proxytransfer"
      @confirm="getProxytransferok"
    ></Proxytransfer>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";

// 分页
import Pagination from "@/components/Pagination/Pagination.vue";
import Membershiptransfer from "./Membershiptransfer.vue";
import Proxytransfer from "./Proxytransfer.vue";
import {
  MemberPage,
  MemberTransfer,
  agentTransfer,
  MemberUpdateStatus,
} from "@/api/account/member";
export default {
  components: {
    Table,
    Pagination,
    Membershiptransfer,
    Proxytransfer,
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
    this.getMemberPage();
  },
  methods: {
    getMembershiptransfer(data) {
      this.$refs.Membershiptransfer.getAddstatus(data);
    },
    getProxytransfer(data) {
      this.$refs.Proxytransfer.getAddstatus(data);
    },
    getProxytransferok(data) {
      agentTransfer(data)
        .then((res) => {
          this.getMemberPage(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMembershiptransferok(data) {
      MemberTransfer(data)
        .then((res) => {
          this.getMemberPage(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMemberPage(index) {
      // 记录当前页码
      this.pageNo = index;
      MemberPage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMemberUdateStatus(data) {
      MemberUpdateStatus({ memberId: data.id, status: data.status })
        .then((res) => {
          this.getMemberPage(this.pageNo);
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