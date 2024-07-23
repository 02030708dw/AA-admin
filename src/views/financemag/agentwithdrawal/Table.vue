<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="cashChannelId"
        :label="$t('WithdrawalchannelID')"
        width="280"
      />
      <el-table-column prop="" :label="$t('Withdrawalinformation')" width="500">
        <template slot-scope="scope">
          <div class="info_box">
            <div v-if="scope.row.bankName" class="item_box">
              <div class="item_title">{{ $t('Nameofwithdrawalbank') }}:</div>
              <div class="item_conent">{{ scope.row.bankName }}</div>
            </div>
            <div v-if="scope.row.bankCardNo" class="item_box">
              <div class="item_title">{{ $t('Withdrawalbankcardnumber') }}:</div>
              <div class="item_conent">{{ scope.row.bankCardNo }}</div>
            </div>
            <div v-if="scope.row.alipay" class="item_box">
              <div class="item_title">{{ $t('Alipayaccount') }}:</div>
              <div class="item_conent">{{ scope.row.alipay }}</div>
            </div>
            <div v-if="scope.row.wechat" class="item_box">
              <div class="item_title">{{ $t('WeChataccount') }}:</div>
              <div class="item_conent">{{ scope.row.wechat }}</div>
            </div>
            <div v-if="scope.row.coin" class="item_box">
              <div class="item_title">{{ $t('Virtualcoinaddress') }}:</div>
              <div class="item_conent">{{ scope.row.coin }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 金额 -->
      <el-table-column prop="amount" :label="$t('amountofmoney')" width="" />
      <!-- 审核状态 -->
      <el-table-column
        prop=""
        :label="$t('Reviewstatus')"
        aduit-time
        width="200"
      >
        <template slot-scope="scope">
          <div class="status_box">
            <div class="title_box">{{ scope.row.aduitStatus | FaduitStatus }}</div>
            <!-- 驳回原因 -->
            <div v-if="scope.row.aduitStatus === 2" class="text_box">驳回原因:{{ scope.row.rejection }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="aduitTime" :label="$t('Audittime')" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.aduitTime | timeF }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
        <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-if="scope.row.aduitStatus != 0" type="text" @click="HandelInfo(scope.row)">查看详情</el-button>
          <el-button v-has="'agentwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" @click="HandelOption(scope.row.id,1)">{{ $t('passthrough') }}</el-button>
          <el-button v-has="'agentwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" style="color:red;" @click="HandelOption(scope.row.id,2)">{{ $t('reject') }}</el-button>
          <el-button v-has="'agentwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" style="color: black;" @click="HandelOption(scope.row.id,3)"> {{ $t('cancellation') }}</el-button>
        </template>
      </el-table-column>
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
    return { loading: false }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    HandelOption(id, type) {
      this.$emit('option', { id: id, auditStatus: type })
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
        }
      }
      .info_box{
        margin: 0 auto;
        width: 400px;
        .item_box{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .item_title{
            font-size: 16px;
            font-weight: 510;
            width: 150px;
            text-align: right;
          }
          .item_conent{
            margin-left: 5px;
            font-size: 16px;
            font-weight: 520;
            text-align: left;
          }
        }
      }
</style>
