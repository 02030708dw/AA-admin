<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input v-model="userName" style="width: 200px;margin-left: 10px" :placeholder="$t('username')" />
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
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
  </el-row>
</template>
<script>
export default {
  name: 'Control',
  data() {
    return {
      userName: '',
      status: null,
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ]
    }
  },
  methods: {
    getquery() {
      this.$emit('Agequery', {
        userName: this.userName,
        status: this.status
      })
    },
    getresetting() {
      this.userName = ''
      this.status = null
      this.$emit('resetting')
    },
    // 添加代理
    getAdd() {
      this.$emit('AgentAdd')
    }
  }
}
</script>

<style>
</style>
