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
        <!-- <el-table-column prop="nickeName" label="昵称" width="" /> -->
        <el-table-column prop="userName" :label="$t('username')" width="" />
        <!-- <el-table-column prop="parentMemberId" label="上级会员ID" width="" /> -->
        <el-table-column prop="realName" :label="$t('Realname')" width="" />
        <el-table-column prop="" :label="$t('state')" width="">
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.status)">
              {{ scope.row.status | typeF }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="telPhone" :label="$t('cellphonenumber')" width="" />
        <el-table-column :label="$t('账号来源')" width="" >
          <template slot-scope="scope">
            {{  typeSource(scope.row.fromTo) }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
          <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="friendNum" :label="$t('Numberoffriends')" width="" />
        <!-- <el-table-column prop="plugUrl" :label="$t('plugUrl')" width="" /> -->
        <!-- <el-table-column prop="gammerBlanace" :label="$t('Totalbalanceofgamemerchants')" width="" /> -->
      </el-table>
    </el-card>

    <!-- 分页 -->
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getFriends" />
  </el-card>
</template>
<script>
import { MemberFriends } from '@/api/account/member'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
export default {
  components: {
    Pagination
  },
  filters: {
    typeF(value) {
      switch (value) {
        case 0:
          return '冻结'
        case 1:
          return '正常'
      }
    }
  },
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
      PagesSize: 20,
      // 会员id
      memberId: ''
    }
  },
  methods: {
    //会员类型来源
    typeSource(value){
      switch (value) {
        case 0:
          return '正常注册'
        case 1:
          return '推荐码注册'
        case 2:
          return '刮刮乐分享注册'
        case 3:
          return '红包分享注册'
        case 4:
          return 'gw彩票分享注册'
        case 5:
          return '直接开户'
        case 6:
          return '链接开户'
      }
    },
    getTagType(value) {
      if (value === 1) {
        return "success";
      } else if (value === 0) {
        return ""; // 默认颜色
      } else {
        return "info";
      }
    },

    // 获取分页数据
    getFriends(index) {
      this.pageNo = index
      MemberFriends({ pageNo: index, pageSize: this.PagesSize, memberId: this.memberId }).then(res => {
        console.log(res)
        this.tableData = res.resultSet.data
        this.total = res.resultSet.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 刷新
    HandelRefresh() {
      this.btnIcoType = false
      this.loading = true
      MemberFriends({ pageNo: this.pageNo, pageSize: this.PagesSize, memberId: this.memberId }).then(res => {
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
    // 改变页数
    HandelPagesChange(e) {
      this.PagesSize = e
      this.getFriends(this.pageNo)
    }
  }
}
</script>
  <style lang="scss" scoped>

  </style>

