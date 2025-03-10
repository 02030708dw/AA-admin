<template>
  <div>
    <el-row :gutter="10">
      <!-- 选择日期 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-date-picker
          style="width: 100%"
          v-model="value"
          type="daterange"
          align="right"
          unlink-panels
          :range-separator="$t('to')"
          :start-placeholder="$t('Startdate')"
          :end-placeholder="$t('EndDate')"
          :picker-options="pickerOptions"
          @change="heandlerTime"
        />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="vipLevel" :placeholder="$t('VIPlevel')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="ip" :placeholder="$t('IPAddress')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="userName" :placeholder="$t('username')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-input v-model="userPhone" :placeholder="$t('phone')" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-select
          style="width: 100%"
          v-model="agentId"
          filterable
          :placeholder="$t('SelectProxy')"
        >
          <el-option
            v-for="(item, index) in agentIddata"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="12" :md="3">
        <el-select
          style="width: 100%"
          v-model="status"
          :placeholder="$t('state')"
        >
          <el-option
            v-for="(item, index) in statusType"
            :key="index"
            :value="item.index"
            :label="item.title"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-button v-has="'membermag:page'" type="primary" @click="getquery()">{{
        $t("query")
      }}</el-button>
      <el-button type="primary" @click="geteditpaymentall()"
        >{{ $t('一键排序支付商') }}</el-button
      >
      <el-button type="info" plain @click="getresetting()">{{
        $t("resetting")
      }}</el-button>
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
    </el-row>
  </div>
</template>

<script>
// 获取代理id
// import { AgentPage } from '@/api/account/agent'
export default {
  name: "Control",
  props: {
    agentIddata: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      agentId: "",
      userPhone: "",
      userName: "",
      status: null,
      statusType: [
        { title: "停用", index: 0 },
        { title: "启用", index: 1 },
      ],
      btnIcoType: true,
      vipLevel: "",
      ip: "",
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t("最近一周"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("最近一个月"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("最近三个月"),
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

      // agentIddata: []
    };
  },
  created() {},
  methods: {
    // 选择日期
    heandlerTime() {
      const timearr = [];
      for (let i = 0; i < this.value?.length; i++) {
        const date = new Date(this.value[i]);
        const year = date.getFullYear();
        const month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const formattedDate = year + "-" + month + "-" + day;
        timearr.push(formattedDate);
      }
      this.$emit("SelectDate", { startDate: timearr[0], endDate: timearr[1] });
    },
    // 日期回显
    pagesDate(data) {
      this.value = [data.startDate, data.endDate];
    },
    // // 获取代理id
    // getAgentPage() {
    //   this.agentIddata = []
    //   AgentPage({ pageNo: 1, pageSize: 100000 }).then(res => {
    //     for (let i = 0; i < res.resultSet.data.length; i++) {
    //       this.agentIddata.push({
    //         title: res.resultSet.data[i].userName,
    //         index: res.resultSet.data[i].id
    //       })
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    getquery() {
      this.$emit("Memquery", {
        agentId: this.agentId,
        userName: this.userName,
        userPhone: this.userPhone,
        vipLevel: this.vipLevel,
        ip: this.ip,
        status: this.status,
      });
    },
    geteditpaymentall() {
      this.$emit("EditPaymentAll");
    },
    getresetting() {
      this.agentId = "";
      this.userName = "";
      this.status = null;
      this.value = null;
      this.vipLevel = null;
      this.ip = null;
      this.$emit("resetting");
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
