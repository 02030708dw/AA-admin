<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="5">
          <el-col :span="6">
            <span class="header-title">代理报表</span>
          </el-col>
          <el-col :span="10">
            <el-date-picker
              v-model="TimeValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="handleTimeChange"
            />
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="RankingValue"
              placeholder="选择排名数量"
              @change="handleRankingChange"
            >
              <el-option
                v-for="item in RankingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div id="AgentChart" style="width: 100%; height: 400px"></div>
    </el-card>
  </template>
  
  <script>
  import { getAgentPages } from "@/api/reportforms/reportforms";
  import * as echarts from "echarts";
  
  export default {
    data() {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const today = new Date();
  
      return {
        TimeValue: [this.formatDate(oneWeekAgo), this.formatDate(today)],
        RankingValue: "5", // 默认显示前5名
        RankingOptions: [
          { value: "5", label: "前5名" },
          { value: "10", label: "前10名" },
          { value: "20", label: "前20名" },
        ],
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 30);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        myChart: null,
      };
    },
    async mounted() {
      this.initChart();
    },
    methods: {
      formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      async initChart() {
        const chartDom = document.getElementById("AgentChart");
        this.myChart = echarts.init(chartDom);
        await this.loadChartData();
      },
      async loadChartData() {
        const params = {
          startDay: this.TimeValue[0],
          endDay: this.TimeValue[1],
          pageSize: 10000,
          pageNo: 1,
        };
  
        try {
          const res = await getAgentPages(params);
          const data = res.resultSet.data;
  
          // 聚合数据
          const aggregatedData = {};
          data.forEach((item) => {
            const agentName = item.agentName;
            if (!aggregatedData[agentName]) {
              aggregatedData[agentName] = {
                registerNum: 0,
                activeNum: 0,
                firstIncomeNum: 0,
                firstIncomeAmount: 0,
                incomeAmount: 0,
                cashNum: 0,
                cashAmount: 0,
                plantformAmount: 0,
                phaseAmount: 0,
                netProfitAmount: 0,
              };
            }
            Object.keys(aggregatedData[agentName]).forEach((key) => {
              aggregatedData[agentName][key] += item[key] || 0;
            });
          });
  
          // 按净盈利排序，取前 N 名
          const sortedAgents = Object.entries(aggregatedData)
            .sort(([, a], [, b]) => b.netProfitAmount - a.netProfitAmount)
            .slice(0, Number(this.RankingValue));
  
          // 准备图表数据
          const yAxisData = sortedAgents.map(([agentName]) => agentName);
          const legendMap = {
            registerNum: "注册人数",
            activeNum: "活跃人数",
            firstIncomeNum: "首次充值人数",
            firstIncomeAmount: "首次充值金额",
            incomeAmount: "充值总金额",
            cashNum: "提现人数",
            cashAmount: "提现总金额",
            plantformAmount: "平台费用",
            phaseAmount: "盈亏总额",
            netProfitAmount: "净盈利",
          };
  
          const legendData = Object.values(legendMap);
          const series = Object.keys(legendMap).map((key) => ({
            name: legendMap[key],
            type: "bar",
            stack: "total",
            data: sortedAgents.map(([, agentData]) => agentData[key]),
          }));
  
          // 图表配置
          const option = {
            tooltip: {
              trigger: "axis",
              confine: true,
            },
            legend: {
              data: legendData,
              top: 30,
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: {
              type: "value",
              axisLabel: {
                formatter: "{value}",
              },
            },
            yAxis: {
              type: "category",
              data: yAxisData,
            },
            series,
          };
  
          this.myChart.setOption(option);
        } catch (error) {
          console.error("加载图表数据失败:", error);
        }
      },
      handleTimeChange() {
        this.loadChartData();
      },
      handleRankingChange() {
        this.loadChartData();
      },
    },
  };
  </script>
  
  <style scoped>
  .box-card {
    width: 100%;
  }
  .header-title {
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  