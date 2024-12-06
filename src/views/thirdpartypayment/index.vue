<template>
  <el-card>
    <Control
      ref="ControlView"
      @thirdAdd="getThirdAddShow"
      @thirdquery="getThirdQuery"
      @Refresh="HandelRefresh"
    />
    <Table
      ref="TableView"
      :table-data="tableData"
      @getdel="getThirdDel"
      @getEitor="getThirdEitorShow"
    />
    <Pagination :total="total" @PageChange="getThirdData" />
    <ThirdAdd ref="ThirdAdd" @confirm="getThirdAdd" />
    <ThirdEitor ref="ThirdEitor" @confirm="getThirdEitor" />
  </el-card>
</template>

<script>
import {
  thirdPage,
  thirdAdd,
  thirdDel,
  thirdEdit,
} from "@/api/thirdpartypayment/thirdpartypayment";

import Control from "./Control";
import Table from "./Table";
import Pagination from "@/components/Pagination/Pagination";
import ThirdAdd from "./ThirdAdd";
import ThirdEitor from "./ThirdEitor";

export default {
  components: {
    Table,
    Control,
    Pagination,
    ThirdAdd,
    ThirdEitor,
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      PagesSize: 20,
      currency: "",
      threeName: "",
      tableData: [],
    };
  },
  created() {
    this.getThirdData();
  },
  methods: {
    // 刷新
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      thirdPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        currency: this.currency,
        threeName: this.threeName,
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
    //请求分页
    getThirdData(index = 1) {
      this.pageNo = index;
      thirdPage({
        pageNo: index,
        pageSize: this.PagesSize,
        currency: this.currency,
        threeName: this.threeName,
      }).then((res) => {
        this.tableData = res.resultSet.data;
        this.total = res.resultSet.total;
      });
    },
    // 条件查询
    getThirdQuery(e) {
      this.currency = e.currency;
      this.threeName = e.threeName;
      this.getThirdData(1);
    },
    // 显示用户添加弹窗
    getThirdAddShow() {
      this.$refs.ThirdAdd.getAddstatus();
    },
    // 添加用户
    getThirdAdd(e) {
      thirdAdd(e)
        .then((res) => {
          this.getThirdData(this.pageNo);
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

    getThirdDel(id) {
      thirdDel(id).then((res) => {
        this.getThirdData(this.pageNo);
        this.$message({
          message: "删除成功!",
          type: "success",
        });
      });
    },

    // 显示编辑弹窗
    getThirdEitorShow(data) {
      this.$refs.ThirdEitor.getAddstatus(data);
    },
    //编辑
    getThirdEitor(data) {
      thirdEdit({
        account: data.account,
        apiUrl: data.apiUrl,
        currency: data.currency,
        id: data.id,
        javaBean: data.javaBean,
        secret: data.secret,
        threeName: data.threeName,
        sort: data.sort,
      }).then((res) => {
        this.getThirdData(this.pageNo);
        this.$message({
          message: "修改成功!",
          type: "success",
        });
      });
    },
  },
};
</script>

<style></style>
