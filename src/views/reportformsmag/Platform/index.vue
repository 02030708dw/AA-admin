<template>
  <!-- 代理报表 -->
  <el-card>
    <Control ref="ControlView" @getExcel="getExcel" @SelectDate="HandelSelectDate" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" />
    <Pagination :pageNo="pageNo" :total="total" @PageChange="getData" @PageSizeChange="HandelPagesChange" />
  </el-card>
</template>
<script>
import { getPlatformPages, reportOutput } from '../../../api/reportforms/reportforms'
import Table from './Table.vue'
import Control from './Control.vue'
// 分页组件
import Pagination from '@/components/Pagination/Pagination.vue'
export default {
  components: {
    Pagination,
    Control,
    Table
  },
  data() {
    return {
      tableData: [],
      // 开始时间
      startDate: '',
      // 结束时间
      endDate: '',
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      // 页数
      PagesSize: 20
    }
  },
  mounted() {
    this.HandelInitializationTime()
  },
  methods: {
    // 初始化时间
    HandelInitializationTime() {
      const currentDate = new Date()
      const endDate =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() >= 9 ? currentDate.getMonth() + 1 : '0' + (currentDate.getMonth() + 1)) +
        '-' +
        (currentDate.getDate() > 9 ? currentDate.getDate() : '0' + currentDate.getDate())

      const date = new Date(currentDate.getTime()) // 使用相同的时间，但改变日期
      date.setDate(date.getDate() - 30) // 将日期设置为前6天
      const startDate =
        date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
      this.startDate = startDate
      this.endDate = endDate
      // 请求数据
      this.getData(1)
      this.$refs.ControlView.pagesDate({ startDate, endDate })
    },
    // 请求数据
    getData(index = 1) {
      this.pageNo = index
      getPlatformPages({ pageNo: index, pageSize: this.PagesSize, endDay: this.endDate, startDay: this.startDate }).then(res => {
        this.tableData = res.resultSet.data
        this.total = res.resultSet.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 改变页数
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getData(this.pageNo)
    },
    // 时间选择
    HandelSelectDate(data) {
      this.startDate = data.startDate
      this.endDate = data.endDate
      // 请求数据
      this.getData(1)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      getPlatformPages({ pageNo: this.pageNo, pageSize: this.PagesSize, endDay: this.endDate, startDay: this.startDate }).then(res => {
        this.tableData = res.resultSet.data
        this.total = res.resultSet.total
        setTimeout(() => {
          this.$refs.ControlView.HandelBtnStatus()
          this.$refs.TableView.HandelLoading(false)
        }, 1000)
        this.$message({ message: '刷新成功!', type: 'success' })
      }).catch(() => {
        setTimeout(() => {
          this.$refs.TableView.HandelLoading(false)
          this.$refs.ControlView.HandelBtnStatus()
        })
        this.$message.error('刷新失败!')
      })
    },
    // 导出excel
    async getExcel() {
      try {
        this.$refs.TableView.HandelLoading(true);
        const res = await reportOutput({
          pageNo: this.pageNo, pageSize: this.PagesSize, endDay: this.endDate, startDay: this.startDate
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Platform.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$refs.TableView.HandelLoading(false);
        this.$refs.ControlView.HandelExcelStatus();
      } catch (error) {
        this.$message({
          message: '导出Excel失败',
          type: "error",
          duration: 5 * 1000,
        });
        this.$refs.TableView.HandelLoading(false);
        this.$refs.ControlView.HandelExcelStatus();
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
