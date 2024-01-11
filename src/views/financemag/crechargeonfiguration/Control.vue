<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-select
      v-model="type"
      :placeholder="$t('typesof')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in typeArrList"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-select
      v-model="channelId"
      :placeholder="$t('ChannelID')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in channelidList"
        :key="index"
        :value="item"
        :label="item"
      />
    </el-select>
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getqueryT()"
    > {{ $t('query') }} </el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>刷新</el-button>
  </el-row>
</template>

<script>
// import { channelPage } from '../../../api/finance/rechargechannel'
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
      keywords: '',
      // 渠道id
      channelId: '',
      // 类型
      type: null,
      typeArrList: [
        { title: '银行卡', index: 0 },
        { title: '支付宝', index: 1 },
        { title: '微信', index: 2 },
        { title: '虚拟币', index: 3 }
      ],
      // 渠道id
      channelIdList: [],
      btnIcoType: true
    }
  },
  methods: {
    // 获取渠道id
    // getchannelId() {
    //   channelPage({ pageNo: 1, pageSize: 10000 }).then(res => {
    //     this.channelIdList = []
    //     for (let i = 0; i < res.resultSet.data.length; i++) {
    //       this.channelIdList.push(res.resultSet.data[i].id)
    //     }
    //   })
    // },
    getAdd() {
      this.$emit('RechargelAdd')
    },
    // 查询
    getquery() {
      if (!this.keywords) {
        this.$message({
          message: '请输入渠道ID',
          type: 'warning',
          showClose: true
        })
        return
      }
      this.$emit('query', this.keywords)
    },
    // 清空
    getclear() {
      this.$emit('clear')
    },
    // 条件查询
    getqueryT() {
      this.$emit('queryT', { type: this.type, channelId: this.channelId })
    },
    // 重置
    getresetting() {
      this.type = null
      this.channelId = ''
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
    }
  }
}
</script>

          <style>
</style>
