<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row style="display: flex; align-items: center">
        <el-col :span="12" style="font-size: 24px">会员报表</el-col>
        <el-col :span="6" :offset="1">
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
          />
        </el-col>
      </el-row>
    </div>
    <!-- 折线图 -->
    <el-row>
      <div id="MemberChart" class="chart" :style="{ width: '100%', height: '300px' }" />
    </el-row>
  </el-card>
</template>

<script>
import { getMemberPages } from '@/api/reportforms/reportforms'

import * as echarts from 'echarts'

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: '',
      xAxisData: [], // ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], // x轴数据，可根据需求
      yAxisData1: [], // [120, 132, 101, 134, 90, 230, 210], // 数据1
      yAxisData2: [] // [220, 182, 191, 234, 290, 330, 310], // 数据2
    }
  },
  mounted() {
    this.getDateData()
  },
  methods: {
    // 获取初始化数据区间时间以及数据(一周内)
    getDateData() {
      const currentDate = new Date()
      const endDate =
          currentDate.getFullYear() +
          '-' +
          (currentDate.getMonth() + 1) +
          '-' +
          currentDate.getDate()
      const date = new Date(currentDate.getTime()) // 使用相同的时间，但改变日期
      date.setDate(date.getDate() - 6) // 将日期设置为前6天
      const startDate =
          date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      // 请求数据
      this.getdailydata(startDate, endDate)
      this.value = [startDate, endDate]
    },
    // 请求数据
    getdailydata(startDate, endDate) {
      getMemberPages({ startDay: startDate, endDay: endDate, pageNo: 1, pageSize: 10000 })
        .then((res) => {
          this.handledata(res.resultSet.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 处理数据
    handledata(data) {
      this.xAxisData = []
      this.yAxisData1 = []
      this.yAxisData2 = []
      for (let i = 0; i < data.length; i++) {
        this.xAxisData.push(data[i].memberName)
        this.yAxisData1.push(data[i].friendNum)
        this.yAxisData2.push(data[i].rateAmount)
      }

      this.loadLine()
    },
    // 渲染折现图
    loadLine() {
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['好友人数', '总返点金额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData // x轴数据
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '好友人数',
            type: 'line',
            stack: 'x',
            data: this.yAxisData1,
            areaStyle: {}
          },
          {
            name: '总返点金额',
            type: 'line',
            stack: 'x',
            data: this.yAxisData2,
            areaStyle: {}
          }
        ]
      }
      this.myChartOne = echarts.init(document.getElementById('MemberChart'))
      this.myChartOne.setOption(option)
    },
    // 时间选择
    heandlerTime() {
      const timearr = []
      for (let i = 0; i < this.value.length; i++) {
        const date = new Date(this.value[i])
        const year = date.getFullYear()
        const month =
            date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const formattedDate = year + '-' + month + '-' + day
        timearr.push(formattedDate)
      }
      this.getdailydata(timearr[0], timearr[1])
    }
  }
}
</script>

  <style scoped lang="scss">
  .box-card{width: 100%;}
  </style>

