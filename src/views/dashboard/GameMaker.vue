<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row :gutter="5">
        <el-col :span="6">
          <span class="header-title">游戏商报表</span>
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
            v-model="GameMakerValue"
            filterable
            clearable
            placeholder="选择游戏商"
            @change="handleGameMakerChange"
          >
            <el-option
              v-for="item in GameMakerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="TypeValue"
            placeholder="选择类型"
            @change="handleTypeChange"
          >
            <el-option
              v-for="item in TypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div id="main" style="width: 100%; height: 400px"></div>
  </el-card>
</template>

<script>
import { getGamerPages } from "@/api/reportforms/reportforms";
import * as echarts from "echarts";

export default {
  data() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const today = new Date();

    return {
      TimeValue: [this.formatDate(oneWeekAgo), this.formatDate(today)], // 默认最近一周时间
      GameMakerValue: "", // 游戏商
      GameMakerOptions: [], // 游戏商选项
      TypeValue: "phaseAmount", // 类型，默认盈亏
      TypeOptions: [
        { value: "phaseAmount", label: "盈亏" },
        { value: "betAmount", label: "投注总额" },
        { value: "winAmount", label: "中奖总额" },
        { value: "rate", label: "抽成比例" },
        { value: "rateAmount", label: "抽成金额" },
        { value: "realBetAmount", label: "有效投注金额" },
        { value: "betUserNum", label: "投注人数" },
      ],
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
        disabledDate(time) {
          return time.getTime() > Date.now(); // 禁止选择今天之后的日期
        },
      },
      myChart: null, // ECharts 实例
    };
  },
  async mounted() {
    await this.loadGameMakers(); // 加载游戏商选项
    this.initChart(); // 初始化图表
  },
  methods: {
    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    // 初始化图表
    async initChart() {
      const chartDom = document.getElementById("main");
      this.myChart = echarts.init(chartDom);
      await this.loadChartData("盈亏");
    },

    // 加载图表数据
    async loadChartData(titleText) {
      const params = {
        startDay: this.TimeValue[0] || "", // 开始日期
        endDay: this.TimeValue[1] || "", // 结束日期
        gamerId: this.GameMakerValue || "", // 游戏商 ID
        pageSize: 10000,
        pageNo: 1,
      };

      try {
        const res = await getGamerPages(params);
        const data = res.resultSet.data;

        // 按日期分组并合并相同游戏商的值
        const groupedData = {};
        data.forEach((item) => {
          const day = item.day;
          const gamerName = item.gamerName;

          if (!groupedData[day]) groupedData[day] = {};
          if (!groupedData[day][gamerName]) {
            groupedData[day][gamerName] = 0;
          }

          // 确保值是数字类型，并且累加相同游戏商的值
          groupedData[day][gamerName] += Number(item[this.TypeValue]) || 0; // 转换为数字，若不是数字则为 0
        });

        // 确保 x 轴数据按时间升序排列
        const xAxisData = Object.keys(groupedData).sort(
          (a, b) => new Date(a) - new Date(b)
        );

        // 筛选游戏商
        let legendData, seriesData;
        if (this.GameMakerValue) {
          // 如果选择了游戏商，只显示当前选择的游戏商
          const selectedGamerName = this.GameMakerOptions.find(
            (opt) => opt.value === this.GameMakerValue
          )?.label;

          if (!selectedGamerName) {
            console.error("未找到匹配的游戏商名称！");
            return;
          }

          legendData = [selectedGamerName];
          seriesData = [
            {
              name: selectedGamerName,
              type: "line", // 使用曲线图
              data: xAxisData.map(
                (day) => groupedData[day]?.[selectedGamerName] || 0
              ),
            },
          ];
        } else {
          // 未选择游戏商，显示所有游戏商
          legendData = this.GameMakerOptions.map((opt) => opt.label);
          seriesData = legendData.map((name) => ({
            name,
            type: "line", // 使用曲线图
            data: xAxisData.map((day) => groupedData[day]?.[name] || 0),
          }));
        }

        // 更新图表配置
        const option = {
          title: { text: titleText },
          tooltip: {
            trigger: "axis",
            confine: true,
            formatter: (params) => {
              // 过滤掉值为 0 的游戏商
              const validData = params.filter((item) => item.value !== 0);
              if (validData.length === 0) {
                return null;
              }
              return validData
                .map((item) => {
                  const color = item.value < 0 ? "red" : "green"; // 根据值选择颜色
                  return `<span style="color:${color}">${item.seriesName}: ${item.value}</span>`; // 显示方式
                })
                .join("<br/>");
            },
          },

          legend: {
            type: "scroll", // 滚动模式
            orient: "horizontal",
            top: 30,
            data: legendData,
          },
          grid: { top: 60, bottom: 80 },
          xAxis: { type: "category", data: xAxisData },
          yAxis: { type: "value" },
          series: seriesData,
        };

        this.myChart.setOption(option);
      } catch (error) {
        console.error("加载图表数据失败:", error);
      }
    },
    // 加载游戏商选项
    async loadGameMakers() {
      await this.$store.dispatch("user/gamerSet");
      this.GameMakerOptions = this.$store.state.user.gamer.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    },

    // 时间选择事件
    handleTimeChange() {
      this.loadChartData(
        this.TypeOptions.find((opt) => opt.value === this.TypeValue).label
      );
    },

    // 游戏商选择事件
    handleGameMakerChange() {
      // 重置图表和数据
      this.myChart.clear();
      this.loadChartData(
        this.TypeOptions.find((opt) => opt.value === this.TypeValue).label
      );
    },

    // 类型选择事件
    handleTypeChange() {
      this.loadChartData(
        this.TypeOptions.find((opt) => opt.value === this.TypeValue).label
      );
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
