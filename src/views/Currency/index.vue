<template>
  <el-card>
    <Control ref="ControlView" @CurrencyAdd="getCurrencyAddShow" @query="getquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" @delete="getDel" @eitor="getCurrencyEditShow" />
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getCurrencydata"
    />
    <AddCurrency ref="AddCurrency" @confirm="getCurrencyAdd" />
    <EditCurrency ref="EditCurrency" @confirm="getCurrencyEdit" />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
// 顶部操作
import Control from './Control'
// 分页组件
import Pagination from '@/components/Pagination/Pagination.vue'
// 添加币种弹窗
import AddCurrency from './CurrencyAdd.vue'
// 编辑币种弹窗
import EditCurrency from './CurrencyEdit.vue'
import { CurrencytPage, CurrencyAdd, CurrencyDel, CurrencyEdit } from '../../api/Currency/Currency'
export default {
  components: { Table, Control, Pagination, AddCurrency, EditCurrency },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      // 币种
      currency: '',
      // 状态
      status: null,
      PagesSize: 20
    }
  },
  created() {
    this.getCurrencydata(this.pageNo)
  },
  methods: {
    HandelPagesChange(e) {
      this.PagesSize = e
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      CurrencytPage({ pageNo: this.pageNo, pageSize: this.PagesSize, currency: this.currency, status: this.status })
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
    // 请求分页列表
    getCurrencydata(index) {
      this.pageNo = index
      CurrencytPage({ pageNo: index, pageSize: this.PagesSize, currency: this.currency, status: this.status }).then(res => {
        this.total = res.resultSet.total
        this.tableData = res.resultSet.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 条件查询
    getquery(e) {
      this.currency = e.currency
      this.status = e.status
      this.getCurrencydata(1)
    },
    // 重置查询
    getresetting() {
      this.currency = ''
      this.status = null
      this.getCurrencydata(1)
    },
    // 删除币种
    getDel(id) {
      CurrencyDel(id).then(res => {
        this.getCurrencydata(this.pageNo)
        this.$store.dispatch('user/gamerSet')
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('删除失败!')
      })
    },
    // 显示添加弹窗
    getCurrencyAddShow() {
      this.$refs.AddCurrency.getAddstatus()
    },
    // 添加币种
    getCurrencyAdd(e) {
      CurrencyAdd(e).then(res => {
        // 刷新数据
        this.getCurrencydata(this.pageNo)
        this.$store.dispatch('user/gamerSet')
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('添加失败!')
      })
    },
    // 显示编辑弹窗
    getCurrencyEditShow(e) {
      this.$refs.EditCurrency.getEditstatus(e)
    },
    // 编辑币种
    getCurrencyEdit(e) {
      CurrencyEdit({ id: e.id, status: e.status, remark: e.remark, currency: e.currency }).then(res => {
        this.getCurrencydata(this.pageNo)
        this.$store.dispatch('user/gamerSet')
        this.$message({
          message: '编辑成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('编辑失败!')
      })
    }

  }
}
</script>

<style lang="scss">
</style>
