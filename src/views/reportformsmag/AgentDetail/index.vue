<template>
  <!-- 下级代理明细 -->
  <el-card>
    <Control ref="ControlView" @SelectDate="HandelSelectDate" @Refresh="HandelRefresh" @query="Handelquery" />
    <Table ref="TableView" :table-data="tableData" :result-set="resultSet" />
    <Pagination :total="total" @PageChange="getData" @PageSizeChange="HandelPagesChange" />
  </el-card>
</template>
<script>
import { getaAentDetailPages } from '../../../api/reportforms/reportforms'
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
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      // 页数
      PagesSize: 20,
      name: '',
      // 开始时间
      startDate: '',
      // 结束时间
      endDate: '',
      resultSet:{},
    }
  },
  mounted() {

  },
  methods: {
    // 时间选择
    HandelSelectDate(data) {
      this.startDate = data.startDate
      this.endDate = data.endDate
      // 请求数据
      this.getData(1)
    },
    // 请求数据
    getData(index = 1) {
      this.pageNo = index
      getaAentDetailPages({ pageNo: index, pageSize: this.PagesSize, name: this.name,startDate:this.startDate,endDate:this.endDate }).then(res => {
        this.tableData = res.resultSet.date
        this.resultSet = res.resultSet
        this.total = +res.resultSet.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 改变页数
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getData(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      getaAentDetailPages({ pageNo: this.pageNo, pageSize: this.PagesSize, name: this.name,startDate:this.startDate,endDate:this.endDate }).then(res => {
        this.tableData = res.resultSet.date
        this.resultSet = res.resultSet
        this.total = +res.resultSet.total
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
    // 查询
    Handelquery(e) {
      this.name = e.name
      this.getData(this.pageNo)
    },
  }
}
</script>
