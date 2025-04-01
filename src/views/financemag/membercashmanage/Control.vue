<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input v-model="memberName" style="width: 200px; margin:0 5px" :placeholder="$t('Membername')" />
    <el-input v-model="bankAccount" style="width: 200px; margin:0 5px" :placeholder="$t('Bankaccount')" />
    <el-input v-model="bankName" style="width: 200px; margin:0 5px" :placeholder="$t('BankName')" />

    <el-select v-model="cashChannelId" :placeholder="$t('ChannelID')" style="width: 200px">
      <el-option v-for="(item, index) in channelidList" :key="index" :value="item.index" :label="item.title" />
    </el-select>

    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query')
    }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
    }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  props: {
    channelidList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      btnIcoType: true,
      value: '',
      bankAccount: "",
      bankName: "",
      cashChannelId: null,
      memberName: "",
      channelData: [],
    }
  },

  methods: {

    getAdd() {
      console.log(1);
      this.$emit('ControlAdd')
    },
    // 重置查询
    getresetting() {
      this.memberName = ""
      this.bankAccount = ""
      this.bankName = ""
      this.cashChannelId = null
      this.$emit('resetting')
    },
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
      this.$emit('query', { memberName: this.memberName, bankAccount: this.bankAccount, bankName: this.bankName, cashChannelId: this.cashChannelId })
    },
  }
}
</script>

<style></style>
