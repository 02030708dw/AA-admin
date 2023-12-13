<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input
      v-model="keywords"
      style="width: 300px; margin-left: 10px"
      placeholder="请输入渠道ID"
      class="input-with-select"
      :clearable="true"
      @clear="getclear"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="getquery"
      />
    </el-input>
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
    <el-input
      v-model="name"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('ChannelID')"
    />
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getqueryT()"
    > {{ $t('query') }} </el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
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
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

          <style>
</style>
