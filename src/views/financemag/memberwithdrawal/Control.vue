<template>
  <div>
    <el-row :gutter="10">
      <!-- 选择日期 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-date-picker
          style="width: 100%"
          v-model="timeArr"
          type="datetimerange"
          align="right"
          unlink-panels
          :range-separator="$t('to')"
          :start-placeholder="$t('Startdate')"
          :end-placeholder="$t('EndDate')"
          :picker-options="pickerOptions"
          @change="heandlerTime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-col>
      <!-- <el-button type="primary" @click="getroleAdd()">新增</el-button> -->
      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="userName" :placeholder="$t('username')" />
      </el-col>

      <!-- 条件筛选框 -->
      <el-col :xs="24" :sm="12" :md="3">
        <el-select
          v-model="aduitStatus"
          :placeholder="$t('Reviewstatus')"
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in noticetype"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="orderNo" placeholder="请输入订单号" />
      </el-col>

      <!-- <el-select
      v-model="orderNo"
      placeholder="选择会员"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in MemberData"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select> -->
      <el-col :xs="24" :sm="12" :md="3">
        <el-select
          style="width: 100%"
          v-model="cashChannelId"
          placeholder="选择提现渠道"
        >
          <el-option
            v-for="(item, index) in channelData"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-button
        :disabled="excelStatus"
        style="margin-left: 10px"
        type="primary"
        @click="getExcel()"
        >导出数据</el-button
      >
      <el-button
        v-has="'memberwithdrawal:page'"
        style="margin-left: 10px"
        type="primary"
        @click="getquery()"
        >{{ $t("query") }}</el-button
      >
      <el-button
        type="info"
        style="margin-left: 10px"
        plain
        @click="getresetting()"
        >{{ $t("resetting") }}</el-button
      >
      <!-- 刷新按钮 -->
      <el-button
        v-if="btnIcoType"
        type="success"
        icon="el-icon-refresh-left"
        @click="HandelRefresh"
        >{{ $t("Refresh") }}</el-button
      >
      <el-button v-else type="success" icon="el-icon-loading" disabled>{{
        $t("Refresh")
      }}</el-button>
      <!-- 开启自动刷新 -->
      <el-button
        v-if="!this.$store.state.autorefresh.A_T_Recharge"
        type="info"
        icon="el-icon-refresh"
        @click="GetUpdataRefresh"
        >开启自动刷新</el-button
      >
      <el-button
        v-else
        type="primary"
        icon="el-icon-loading"
        @click="GetUpdataRefresh"
        >关闭自动刷新</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { MemberPage } from "@/api/account/member";
import { channelPage } from "@/api/finance/rechargechannel";
export default {
  name: "Control",
  data() {
    return {
      aduitStatus: null, // 审核状态
      orderNo: "", // 订单号
      cashChannelId: "", // 提现渠道id
      userName: "", // 会员账号
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value: "",
      noticetype: [
        { title: this.$t("PendingReview"), index: 0 },
        { title: this.$t("Approve"), index: 1 },
        { title: this.$t("reject"), index: 2 },
        { title: this.$t("Cancelled"), index: 3 },
        { title: this.$t("InProgress"), index: 4 },
      ],
      btnIcoType: true,
      channelData: [],
      MemberData: [],
      excelStatus: false,
      timeArr: [],
    };
  },
  created() {
    this.GetChannelPage();
    this.GetMemberPage();
  },
  methods: {
    // 选择日期
    heandlerTime() {
      this.$emit("SelectDate", {
        startDate: this.timeArr?.[0],
        endDate: this.timeArr?.[1],
      });
    },
    // 日期回显
    pagesDate(data) {
      this.value = [data.startDate, data.endDate];
    },
    GetChannelPage() {
      this.channelData = [];
      channelPage({ pageNo: 1, pageSize: 10000 })
        .then((res) => {
          for (let i = 0; i < res.resultSet.data.length; i++) {
            this.channelData.push({
              index: res.resultSet.data[i].id,
              title: res.resultSet.data[i].name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetMemberPage() {
      this.MemberData = [];
      MemberPage({ pageNo: 1, pageSize: 10000 })
        .then((res) => {
          for (let i = 0; i < res.resultSet.data.length; i++) {
            this.MemberData.push({
              title: res.resultSet.data[i].userName,
              index: res.resultSet.data[i].id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 自动刷新开关
    GetUpdataRefresh() {
      this.$store.commit("autorefresh/GetUpdataRefreshATRecharge");
    },
    // 刷新
    HandelRefresh() {
      this.$emit("Refresh");
      this.btnIcoType = false;
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true;
    },
    getquery() {
      this.$emit("query", {
        aduitStatus: this.aduitStatus,
        orderNo: this.orderNo,
        cashChannelId: this.cashChannelId,
        userName: this.userName,
      });
    },
    // 恢复默认查找
    getresetting() {
      this.aduitStatus = null;
      this.orderNo = "";
      this.cashChannelId = "";
      this.userName = "";
      this.value = null;
      this.$emit("resetting");
    },
    // 导出
    getExcel() {
      this.$emit("getExcel");
      this.excelStatus = true;
    },
    HandelExcelStatus() {
      this.excelStatus = false;
    },
  },
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 10px;
  }
}
</style>
