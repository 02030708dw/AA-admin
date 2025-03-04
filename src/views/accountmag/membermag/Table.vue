<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="userName" :label="$t('username')" width="" />
      <el-table-column prop="vipLevel" :label="$t('VIPlevel')" width="" />
      <el-table-column prop="ip" :label="$t('IPAddress')" width="" />

      <!-- <el-table-column prop="password" :label="$t('password')" width="" /> -->
      <el-table-column prop="telPhone" :label="$t('phone')" width="" />
      <el-table-column prop="currency" :label="$t('currency')" width="" />
      <el-table-column prop="blanace" :label="$t('Memberbalance')" width="">
        <template slot-scope="scope">
          {{ +scope.row.blanace + +getBalance(scope.row.id) }}
        </template>
      </el-table-column>
      <el-table-column prop="gammerBlanace" :label="$t('Gamemerchantbalance')" width="" />
      <el-table-column prop="realName" :label="$t('Realname')" width="" />
      <el-table-column prop="parentName" :label="$t('Superiormembername')" width="" />
      <el-table-column prop="cashFlow" :label="$t('Withdrawalrequiredtransactionflow')" width="" />
      <!-- <el-table-column prop="plugUrl" :label="$t('plugUrl')" width="" /> -->
      <el-table-column prop="createdAt" :label="$t('Registrationtime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div v-has="'membermag:status'">
            <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
              @change="getupdateStatus($event, scope.row.id)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('Memberinformation')" width="">
        <template slot-scope="scope">
          <el-button v-has="'membermag:memberInfo'" type="text" @click="MemberInfo(scope.row)">{{ $t('MemberDetails')
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.parentName" v-has="'membermag:memberTransfer'" type="text"
            @click="Membershiptransfer(scope.row)">{{
              $t("Membershiptransfer")
            }}</el-button> -->
          <el-button type="text" @click="MemberEditPayment(scope.row)"> 支付商展示顺序 </el-button>
          <el-button type="text" @click="CreateAgent(scope.row)"> 创建代理 </el-button>
          <el-button v-has="'membermag:resetPwd'" type="text" @click="MemberresettingPwd(scope.row)">{{
            $t('resetpassword') }}</el-button>
          <el-button v-has="'membermag:changeBalance'" type="text" @click="MemberUpdatebalance(scope.row)">{{
            $t('Balanceadditionandsubtraction') }}</el-button>
          <el-button v-if="!scope.row.isAgent || scope.row.parentMemberId" v-has="'membermag:agentTransfer'" type="text"
            @click="Proxytransfer(scope.row)">{{
              $t("Proxytransfer")
            }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
  filters: {
    Channeltype(value) {
      switch (value) {
        case 0:
          return '冻结'
        case 1:
          return '正常'
      }
    }
  },
  computed: {
    getBalance() {
      return (id) => {
        const data = this.gamerBalanceList
        for (let i = 0; i < data.length; i++) {
          for (let k in data[i]) {
            if (k === id) {
              return data[i][k];
            }
          }
        }
        return 0;
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    gamerBalanceList: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 编辑事件
    Membershiptransfer(item) {
      this.$emit('Membershiptransfer', item)
    },
    Proxytransfer(item) {
      this.$emit('Proxytransfer', item)
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, id: Id })
    },
    // 会员详情
    MemberInfo(data) {
      this.$emit('Info', data)
    },
    // 重置密码
    MemberresettingPwd(data) {
      this.$emit('MemberresettingPwd', data.id)
    },
    // 操作余额
    MemberUpdatebalance(data) {
      this.$emit('Updatebalance', data.id)
    },
    // 给会员修改三方支付商展示顺序信息
    MemberEditPayment(data) {
      this.$emit('MemberEditPayment', data.id, data.paymentProviderOrders)
    },
    // 直接创建代理
    CreateAgent(data) {
      this.$emit('CreateAnAgent', data.id)
    },
  }
}
</script>

<style></style>
