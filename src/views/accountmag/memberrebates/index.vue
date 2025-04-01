<template>
  <el-card>
    <Control ref="ControlView" :member-data="MemberData" :gamer-id-data="GamerIdData" @Add="HandelAdd" @resetting="HandelResetting" @Refresh="HandelRefresh" @query="HandelQuery" />
    <Table ref="TableView" :table-data="tableData" @del="Handeldel" @Eitor="HandelEitor" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="GetMemBerrebatesPages" />
    <AddMem ref="addmemberrebates" :member-data="MemberData" :gamer-id-data="GamerIdData" @confirm="HandelConfirm" />
    <EitorMem ref="eitorMemberrebates" :member-data="MemberData" :gamer-id-data="GamerIdData" @confirm="Eitorconfirm" />
  </el-card>
</template>
<script >
// 组件
import Control from './Control.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Table from './Table.vue'
import AddMem from './AddMemberrebates.vue'
import EitorMem from './EitorMemberrebates.vue'
// 接口
import { MemberPage } from '@/api/account/member'
import { gamerPage } from '@/api/gamer/gamer'
import { MemBerrebatesPages, MemBerrebatesAdd, MemBerrebatesDel, MemBerrebatesUpda } from '../../../api/account/memberrebates'
export default {
  components: { Pagination, Control, Table, AddMem, EitorMem },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      // 表格数据
      tableData: [],
      // 游戏商id
      gamerId: '',
      // 会员id
      memberId: '',
      // 页数
      PagesSize: 20,
      // 会员id
      MemberData: [],
      // 游戏商id
      GamerIdData: []
    }
  },
  created() {
    this.GetMemBerrebatesPages()
    this.GetMemberPage()
    this.GetGamerPages()
  },
  methods: {
    Eitorconfirm(e) {
      MemBerrebatesUpda(e).then(res => {
        this.$message({ message: '编辑成功!', type: 'success' })
        this.GetMemBerrebatesPages(this.pageNo)
      }).catch(() => {
        this.$message.error('编辑失败!')
      })
    },
    HandelEitor(e) {
      this.$refs.eitorMemberrebates.getAddstatus(e)
      console.log(e)
    },
    HandelConfirm(e) {
      MemBerrebatesAdd(e).then(res => {
        this.$message({ message: '添加成功!', type: 'success' })
        this.GetMemBerrebatesPages(this.pageNo)
      }).catch(() => {
        this.$message.error('添加失败!')
      })
    },
    // 添加事件
    HandelAdd() {
      this.$refs.addmemberrebates.getAddstatus()
    },
    // 删除
    Handeldel(id) {
      MemBerrebatesDel({ Id: id }).then(res => {
        this.$message({ message: '删除成功!', type: 'success' })
        this.GetMemBerrebatesPages(this.pageNo)
      }).catch(() => {
        this.$message.error('删除失败!')
      })
    },
    // 查询
    HandelQuery(e) {
      console.log(e)
      this.memberId = e.MemberId
      this.gamerId = e.GamerId
      this.GetMemBerrebatesPages(this.pageNo)
    },
    // 重置
    HandelResetting() {
      this.memberId = ''
      this.gamerId = ''
      this.GetMemBerrebatesPages(this.pageNo)
    },
    // 刷新
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      MemBerrebatesPages({ pageNo: this.pageNo, pageSize: this.PagesSize, gamerId: this.gamerId, memberId: this.memberId }).then(res => {
        this.tableData = res.resultSet.data
        this.total = res.resultSet.total
        setTimeout(() => {
          this.$refs.ControlView.HandelBtnStatus()
          this.$refs.TableView.HandelLoading(false)
        }, 1000)
        this.$message({ message: '刷新成功!', type: 'success' })
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.$refs.TableView.HandelLoading(false)
          this.$refs.ControlView.HandelBtnStatus()
        })
        this.$message.error('刷新失败!')
      })
    },
    // 改变页数
    HandelPagesChange(e) {
      this.PagesSize = e
      this.GetMemBerrebatesPages(this.pageNo)
    },
    // 请求分页数据
    GetMemBerrebatesPages(index = 1) {
      this.pageNo = index
      MemBerrebatesPages({ pageNo: index, pageSize: this.PagesSize, gamerId: this.gamerId, memberId: this.memberId }).then(res => {
        this.tableData = res.resultSet.data
        this.total = res.resultSet.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取游戏商id
    GetGamerPages() {
      this.GamerIdData = []
      // gamerPage({ pageNo: 1, pageSize: 1000000 }).then(res => {
        let res = this.$store.state.user.gamer
        for (let i = 0; i < res.length; i++) {
          this.GamerIdData.push({
            title: res[i].name,
            index: res[i].id
          })
        }
      // }).catch(err => {
      //   console.log(err)
      // })
      console.log('游戏商信息', this.GamerIdData)
    },
    // 获取会员id
    GetMemberPage() {
      this.MemberData = []
      MemberPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.MemberData.push({
            title: res.resultSet.data[i].userName,
            index: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

