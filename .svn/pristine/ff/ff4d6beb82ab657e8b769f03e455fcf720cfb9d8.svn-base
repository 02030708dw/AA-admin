<template>
  <el-card class="box-card" style="margin-top: 20px">
    <div slot="header" class="clearfix">
      <el-row style="display: flex; align-items: center">
        <el-col :span="12" style="font-size: 24px">平台月报表</el-col>
        <el-col :span="6" :offset="6">
          <!-- 时间选择 -->
          <el-date-picker
            v-model="value"
            type="monthrange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :picker-options="pickerOptions"
            @blur="heandlerTime"
          >
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <div
        id="MonthChart"
        class="chart"
        :style="{ width: '100%', height: '500px' }"
      ></div>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import { getMonthlyreport } from "@/api/home/Monthlyreport";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            },
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
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
      yAxisData5: [],
    };
  },
  mounted() {
    this.getDateData();
  },
  methods: {
    // 获取初始化区间时间以及数据(三月内)
    getDateData() {
      let currentDate = new Date();
      let endMonth =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1 < 10
          ? "0" + (currentDate.getMonth() + 1)
          : currentDate.getMonth() + 1);

      let date = new Date(currentDate.getTime());
      date.setMonth(date.getMonth() - 2); // 将日期设置为前2个月
      let startMonth =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1);

      this.getMonthlyreportdata(startMonth, endMonth);
    },
    // 请求数据
    getMonthlyreportdata(startMonth, endMonth) {
      getMonthlyreport({ startMonth: startMonth, endMonth: endMonth })
        .then((res) => {
          this.handledata(res.resultSet);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 处理数据
    handledata(data) {
      this.xAxisData = [];
      this.yAxisData1 = [];
      this.yAxisData2 = [];
      this.yAxisData3 = [];
      this.yAxisData4 = [];
      this.yAxisData5 = [];
      for (let i = 0; i < data.length; i++) {
        this.xAxisData.push(data[i].month);
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
      this.myChartOne = echarts.init(document.getElementById("MonthChart"));
      this.myChartOne.setOption(option);
    },
    // 获取时间
    heandlerTime() {
      let timearr = [];
      for (let i = 0; i < this.value.length; i++) {
        let date = new Date(this.value[i]);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        timearr.push(year + "-" + (month < 10 ? "0" + month : month));
      }
      this.getMonthlyreportdata(timearr[0], timearr[1]);
    },
  },
};
</script>

<style>
</style>
