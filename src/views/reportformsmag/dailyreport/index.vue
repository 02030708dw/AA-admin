<template>
  <el-card>
    <Control ref="ControlView" @Refresh="HandelRefresh" @SelectDate="getDateSelect" />
    <Table ref="TableView" :table-data="tableData" />
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
      tableData: [],
      startDate: '',
      endDate: ''
    }
  },
  mounted() {
    this.getDateData()
  },
  methods: {
    // 刷新事件
    HandelRefresh() {
      console.log(this.startDate, this.endDate)
      this.$refs.TableView.HandelLoading(true)
      getdaily({ startDate: this.startDate, endDate: this.endDate })
        .then((res) => {
          this.tableData = res.resultSet
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message({ message: '刷新成功!', type: 'success' })
        })
        .catch((err) => {
          console.log(err)
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false)
            this.$refs.ControlView.HandelBtnStatus()
          }, 1000)
          this.$message.error('刷新失败!')
        })
    },
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
      this.startDate = startDate
      this.endDate = endDate
      // 请求数据
      this.getdailydata(startDate, endDate)
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
      this.startDate = e.startDate
      this.endDate = e.endDate
      this.getdailydata(e.startDate, e.endDate)
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
