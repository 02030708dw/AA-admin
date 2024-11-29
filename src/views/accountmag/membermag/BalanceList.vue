<!-- 会员资金流水 -->
<template>
  <el-card shadow="never" style="border: 0px;">
    <!-- 顶部查询栏 -->
    <el-row style="margin-bottom: 10px;">
      <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh') }}</el-button>
      <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
    </el-row>
    <!-- 表格 -->
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="tableData"
        :border="true"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="gamerName" label="GameMerchantName" width="" />
        <el-table-column prop="balance" :label="$t('balance')" width="" />
        <!-- <el-table-column prop="plugUrl" label="推广链接" width="" />
        <el-table-column prop="realName" label="真实姓名" width="" />
        <el-table-column prop="" label="状态" width="">
          <template slot-scope="scope">
            {{ scope.row.status | typeF }}
          </template>
        </el-table-column>
        <el-table-column prop="telPhone" label="手机号" width="" />
        <el-table-column prop="userName" label="用户名" width="" />
        <el-table-column prop="friendNum" label="好友人数" width="" />
        <el-table-column prop="gammerBlanace" label="在游戏商总余额" width="" /> -->
      </el-table>
    </el-card>

    <!-- 分页 -->
    <!-- <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getMemberBalanceList" /> -->
  </el-card>
</template>
<script>
import { MemberBalanceList,MemberRefreshBalance } from '@/api/account/member'
// 分页
// import Pagination from '@/components/Pagination/Pagination.vue'
export default {
//   components: {
//     Pagination
//   },
//   filters: {
//     typeF(value) {
//       switch (value) {
//         case 0:
//           return '冻结'
//         case 1:
//           return '正常'
//       }
//     }
//   },
  data() {
    return {
      loading: false,
      tableData: [],
      btnIcoType: true,
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      // 页数
      PagesSize: 10,
      // 会员id
      memberId: ''
    }
  },
  methods: {
    // 获取分页数据
    getMemberBalanceList(index) {
      this.pageNo = index
      MemberBalanceList({ memberId: this.memberId }).then(res => {
        console.log(res)
        this.tableData = res.resultSet
        this.total = res.resultSet.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 刷新
    HandelRefresh() {
      this.btnIcoType = false
      this.loading = true
      MemberRefreshBalance({ memberId: this.memberId }).then(res => {
        this.tableData = res.resultSet
        this.total = res.resultSet.total
        setTimeout(() => {
          this.btnIcoType = true
          this.loading = false
          this.$message({
            message: '刷新刷新!',
            type: 'success'
          })
        }, 1000)
      }).catch(err => {
        setTimeout(() => {
          this.btnIcoType = true
          this.loading = false
          this.$message.error('刷新失败!')
        }, 1000)

        console.log(err)
      })
      return
      MemberBalanceList({ memberId: this.memberId }).then(res => {
        console.log(res)
        this.tableData = res.resultSet
        this.total = res.resultSet.total
        setTimeout(() => {
          this.btnIcoType = true
          this.loading = false
          this.$message({
            message: '刷新刷新!',
            type: 'success'
          })
        }, 1000)
      }).catch(err => {
        setTimeout(() => {
          this.btnIcoType = true
          this.loading = false
          this.$message.error('刷新失败!')
        }, 1000)

        console.log(err)
      })
    }
    // 改变页数
    // HandelPagesChange(e) {
    //   this.PagesSize = e
    //   this.getMemberBalanceList(this.pageNo)
    // }
  }
}
</script>
    <style lang="scss" scoped>

    </style>

