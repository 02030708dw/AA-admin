<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input
      v-model="name"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('Channelname')"
    />
    <el-select
      v-model="status"
      :placeholder="$t('state')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in statusType"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
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
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getquery()"
    > {{ $t('query') }} </el-button>
    <!-- 重置按钮 -->
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      name: '',
      status: null,
      type: null,
      typeArrList: [
        { title: '银行卡', index: 0 },
        { title: '支付宝', index: 1 },
        { title: '微信', index: 2 },
        { title: '虚拟币', index: 3 }
      ],
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ]
    }
  },
  methods: {
    getAdd() {
      this.$emit('WithdrawalchannelsAdd')
    },
    // 条件查询
    getquery() {
      this.$emit('query', { name: this.name, status: this.status, type: this.type })
    },
    // 重置
    getresetting() {
      this.name = ''
      this.status = null
      this.type = null
      this.$emit('resetting')
    }
  }
}
</script>

          <style>
</style>
