<template>
  <el-row style="padding-bottom: 10px">
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
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" style="margin-left: 10px;" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
    <el-button v-else style="margin-left: 10px;" type="success" icon="el-icon-loading" disabled>刷新</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
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
      btnIcoType: true
    }
  },
  methods: {
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    // 选择时间
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
      console.log(timearr)
      this.$emit('SelectDate', { startDate: timearr[0], endDate: timearr[1] })
    //   this.getdailydata(timearr[0], timearr[1])
    },
    // 日期回显
    pagesDate(data) {
      this.value = [data.startDate, data.endDate]
    }
  }
}
</script>

  <style></style>

