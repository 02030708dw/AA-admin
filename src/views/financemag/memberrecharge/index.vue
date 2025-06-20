<template>
  <!-- 会员充值管理 -->
  <el-card>
    <!-- @Refresh="HandelRefresh" -->
    <Control ref="ControlView" @Refresh="HandelRefresh" @getExcel="getExcel" @Gamequery="getgetquery"
      @resetting="getresetting" @SelectDate="HandelSelectDate" />
    <Table ref="TableView" :table-data="tableData" @option="getoption" @info="Handelinfo" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="memberrechargedata" />
    <Dialog ref="DialogView" @toexamine="gettoexamine" />
    <InfoView ref="infoview"></InfoView>
  </el-card>
</template>

<script>
import {
  MemberrechargelPage,
  MemberrechargelToexamine,
  incomeRecordOutput,
} from "../../../api/finance/memberrecharge";
import { Message } from "element-ui";
import Table from "./Table.vue";
import Control from "./Control.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Dialog from "./Dialog.vue";
import InfoView from "./InfoView.vue";
export default {
  components: {
    Table,
    Control,
    Pagination,
    Dialog,
    InfoView,
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      amount: "",
      auditStatus: "",
      cardNo: "",
      channelId: "",
      date: "",
      userName: "",
      PagesSize: 20,
      startTime: "",
      endTime: "",
    };
  },
  computed: {
    M_Recharge() {
      return this.$store.state.autorefresh.M_Recharge;
    },
  },
  watch: {
    M_Recharge: {
      handler(newvalue, oldvalue) {
        const _that = this;
        const time = setInterval(() => {
          if (this.$store.state.autorefresh.M_Recharge) {
            // 刷新
            MemberrechargelPage({
              pageNo: _that.pageNo,
              pageSize: this.PagesSize,
              amount: _that.amount,
              auditStatus: _that.auditStatus,
              cardNo: _that.cardNo,
              channelId: _that.channelId,
              date: _that.date,
              userName: _that.userName,
            })
              .then((res) => {
                console.log(res.resultSet.data);
                _that.total = res.resultSet.total;
                _that.tableData = res.resultSet.data;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            // 清除
            clearInterval(time);
          }
        }, 3000);
      },
      immediate: true,
    },
  },
  created() {
    this.memberrechargedata(1);
  },
  methods: {
    // 时间选择
    HandelSelectDate(data) {
      this.startTime = data.startDate;
      this.endTime = data.endDate;
      // 请求数据
      this.memberrechargedata(1);
    },
    Handelinfo(e) {
      this.$refs.infoview.getAddstatus(e);
    },
    // 刷新
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      MemberrechargelPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        amount: this.amount,
        auditStatus: this.auditStatus,
        cardNo: this.cardNo,
        channelId: this.channelId,
        date: this.date,
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
    memberrechargedata(index) {
      this.pageNo = index;
      MemberrechargelPage({
        pageNo: index,
        pageSize: this.PagesSize,
        amount: this.amount,
        auditStatus: this.auditStatus,
        cardNo: this.cardNo,
        channelId: this.channelId,
        date: this.date,
        userName: this.userName,
        startTime: this.startTime,
        endTime: this.endTime,
      })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变每页条数
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.memberrechargedata(this.pageNo);
    },
    // 条件查询
    getgetquery(e) {
      this.amount = e.amount;
      this.auditStatus = e.auditStatus;
      this.cardNo = e.cardNo;
      this.channelId = e.channelId;
      // this.date = e.date
      this.userName = e.userName;
      this.memberrechargedata(1);
    },
    // 重置
    getresetting() {
      this.amount = "";
      this.auditStatus = "";
      this.cardNo = "";
      this.channelId = "";
      this.date = "";
      this.userName = "";
      this.startTime = "";
      this.endTime = "";
      this.memberrechargedata(1);
    },
    // 操作
    getoption(e) {
      this.$refs.DialogView.HandelDialogStatus(e);
    },
    gettoexamine(e) {
      // 审核
      MemberrechargelToexamine({
        auditStatus: e.type,
        recordId: e.id,
        reason: e.reason,
      })
        .then((res) => {
          // 刷新数据
          this.memberrechargedata(this.pageNo);
          this.$message({
            message: "操作成功!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("操作失败!");
        });
    },
    // 导出excel
    async getExcel() {
      try {
        this.$refs.TableView.HandelLoading(true);
        const res = await incomeRecordOutput({
          pageNo: this.pageNo,
          pageSize: this.PagesSize,
          amount: this.amount,
          auditStatus: this.auditStatus,
          cardNo: this.cardNo,
          channelId: this.channelId,
          date: this.date,
          userName: this.userName,
          startTime: this.startTime,
          endTime: this.endTime,
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `memberrecharge.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$refs.TableView.HandelLoading(false);
        this.$refs.ControlView.HandelExcelStatus();
      } catch (error) {
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

<style lang="scss" scoped></style>
