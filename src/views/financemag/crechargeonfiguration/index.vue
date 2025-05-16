<template>
  <el-card>
    <Control
      ref="ControlView"
      :channelid-list="channelIdList"
      @RechargelAdd="getRechargeAddShow"
      @query="getRechargeQuery"
      @clear="getRechargedata"
      @queryT="getqueryT"
      @resetting="getresetting"
      @Refresh="HandelRefresh"
    />
    <Table
      ref="TableView"
      :table-data="tableData"
      @delete="getRechargeDel"
      @eitor="getRechargeEitorShow"
      @updateStatus="getRechargeUdateStatus"
    />
    <Pagination  :pageNo="pageNo"
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getRechargedata"
    />
    <rechargeAdd
      :CurrencytPageData="CurrencytPageData"
      :thirdDropDownList="thirdDropDownList"
      ref="rechargeAdd"
      :channelid-list="channelIdList"
      @confirm="getRechargeAdd"
    />
    <rechargeEitor
      :CurrencytPageData="CurrencytPageData"
      :thirdDropDownList="thirdDropDownList"
      ref="rechargeEitor"
      :channelid-list="channelIdList"
      @confirm="getRechargeEitor"
    />
  </el-card>
</template>

<script>
// 表格
import Table from './Table.vue'
// 顶部操作
import Control from './Control'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
// 添加配置
import rechargeAdd from './RechargeAdd.vue'
import rechargeEitor from './RechargeEitor.vue'
import { channelPage } from '../../../api/finance/rechargechannel'

// 获取币种分页数据
import { CurrencytPage } from '../../../api/Currency/Currency'
//三方充值配置下拉框列表
import { thirdDropDown } from '@/api/thirdpartypayment/thirdpartypayment'
// 接口
import {
  RechargePage,
  RechargeDel,
  RechargeAdd,
  RechargeQuery,
  RechargeEdit,
  RechargeUdateStatus
} from '@/api/finance/rechargeconfiguration'
export default {
  components: {
    Table,
    Control,
    Pagination,
    rechargeAdd,
    rechargeEitor
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      type: null,
      channelId: '',
      PagesSize: 20,
      // 渠道id
      channelIdList: [],
      CurrencytPageData:[],
      //三方充值配置下拉框列表
      thirdDropDownList:[],
    }
  },
  created() {
    this.getRechargedata(1)
    this.getchannelId()
    this.getCurrencytPage()
    this.getThirdDropDown()
  },
  methods: {
    //三方充值配置下拉框列表
    getThirdDropDown(){
      thirdDropDown().then(res=>{
        this.thirdDropDownList = res.resultSet
      })
    },
    // 获取币种
    getCurrencytPage() {
      let res = this.$store.state.user.currency
      this.CurrencytPageData = []
        for(let i = 0; i < res.length ;i++){
          this.CurrencytPageData.push({
            item:res[i].currency,
            index:res[i].id
          })
        }
    },
    // 获取渠道id
    getchannelId() {
      channelPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        this.channelIdList = []
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.channelIdList.push({
            title: res.resultSet.data[i].name,
            index: res.resultSet.data[i].id,
            type: res.resultSet.data[i].type
          })
        }
      })
    },
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getRechargedata(this.pageNo)
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      RechargePage({ pageNo: this.pageNo, pageSize: this.PagesSize, channelId: this.channelId, type: this.type })
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
    getRechargedata(index = 1) {
      // 记录当前页码
      this.pageNo = index
      RechargePage({ pageNo: index, pageSize: this.PagesSize, channelId: this.channelId, type: this.type })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getqueryT(e) {
      this.type = e.type
      this.channelId = e.channelId
      this.getRechargedata(1)
    },
    // 重置
    getresetting() {
      this.type = null
      this.channelId = ''
      this.getRechargedata(1)
    },
    // 显示添加弹窗
    getRechargeAddShow() {
      this.$refs.rechargeAdd.getAddstatus()
    },
    // 添加
    getRechargeAdd(data) {
      RechargeAdd(data)
        .then((res) => {
          this.$message({ message: '添加成功!', type: 'success' })
          this.$refs.rechargeAdd.dialogVisible = false
          this.getRechargedata(this.pageNo)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询
    getRechargeQuery(channelId) {
      console.log(channelId)
      RechargeQuery(channelId)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除
    getRechargeDel(id) {
      RechargeDel(id)
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除失败!')
        })
    },
    // 显示编辑
    getRechargeEitorShow(data) {
      this.$refs.rechargeEitor.getAddstatus(data)
    },
    // 编辑
    getRechargeEitor(data) {
      RechargeEdit({
        account: data.account,
        alipay: data.alipay,
        bankCardNo: data.bankCardNo,
        bankName: data.bankName,
        channelId: data.channelId,
        coin: data.coin,
        id: data.id,
        status: data.status,
        type: data.type,
        wechat: data.wechat,
        icon:data.icon,
        currency:data.currency,
        name: data.name,
        bankCode:data.bankCode,
        threePayId:data.threePayId,
        maxMoney:data.maxMoney,
        minMoney:data.minMoney,
        sort: data.sort,
      })
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('编辑失败!')
        })
    },
    // 修改状态
    getRechargeUdateStatus(data) {
      RechargeUdateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getRechargedata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('修改失败!')
        })
    }
  }
}
</script>

<style>
</style>
