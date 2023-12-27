<template>
  <el-card>
    <Control ref="ControlView" @SelectDate="getDateSelect"/>
    <Table :tableData="tableData"/>
  </el-card>
</template>
<script>
import { getdaily } from '@/api/home/daily'
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
    // 查询数据 初始化数据
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
      console.log(startDate, endDate)
      this.$refs.ControlView.pagesDate({ startDate, endDate })
    },
    // 请求数据
    getdailydata(startDate, endDate) {
      getdaily({ startDate, endDate })
        .then((res) => {
          console.log(res.resultSet)
          this.tableData = res.resultSet
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 请求数据
    getDateSelect(e) {
      this.getdailydata(e.startDate, e.endDate)
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
