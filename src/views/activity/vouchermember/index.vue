<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @ControlAdd="getAddShow"
      @Refresh="HandelRefresh" />
    <!-- 表格 -->
    <Table ref="TableView" :table-data="tableData" @EditorShow="getEitorShow" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsAdd ref="ComponentsAdd" :voucherConfigIdList="voucherConfigIdList" @confirm="getAdd" />
    <ComponentsEitor ref="ComponentsEitor" :voucherConfigIdList="voucherConfigIdList" @confirm="getEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control'
import Pagination from '@/components/Pagination/Pagination.vue'
import ComponentsAdd from './ComponentsAdd.vue'
import ComponentsEitor from './ComponentsEitor.vue'
import {
  ServicePage,
  ServiceAdd,
  ServiceDel,
  ServiceEdit
} from '@/api/activity/vouchermember'
import {
  ServicePage as getVoucherConfigIdList
} from '@/api/activity/voucherconfig'
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsAdd,
    ComponentsEitor
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      status: null,
      name: null,//用户名称
      voucherConfigIdList: []
    }
  },
  created() {
    this.getdata(1)
    this.getVipLevelList()
  },
  methods: {
    getTriggerType(v) {
      switch (v) {
        case 1:
          return '注册'
        case 2:
          return '使用优惠券次数'
        case 3:
          return '单笔充值总额'
        case 4:
          return '充值次数'
        case 5:
          return '累计充值'
      }
    },
    // 获取代金券配置ID
    getVipLevelList() {
      this.voucherConfigIdList = []
      getVoucherConfigIdList({ pageNo: 1, pageSize: 1000 }).then(res => {
        const data = res.resultSet.data
        for (let i = 0; i < data.length; i++) {
          this.voucherConfigIdList.push({
            title: data[i].name + '-' + this.getTriggerType(data[i].triggerType) + '-' + data[i].amount + '-' + data[i].minRecharge,
            index: data[i].id
          })
        }
        console.log(this.voucherConfigIdList);

      })
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getdata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      ServicePage({
        pageNo: this.pageNo, pageSize: this.PagesSize, status: this.status, name: this.name
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
    // 请求分页数据
    getdata(index = 1) {
      this.pageNo = index
      ServicePage({ pageNo: index, pageSize: this.PagesSize, status: this.status, name: this.name })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getquery(e) {
      this.status = e.status
      this.name = e.name
      this.getdata(1)
    },
    getresetting() {
      this.status = null
      this.name = null
      this.getdata(1)
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.ComponentsAdd.getAddstatus()
    },
    // 添加
    getAdd(e) {
      ServiceAdd(e)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('添加失败!')
        })
    },
    // 删除
    getDel(id) {
      ServiceDel(id)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('删除失败!')
          console.log(err)
        })
    },
    // 显示编辑弹窗
    getEitorShow(e) {
      this.$refs.ComponentsEitor.getAddstatus(e)
    },
    getEitor(data) {
      ServiceEdit(data)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('编辑失败!')
          console.log(err)
        })
    },
  }
}
</script>

<style lang="scss"></style>
