<template>
  <el-row style="padding-bottom: 10px">
    <!-- <el-button type="primary" @click="getroleAdd()">新增</el-button> -->
    <!-- 条件筛选框 -->

    <el-select
      v-model="aduitStatus"
      :placeholder="$t('Reviewstatus')"
      style="width: 200px"
    >
      <el-option
        v-for="(item, index) in noticetype"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>

    <el-input
      v-model="memberId"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('MemberID')"
    />
    <el-input
      v-model="cashChannelId"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('WithdrawalchannelID')"
    />
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getquery()"
    >查询</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>刷新</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      aduitStatus: null, // 审核状态
      memberId: '', // 会员id
      cashChannelId: '', // 提现渠道id
      noticetype: [
        { title: '待审核', index: 0 },
        { title: '审核通过', index: 1 },
        { title: '驳回', index: 2 },
        { title: '已取消', index: 3 }
      ],
      btnIcoType: true
    }
  },
  methods: {
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    getquery() {
      this.$emit('query', {
        aduitStatus: this.aduitStatus,
        memberId: this.memberId,
        cashChannelId: this.cashChannelId
      })
    },
    // 恢复默认查找
    getresetting() {
      this.aduitStatus = null
      this.memberId = ''
      this.cashChannelId = ''
      this.$emit('resetting')
    }
  }
}
</script>

  <style scoped lang="scss"></style>

