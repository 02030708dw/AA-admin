<template>
  <el-card>
    <Control ref="ControlView" @SelectDate="getDateSelect" />
    <Table :table-data="tableData" />
  </el-card>
</template>
<script>
import { getMonthlyreport } from '@/api/home/Monthlyreport'
import Table from './Tab.vue'
import Control from './Control.vue'
export default {
  components: {
    Table,
    Control
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getDateData()
  },
  methods: {
    getDateData() {
      const currentDate = new Date()
      const endMonth =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1 < 10
          ? '0' + (currentDate.getMonth() + 1)
          : currentDate.getMonth() + 1)

      const date = new Date(currentDate.getTime())
      date.setMonth(date.getMonth() - 2) // 将日期设置为前2个月
      const startMonth =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1)
      this.getMonthlyreportdata(startMonth, endMonth)
      this.$refs.ControlView.pagesDate({ startMonth, endMonth })
    },
    // 请求数据
    getMonthlyreportdata(startMonth, endMonth) {
      console.log(startMonth, endMonth)
      getMonthlyreport({ startMonth: startMonth, endMonth: endMonth })
        .then((res) => {
          this.tableData = res.resultSet
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 请求数据
    getDateSelect(e) {
      this.getMonthlyreportdata(e.startMonth, e.endMonth)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
