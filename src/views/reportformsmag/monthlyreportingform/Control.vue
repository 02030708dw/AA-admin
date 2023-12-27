<template>
  <el-row style="padding-bottom: 10px">
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
    />
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
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: ''
    }
  },
  methods: {
    // 选择时间
    heandlerTime() {
      const timearr = []
      for (let i = 0; i < this.value.length; i++) {
        const date = new Date(this.value[i])
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        timearr.push(year + '-' + (month < 10 ? '0' + month : month))
      }
      //   this.getMonthlyreportdata(timearr[0], timearr[1])
      this.$emit('SelectDate', { startMonth: timearr[0], endMonth: timearr[1] })
    },
    // 日期回显
    pagesDate(data) {
      this.value = [data.startMonth, data.endMonth]
    }
  }
}
</script>

    <style></style>

