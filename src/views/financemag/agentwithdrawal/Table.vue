<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column
        prop="cashChannelId"
        :label="$t('WithdrawalchannelID')"
        width="280"
      />
      <el-table-column
        prop="bankName"
        :label="$t('Nameofwithdrawalbank')"
        width="280"
      />
      <el-table-column
        prop="bankCardNo"
        :label="$t('Withdrawalbankcardnumber')"
        width="200"
      />
      <el-table-column prop="alipay" :label="$t('Alipayaccount')" width="200" />
      <el-table-column prop="wechat" :label="$t('WeChataccount')" width="200" />
      <el-table-column
        prop="coin"
        :label="$t('Virtualcoinaddress')"
        width="200"
      />
      <el-table-column prop="amount" :label="$t('amountofmoney')" width="200" />
      <el-table-column
        prop=""
        :label="$t('Reviewstatus')"
        aduit-time
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.aduitStatus | FaduitStatus }}</span>
        </template></el-table-column>
      <el-table-column prop="aduitTime" :label="$t('Audittime')" width="200" >
        <template slot-scope="scope">
          <span>{{ scope.row.aduitTime | timeF }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rejection"
        :label="$t('Reasonforrejection')"
        width="200"
      />
    </el-table>
  </el-card>
</template>

<script>
import { formatDate } from '../../../utils/formattime'
export default {
  name: 'Table',
  filters: {
    FaduitStatus(value) {
      switch (value) {
        case 0:
          return '待审核'
        case 1:
          return '待审核'
        case 2:
          return '驳回'
        case 3:
          return '已取消'
      }
    },
    timeF(value) {
      return formatDate(value)
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return { loading: false }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 删除事件
    getroledel(Id) {
      this.$emit('delete', Id)
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit('eitor', item)
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, id: Id })
    }
  }
}
</script>

      <style>
</style>
