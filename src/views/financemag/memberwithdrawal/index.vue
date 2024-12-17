<template>
  <el-card>
    <!-- @Refresh="HandelRefresh" -->
    <Control ref="ControlView" @query="getquery" @resetting="getresetting" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" @info="Handelinfo"  @pay="Handelpay" @operate="Handeloperate" />
    <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getMemWitdata" />
    <InfoView ref="infoview" />
    <PayForAnother ref="PayForAnother" @pay="HandelpayConfirmPay"/>
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Control from './Control.vue'
import InfoView from './InfoView.vue'
import PayForAnother from './PayForAnother.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
import { MemberwithdrawalPage, PayFor } from '@/api/finance/memberwithdrawal'
export default {
  components: {
    Table,
    Pagination,
    Control,
    InfoView,
    PayForAnother
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      aduitStatus: null,
      orderNo: '',
      cashChannelId: '',
      userName:'',
      PagesSize: 20
    }
  },

  computed: {
    A_T_Recharge() {
      return this.$store.state.autorefresh.A_T_Recharge
    }
  },
  watch: {
    A_T_Recharge: {
      handler() {
        const _that = this
        const time = setInterval(() => {
          if (this.$store.state.autorefresh.A_T_Recharge) {
            MemberwithdrawalPage({ pageNo: _that.pageNo, pageSize: this.PagesSize, aduitStatus: _that.aduitStatus, orderNo: _that.orderNo, cashChannelId: _that.cashChannelId })
              .then((res) => {
                _that.total = res.resultSet.total
                _that.tableData = res.resultSet.data
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            clearInterval(time)
          }
        }, 3000)
      },
      immediate: true
    }
  },
  created() {
    this.getMemWitdata(1)
  },
  methods: {
    Handeloperate() {
      this.getMemWitdata(this.pageNo)
    },
    Handelinfo(e) {
      this.$refs.infoview.getAddstatus(e)
    },
    Handelpay(e) {
      this.$refs.PayForAnother.getAddstatus(e)
    },
    HandelpayConfirmPay(e){
      console.log(e,'--------e');
      PayFor(e).then(res=>{
        
        this.HandelRefresh()
      })
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      MemberwithdrawalPage({ pageNo: this.pageNo, pageSize: 10, aduitStatus: this.aduitStatus, orderNo: this.orderNo, cashChannelId: this.cashChannelId, userName: this.userName})
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
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getMemWitdata(this.pageNo)
    },
    getMemWitdata(index) {
      // 记录当前页码
      this.pageNo = index
      MemberwithdrawalPage({ pageNo: index, pageSize: this.PagesSize, aduitStatus: this.aduitStatus, orderNo: this.orderNo, cashChannelId: this.cashChannelId, userName: this.userName })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 条件查询
    getquery(e) {
      this.aduitStatus = e.aduitStatus
      this.orderNo = e.orderNo
      this.cashChannelId = e.cashChannelId
      this.userName = e.userName
      this.getMemWitdata(1)
    },
    // 恢复默认查询
    getresetting() {
      this.aduitStatus = null
      this.orderNo = ''
      this.cashChannelId = ''
      this.userName = ''
      this.getMemWitdata(1)
    }
  }
}
</script>

<style>
</style>
