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
      <el-table-column prop="memberId" :label="$t('MemberID')" width="" />
      <el-table-column prop="amount" :label="$t('amountofmoney')" width="" />
      <el-table-column prop="channel" :label="$t('RechargeChannels')" width="" />
      <el-table-column prop="cardNo" :label="$t('PaymentCardNumber')" width="" />
      <el-table-column prop="bankName" :label="$t('BankName')" width="" />
      <el-table-column prop="payee" :label="$t('payee')" width="" />
      <el-table-column prop="" :label="$t('Reviewstatus')" width="">
        <template slot-scope="scope">
          <div> {{ scope.row.aduitStatus | typeF }} </div>
        </template>
      </el-table-column>
      <el-table-column prop="aduitTime" :label="$t('Audittime')" width="" >
        <template slot-scope="scope">
          <div> {{ scope.row.aduitTime | timeF }} </div>
        </template>
      </el-table-column>
      <el-table-column prop="rejection" :label="$t('ReasonForRejection')" width="" />
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" @click="HandelOption(scope.row.id,1)">{{ $t('passthrough') }}</el-button>
          <el-button type="text" style="color:red;" @click="HandelOption(scope.row.id,2)">{{ $t('reject') }}</el-button>
          <el-button type="text" style="color: black;" @click="HandelOption(scope.row.id,3)"> {{ $t('cancellation') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script >
import { formatDate } from '../../../utils/formattime'
export default {
  name: 'Table',
  filters: {
    typeF(value) {
      switch (value) {
        case 0:
          return '待审核'
        case 1:
          return '审核通过'
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
    return {
      loading: false
    }
  },
  methods: {
    // 操作
    HandelOption(id, type) {
      this.$emit('option', { id: id, auditStatus: type })
    },
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
