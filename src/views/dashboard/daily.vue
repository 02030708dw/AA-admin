<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row style="display: flex; align-items: center">
        <el-col :span="12" style="font-size: 24px">平台日报表</el-col>
        <el-col :span="6" :offset="6">
          <!-- 时间选择 -->
          <el-date-picker
            v-model="value"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @blur="heandlerTime"
          >
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <!-- 折线图 -->
    <el-row>
      <div
        id="myChart"
        class="chart"
        :style="{ width: '100%', height: '500px' }"
      ></div>
    </el-row>
  </el-card>
</template>

<script>
import { getdaily } from "@/api/home/daily";

import * as echarts from "echarts";

export default {
  data() {
    return {
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
      xAxisData: [], //["周一", "周二", "周三", "周四", "周五", "周六", "周日"], // x轴数据，可根据需求
      yAxisData1: [], //[120, 132, 101, 134, 90, 230, 210], // 数据1
      yAxisData2: [], //[220, 182, 191, 234, 290, 330, 310], // 数据2
      yAxisData3: [], //[150, 232, 201, 154, 190, 330, 410], // 数据3
      yAxisData4: [], //[320, 332, 301, 334, 390, 330, 320], // 数据4
      yAxisData5: [], //[820, 932, 901, 934, 1290, 1330, 1320], // 数据5
    };
  },
  mounted() {
    this.getDateData();
  },
  methods: {
    // 获取初始化数据区间时间以及数据(一周内)
    getDateData() {
      let currentDate = new Date();
      let endDate =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate();
      let date = new Date(currentDate.getTime()); // 使用相同的时间，但改变日期
      date.setDate(date.getDate() - 6); // 将日期设置为前6天
      let startDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      // 请求数据
      this.getdailydata(startDate, endDate);
    },
    // 请求数据
    getdailydata(startDate, endDate) {
      getdaily({ startDate: startDate, endDate: endDate })
        .then((res) => {
          this.handledata(res.resultSet);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //处理数据
    handledata(data) {
      this.xAxisData = [];
      this.yAxisData1 = [];
      this.yAxisData2 = [];
      this.yAxisData3 = [];
      this.yAxisData4 = [];
      this.yAxisData5 = [];
      for (let i = 0; i < data.length; i++) {
        this.xAxisData.push(data[i].day);
        this.yAxisData1.push(data[i].betAmount);
        this.yAxisData2.push(data[i].awardAmount);
        this.yAxisData3.push(data[i].cashAmount);
        this.yAxisData4.push(data[i].incomeAmount);
        this.yAxisData5.push(data[i].gainAmount);
      }

      this.loadLine();
    },
    //渲染折现图
    loadLine() {
      let option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["投注金额", "派奖金额", "提现金额", "充值金额", "盈利金额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisData, // x轴数据
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "投注金额",
            type: "line",
            stack: "x",
            data: this.yAxisData1,
            areaStyle: {},
          },
          {
            name: "派奖金额",
            type: "line",
            stack: "x",
            data: this.yAxisData2,
            areaStyle: {},
          },
          {
            name: "提现金额",
            type: "line",
            stack: "x",
            data: this.yAxisData3,
            areaStyle: {},
          },
          {
            name: "充值金额",
            type: "line",
            stack: "x",
            data: this.yAxisData4,
            areaStyle: {},
          },
          {
            name: "盈利金额",
            type: "line",
            stack: "x",
            data: this.yAxisData5,
            areaStyle: {},
          },
        ],
      };
      this.myChartOne = echarts.init(document.getElementById("myChart"));
      this.myChartOne.setOption(option);
    },
    // 时间选择
    heandlerTime() {
      let timearr = [];
      for (let i = 0; i < this.value.length; i++) {
        let date = new Date(this.value[i]);
        let year = date.getFullYear();
        let month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let formattedDate = year + "-" + month + "-" + day;
        timearr.push(formattedDate);
      }
      this.getdailydata(timearr[0], timearr[1]);
    },
    // // 获取区间内的所有日期
    // getDatesBetween(startDate, endDate) {
    //   let start = new Date(startDate);
    //   let end = new Date(endDate);

    //   let dates = [];
    //   while (start <= end) {
    //     let date = new Date(start);
    //     dates.push(
    //       date.getFullYear() +
    //         "-" +
    //         (date.getMonth() + 1) +
    //         "-" +
    //         date.getDate()
    //     );
    //     start.setDate(start.getDate() + 1);
    //   }

    //   return dates;
    // },
  },
};
</script>

<style>
</style>