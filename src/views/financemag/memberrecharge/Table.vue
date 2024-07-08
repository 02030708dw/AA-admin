<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="id" label="ID" width="" />
      <el-table-column prop="" :label="$t('Membername')" width="">
        <template slot-scope="scope">
          <div class="MemberName_box">
            <div class="title_box">{{ scope.row.memberName }}</div>
            <!-- 首次充值 -->
            <div v-if="scope.row.isFrist" class="isFrist_box">{{ $t('Firstrecharge') }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :label="$t('amountofmoney')" width="" />
      <el-table-column prop="" :label="$t('RechargeChannels')" width="">
        <template slot-scope="scope">
          {{ scope.row.channel | channelF }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="cardNo" :label="$t('PaymentCardNumber')" width="" /> -->
      <!-- <el-table-column prop="bankName" :label="$t('BankName')" width="" /> -->

      <el-table-column prop="payee" :label="$t('payee')" width="" />
      <el-table-column prop="" :label="$t('Paymentinformation')" width="280">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.wechat">{{ $t('ReceivingWeChataccount') }}:{{ scope.row.wechat }}</div>
            <div v-if="scope.row.cardNo">{{ $t('Paymentcardnumber') }}:{{ scope.row.cardNo }}</div>
            <div v-if="scope.row.bankName">{{ $t('BankName') }}:{{ scope.row.bankName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('Incomeinformation')" width="280">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.memberAccount">入款账户名称:{{ scope.row.memberAccount }}</div>
            <div v-if="scope.row.memberAlipay">入款支付宝账号:{{ scope.row.memberAlipay }}</div>
            <div v-if="scope.row.memberBankCardNo">入款银行卡号:{{ scope.row.memberBankCardNo }}</div>
            <div v-if="scope.row.memberBankName">入款银行名称:{{ scope.row. memberBankName }}</div>
            <div v-if="scope.row.memberCoin">入款虚拟币地址:{{ scope.row.memberCoin }}</div>
            <div v-if="scope.row.memberWechat">入款微信账号:{{ scope.row.memberWechat }}</div>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="" label="首次充值" width="">
        <template slot-scope="scope">
          <div>
            {{ scope.row.isFrist < 1 ? '否':'是' }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
        <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('Reviewstatus')" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.aduitStatus != 2">{{ scope.row.aduitStatus | typeF }}</div>
          <div v-else>
            <el-popover
              placement="top-start"
              :title="$t('Reasonforrejection')"
              width="200"
              trigger="hover"
              :content="scope.row.rejection"
            >
              <div slot="reference">{{ scope.row.aduitStatus | typeF }}</div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="aduitTime" :label="$t('Audittime')" width="">
        <template slot-scope="scope">
          <!-- <div> {{ scope.row.aduitTime | timeF }} </div> -->
          <div> {{ scope.row.aduitTime }} </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-if="scope.row.aduitStatus != 0" type="text" @click="HandelInfo(scope.row)">{{$t('Detail')}}</el-button>
          <el-button v-if="scope.row.aduitStatus === 0" type="text" @click="HandelOption(scope.row.id,1)">{{ $t('passthrough') }}</el-button>
          <el-button v-if="scope.row.aduitStatus === 0" type="text" style="color:red;" @click="HandelOption(scope.row.id,2)">{{ $t('reject') }}</el-button>
          <el-button v-if="scope.row.aduitStatus === 0" type="text" style="color: black;" @click="HandelOption(scope.row.id,3)"> {{ $t('cancellation') }}</el-button>
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
    channelF(value) {
      switch (value) {
        case 0:
          return '银行卡'
        case 1:
          return '支付宝'
        case 2:
          return '微信'
        case 3:
          return '虚拟币'
      }
    },
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
    },
    HandelInfo(item) {
      this.$emit('info', item)
    }
  }
}
</script>
<style lang="scss" scoped>
  .status_box{

    .text_box{
      font-size: 10px;
      color: #9c9090;
    }
  }
  .isFrist_box{
    color: red;
  }
</style>
