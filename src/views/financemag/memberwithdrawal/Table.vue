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
        prop="memberId"
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
      <el-table-column prop="aduitTime" :label="$t('Audittime')" width="200" />
      <el-table-column
        prop="rejection"
        :label="$t('Reasonforrejection')"
        width="200"
      />
      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="getaudit(1)"> {{ $t("passthrough") }} </el-button>
          <el-button type="text" style="color: red;" @click="getaudit(2)"> {{ $t("reject") }} </el-button>
          <el-button type="text" style="color: #a4a4a4;" @click="getaudit(3)"> {{ $t("cancellation") }} </el-button>
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
      loading: false
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
    getaudit(index) {
      switch (index) {
        // 通过
        case 1:
          Audit({ auditStatus: index, reason: '', recordId: '' }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          break
        // 驳回
        case 2:
          if (this.dialogVisible) {
            Audit({ auditStatus: index, reason: this.reason, recordId: '' }).then(res => {
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
          Audit({ auditStatus: index, reason: '', recordId: '' }).then(res => {
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

    <style>
</style>
