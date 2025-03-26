<template>
  <el-card>
    <!-- @Refresh="HandelRefresh" -->
    <Control
      ref="ControlView"
      @SelectDate="HandelSelectDate"
      @getExcel="getExcel"
      @query="getquery"
      @resetting="getresetting"
      @Refresh="HandelRefresh"
    />
    <Table
      ref="TableView"
      :table-data="tableData"
      :result-set="resultSet"
      @info="Handelinfo"
      @pay="Handelpay"
      @operate="Handeloperate"
    />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getMemWitdata"
    />
    <InfoView ref="infoview" />
    <PayForAnother ref="PayForAnother" @pay="HandelpayConfirmPay" />
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control.vue";
import InfoView from "./InfoView.vue";
import PayForAnother from "./PayForAnother.vue";
import { Message } from "element-ui";
// 分页
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  MemberwithdrawalPage,
  PayFor,
  memberCashRecordOutput,
} from "@/api/finance/memberwithdrawal";
export default {
  components: {
    Table,
    Pagination,
    Control,
    InfoView,
    PayForAnother,
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      aduitStatus: null,
      orderNo: "",
      cashChannelId: "",
      userName: "",
      PagesSize: 20,
      resultSet: {},
      startDate: "",
      endDate: "",
    };
  },

  computed: {
    A_T_Recharge() {
      return this.$store.state.autorefresh.A_T_Recharge;
    },
  },
  watch: {
    A_T_Recharge: {
      handler() {
        const _that = this;
        const time = setInterval(() => {
          if (this.$store.state.autorefresh.A_T_Recharge) {
            MemberwithdrawalPage({
              pageNo: _that.pageNo,
              pageSize: this.PagesSize,
              aduitStatus: _that.aduitStatus,
              orderNo: _that.orderNo,
              cashChannelId: _that.cashChannelId,
            })
              .then((res) => {
                _that.total = +res.resultSet.total;
                _that.tableData = res.resultSet.date;
                _that.resultSet = res.resultSet;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            clearInterval(time);
          }
        }, 3000);
      },
      immediate: true,
    },
  },
  created() {
    this.getMemWitdata(1);
  },
  methods: {
    // 时间选择
    HandelSelectDate(data) {
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      // 请求数据
      this.getMemWitdata(1);
    },
    Handeloperate() {
      this.getMemWitdata(this.pageNo);
    },
    Handelinfo(e) {
      this.$refs.infoview.getAddstatus(e);
    },
    Handelpay(e) {
      this.$refs.PayForAnother.getAddstatus(e);
    },
    HandelpayConfirmPay(e) {
      console.log(e, "--------e");
      PayFor(e).then((res) => {
        this.HandelRefresh();
      });
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      MemberwithdrawalPage({
        pageNo: this.pageNo,
        pageSize: 10,
        aduitStatus: this.aduitStatus,
        orderNo: this.orderNo,
        cashChannelId: this.cashChannelId,
        userName: this.userName,
        startDate: this.startDate,
        endDate: this.endDate,
      })
        .then((res) => {
          this.total = +res.resultSet.total;
          this.tableData = res.resultSet.date;
          this.resultSet = res.resultSet;
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
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.getMemWitdata(this.pageNo);
    },
    getMemWitdata(index) {
      // 记录当前页码
      this.pageNo = index;
      MemberwithdrawalPage({
        pageNo: index,
        pageSize: this.PagesSize,
        aduitStatus: this.aduitStatus,
        orderNo: this.orderNo,
        cashChannelId: this.cashChannelId,
        userName: this.userName,
        startDate: this.startDate,
        endDate: this.endDate,
      })
        .then((res) => {
          this.total = +res.resultSet.total;
          this.tableData = res.resultSet.date;
          this.resultSet = res.resultSet;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 条件查询
    getquery(e) {
      this.aduitStatus = e.aduitStatus;
      this.orderNo = e.orderNo;
      this.cashChannelId = e.cashChannelId;
      this.userName = e.userName;
      this.getMemWitdata(1);
    },
    // 恢复默认查询
    getresetting() {
      this.aduitStatus = null;
      this.orderNo = "";
      this.cashChannelId = "";
      this.userName = "";
      this.startDate = "";
      this.endDate = "";
      this.getMemWitdata(1);
    },
    // 导出excel
    async getExcel() {
      try {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const startDate = yesterday.toISOString().split("T")[0];
        const endDate = today.toISOString().split("T")[0];
        this.$refs.TableView.HandelLoading(true);
        const res = await memberCashRecordOutput({
          pageNo: this.pageNo,
          pageSize: 10,
          aduitStatus: this.aduitStatus,
          orderNo: this.orderNo,
          cashChannelId: this.cashChannelId,
          userName: this.userName,
          startDate: this.startDate || startDate,
          endDate: this.endDate || endDate,
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `memberwithdrawal.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$refs.TableView.HandelLoading(false);
        this.$refs.ControlView.HandelExcelStatus();
      } catch (error) {
        console.log(error);

        Message({
          message: "导出Excel失败",
          type: "error",
          duration: 5 * 1000,
        });
        this.$refs.TableView.HandelLoading(false);
        this.$refs.ControlView.HandelExcelStatus();
      }
    },
  },
};
</script>

<style></style>
