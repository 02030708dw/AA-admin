<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @examine="getExamine" />
    <Pagination :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsExamine ref="ComponentsExamine" @submitted="getdata" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ComponentsExamine from './ComponentsExamine.vue'
import { ServicePage } from '@/api/agent/websitePromotion'

export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsExamine,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      // 搜索参数
      agentName: '',
      name: '',
      domainName: '',
      adType: null,
      domainStatus: null,
    }
  },
  created() {
    this.getdata(1)
  },
  methods: {
    getExamine(id) {
      this.$refs.ComponentsExamine.open(id)
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      ServicePage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        agentName: this.agentName,
        name: this.name,
        domainName: this.domainName,
        adType: this.adType,
        domainStatus: this.domainStatus,
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message({ message: '刷新成功!', type: 'success' })
        })
        .catch(() => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false)
            this.$refs.ControlView.HandelBtnStatus()
          })
          this.$message.error('刷新失败!')
        })
    },
    // 分页获取数据
    getdata(index = 1) {
      this.pageNo = index
      ServicePage({
        pageNo: index,
        pageSize: this.PagesSize,
        agentName: this.agentName,
        name: this.name,
        domainName: this.domainName,
        adType: this.adType,
        domainStatus: this.domainStatus,
      })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询事件
    getquery(e) {
      this.agentName = e.agentName
      this.name = e.name
      this.domainName = e.domainName
      this.adType = e.adType
      this.domainStatus = e.domainStatus
      this.getdata(1)
    },
    // 重置事件
    getresetting() {
      this.agentName = ''
      this.name = ''
      this.domainName = ''
      this.adType = null
      this.domainStatus = null
      this.getdata(1)
    },
  },
}
</script>

<style lang="scss"></style>
