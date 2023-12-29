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
      <el-table-column prop="aduitTime" :label="$t('Audittime')" width="200" />
      <el-table-column
        prop="rejection"
        :label="$t('Reasonforrejection')"
        width="200"
      />
      <!-- <el-table-column prop="" :label="$t('state')" width="150">
          <template slot-scope="scope">
            <div>
              <el-switch
                @change="getupdateStatus($event, scope.row.id)"
                v-model="scope.row.status"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
          </template>
        </el-table-column> -->

      <!-- <el-table-column prop="" :label="$t('operate')" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="geteroleEitor(scope.row)">{{
              $t("edit")
            }}</el-button>

            <el-button
              slot="reference"
              type="text"
              style="color: red"
              @click="getroledel(scope.row.id)"
              >{{ $t("delete") }}</el-button
            >
          </template>
        </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script>
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
