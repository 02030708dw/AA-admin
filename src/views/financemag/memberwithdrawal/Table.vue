<template>
  <!-- 会员提现表格 -->
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
      <el-table-column prop="" :label="$t('Withdrawalinformation')" width="">
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
      <!-- <el-table-column
        prop="bankName"
        :label="$t('Nameofwithdrawalbank')"
        width="280"
      /> -->
      <!-- <el-table-column
        prop="bankCardNo"
        :label="$t('Withdrawalbankcardnumber')"
        width="200"
      /> -->
      <!-- <el-table-column prop="alipay" :label="$t('Alipayaccount')" width="200" />
      <el-table-column prop="wechat" :label="$t('WeChataccount')" width="200" />
      <el-table-column
        prop="coin"
        :label="$t('Virtualcoinaddress')"
        width="200"
      /> -->
      <el-table-column prop="amount" :label="$t('amountofmoney')" width="" />
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
            <div v-if="scope.row.aduitStatus === 2" class="text_box">驳回原因:{{ scope.row.rejection ? scope.row.rejection :'无' }}</div>
          </div>
          <!-- <span>{{ scope.row.aduitStatus | FaduitStatus }}</span> -->
        </template></el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
        <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column prop="" :label="$t('Audittime')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.aduitTime | timeF }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="rejection"
        :label="$t('Reasonforrejection')"
        width="200"
      /> -->
      <!-- 操作 -->
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-if="scope.row.aduitStatus != 0" type="text" @click="HandelInfo(scope.row)">查看详情</el-button>
          <el-button v-has="'memberwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" @click="getaudit(1,scope.row.id)"> {{ $t("passthrough") }} </el-button>
          <el-button v-has="'memberwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" style="color: red;" @click="getaudit(2,scope.row.id)"> {{ $t("reject") }} </el-button>
          <el-button v-has="'memberwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" style="color: #a4a4a4;" @click="getaudit(3,scope.row.id)"> {{ $t("cancellation") }} </el-button>
          <el-button v-has="'memberwithdrawal:fo'" v-if="scope.row.aduitStatus === 0"  type="text" @click="Handelpay(scope.row)">代付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 驳回原因弹窗 -->
    <el-dialog
      title="驳回原因"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>请输入驳回原因</span>
      <el-input
        v-model="reason"
        style="margin-top: 10px;"
        type="textarea"
        :rows="4"
        :placeholder="$t('Pleaseenterthereasonforrejection')"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="getaudit(2)">跳 过</el-button>
        <el-button type="primary" @click="getaudit(2)">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { formatDate } from '../../../utils/formattime'
import { Audit } from '@/api/finance/memberwithdrawal'
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
    return {
      dialogVisible: false,
      reason: '', // 驳回原因
      loading: false,
      Id: ''
    }
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
    },
    HandelInfo(item) {
      this.$emit('info', item)
    },
    Handelpay(item) {
      this.$emit('pay', item)
    },
    getaudit(index, id = null) {
      if (id) {
        this.Id = id
      }
      switch (index) {
        // 通过
        case 1:
          Audit({ auditStatus: index, reason: '', recordId: this.Id }).then(res => {
            this.$emit('operate')
          }).catch(err => {
            console.log(err)
          })
          break
        // 驳回
        case 2:
          if (this.dialogVisible) {
            Audit({ auditStatus: index, reason: this.reason, recordId: this.Id }).then(res => {
              this.$emit('operate')
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
            this.dialogVisible = false
            this.reason = ''
          } else {
            this.dialogVisible = true
          }
          // 弹窗驳回原因
          break
        // 取消
        case 3:
          Audit({ auditStatus: index, reason: '', recordId: this.Id }).then(res => {
            this.$emit('operate')
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          break
      }
    }
  }
}
</script>

    <style lang="scss" scoped>
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
