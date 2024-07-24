<template>
  <el-row style="padding-bottom: 10px">
    <el-button v-has="'customerservice:add'" type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input v-model="account" style="width: 200px;margin-left:10px;" placeholder="客服账号" />
    <el-select
      v-model="type"
      :placeholder="$t('typesof')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in typeType"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
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
    <el-button v-has="'customerservice:page'" style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh') }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      account: null,
      type:null,
      status: null, // 状态
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ],
      typeType: [
        { title: 'skype', index: 1 },
        { title: 'telegram', index: 2 }
      ],
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      console.log(1);
      this.$emit('ControlAdd')
    },
    // 条件查询
    getquery() {
        this.$emit('query', { status: this.status, account: this.account, type: this.type })
    },
    // 重置查询
    getresetting() {
      this.status = null
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
