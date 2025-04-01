<!-- 会员资金流水 -->
<template>
  <el-card shadow="never" style="border: 0px;">
    <!-- 顶部查询栏 -->
    <el-row style="margin-bottom: 10px;">
      <el-select v-model="type" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
        <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="$t(item.title)" />
      </el-select>
      <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
      <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
      <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
        }}</el-button>
      <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
    </el-row>
    <!-- 表格 -->
    <el-card shadow="never">
      <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column prop="memberWalletId" label="会员钱包ID" width="" /> -->
        <el-table-column prop="changeAmout" :label="$t('Changeamount')" width="" />
        <el-table-column prop="beforeBalance" :label="$t('Balancebeforechange')" width="" />
        <el-table-column prop="afterBalance" :label="$t('Balanceafterchange')" width="" />
        <el-table-column prop="" :label="$t('Changetype')" width="">
          <template slot-scope="scope">
            {{ typeF(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('describe')" width="" />
        <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
          <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" :label="$t('Updatedby')" width="" />
      </el-table>
    </el-card>

    <!-- 分页 -->
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange"
      @PageChange="getMemberFlowingWater" />
  </el-card>
</template>
<script>
import { MemberFlowingWater } from '@/api/account/member'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      statusType: [
        { title: '提现成功', index: 1 },
        { title: '充值', index: 2 },
        { title: '转出到游戏商', index: 3 },
        { title: '从游戏商转入', index: 4 },
        { title: '下级会员投注返点', index: 5 },
        { title: '平台加扣款', index: 6 },
        { title: '冻结金额', index: 7 },
        { title: '解冻金额', index: 8 },
        { title: '活动金额', index: 9 },
        { title: '提现取消', index: 10 },
        { title: '提现驳回', index: 11 },
        { title: '提现发起', index: 12 },
      ],
      loading: false,
      tableData: [],
      btnIcoType: true,
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      // 页数
      PagesSize: 20,
      // 会员id
      memberId: '',
      // 类型
      type: null
    }
  },
  methods: {
    // 获取分页数据
    getMemberFlowingWater(index) {
      this.pageNo = index
      MemberFlowingWater({ pageNo: index, pageSize: this.PagesSize, memberId: this.memberId, type: this.type }).then(res => {
        console.log(res)
        this.tableData = res.resultSet.data
        this.total = res.resultSet.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询
    getquery() {
      this.getMemberFlowingWater(1)
    },
    // 刷新
    HandelRefresh() {
      this.btnIcoType = false
      this.loading = true
      MemberFlowingWater({ pageNo: this.pageNo, pageSize: this.PagesSize, memberId: this.memberId, type: this.type }).then(res => {
        console.log(res)
        this.tableData = res.resultSet.data
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
    },
    // 重置
    getresetting() {
      this.type = null
      this.getMemberFlowingWater(1)
    },
    // 改变页数
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getMemberFlowingWater(this.pageNo)
    },
    typeF(value) {
      switch (value) {
        case 1:
          return this.$t('提现成功')
        case 2:
          return this.$t('充值')
        case 3:
          return this.$t('转出到游戏商')
        case 4:
          return this.$t('从游戏商转入')
        case 5:
          return this.$t('下级会员投注返点')
        case 6:
          return this.$t('平台加扣款')
        case 7:
          return this.$t('冻结金额')
        case 8:
          return this.$t('解冻金额')
        case 9:
          return this.$t('活动金额')
        case 10:
          return this.$t('提现取消')
        case 11:
          return this.$t('提现驳回')
        case 12:
          return this.$t('提现发起')
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
