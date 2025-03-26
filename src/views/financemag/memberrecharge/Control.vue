<template>
  <div>
    <el-row :gutter="10">
      <!-- 选择日期 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-date-picker
          style="width: 100%"
          v-model="timeArr"
          type="daterange"
          align="right"
          unlink-panels
          :range-separator="$t('to')"
          :start-placeholder="$t('Startdate')"
          :end-placeholder="$t('EndDate')"
          :picker-options="pickerOptions"
          @change="heandlerTime"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="amount" :placeholder="$t('amountofmoney')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="cardNo" :placeholder="$t('Paymentcardnumber')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-select
          v-model="channelId"
          :placeholder="$t('Choosechannels')"
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in ChannelIdData"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="userName" :placeholder="$t('username')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-select
          v-model="auditStatus"
          :placeholder="$t('Reviewstatus')"
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in auditStatusList"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-button
        v-has="'memberrecharge:page'"
        style="margin-left: 10px"
        type="primary"
        @click="getquery()"
        >{{ $t("query") }}</el-button
      >
      <el-button
        :disabled="excelStatus"
        style="margin-left: 10px"
        type="primary"
        @click="getExcel()"
        >导出数据</el-button
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
        v-if="!this.$store.state.autorefresh.M_Recharge"
        type="info"
        icon="el-icon-refresh"
        @click="GetUpdataRefresh"
      >
        {{ $t("Enableautomaticrefresh") }}
      </el-button>
      <el-button
        v-else
        type="primary"
        icon="el-icon-loading"
        @click="GetUpdataRefresh"
        >{{ $t("Turnoffautomaticrefresh") }}</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { channelPage } from "@/api/finance/rechargechannel";
import { userPage } from "@/api/account/user";
import { mapGetters } from "vuex";
export default {
  name: "Control",
  data() {
    return {
      // 金额
      amount: "",
      // 审核状态
      auditStatus: "",
      // 卡号
      cardNo: "",
      // 渠道id
      channelId: "",
      // 时间
      date: "",
      // 用户id
      userName: "",
      auditStatusList: [
        { title: this.$t("PendingReview"), index: 0 },
        { title: this.$t("Approve"), index: 1 },
        { title: this.$t("reject"), index: 2 },
        { title: this.$t("Cancelled"), index: 3 },
      ],
      btnIcoType: true,
      ChannelIdData: [],
      UserId: [],
      excelStatus: false,
      timeArr: [],
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
    };
  },
  computed: {
    ...mapGetters(["M_Recharge"]),
  },
  created() {
    this.GetChannelId();
    this.GetUserId();
  },
  methods: {
    // 选择日期
    heandlerTime() {
      this.$emit("SelectDate", {
        startDate: this.timeArr?.[0],
        endDate: this.timeArr?.[1],
      });
    },
    // 获取用户id
    GetUserId() {
      this.UserId = [];
      userPage({ pageNo: 1, pageSize: 10000 })
        .then((res) => {
          for (let i = 0; i < res.resultSet.data.length; i++) {
            this.UserId.push({
              index: res.resultSet.data[i].id,
              title: res.resultSet.data[i].userName,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取渠道id
    GetChannelId() {
      this.ChannelIdData = [];
      channelPage({ pageNo: 1, pageSize: 10000 })
        .then((res) => {
          console.log(res);
          console.log(res.resultSet.data);
          for (let i = 0; i < res.resultSet.data.length; i++) {
            this.ChannelIdData.push({
              title: res.resultSet.data[i].name,
              index: res.resultSet.data[i].id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 开启自动刷新
    GetUpdataRefresh() {
      this.$store.commit("autorefresh/GetUpdataRefreshMRecharge");
      // this.$emit('UpdataRefresh')
      // console.log(this.$store.state.autorefresh.M_Recharge)
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
    // 查询
    getquery() {
      this.$emit("Gamequery", {
        amount: this.amount,
        auditStatus: this.auditStatus,
        cardNo: this.cardNo,
        channelId: this.channelId,
        userName: this.userName,
      });
      // date: new Date(this.date).toISOString().slice(0, 10),
    },
    // 重置
    getresetting() {
      this.amount = "";
      this.auditStatus = "";
      this.cardNo = "";
      this.channelId = "";
      // this.date = ''
      this.userName = "";
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
