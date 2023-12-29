<template>
  <el-row style="padding-bottom: 10px">
    <!-- <el-button type="primary">新增</el-button> -->
    <!-- 条件筛选框 -->
    <el-input v-model="userName" style="width: 200px;" :placeholder="$t('username')" />
    <el-input v-model="agentId" style="width: 200px;margin-left:10px;" :placeholder="$t('agenId')" />
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
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>刷新</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      agentId: '',
      userName: '',
      status: null,
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ],
      btnIcoType: true
    }
  },
  methods: {
    getquery() {
      this.$emit('Memquery', {
        agentId: this.agentId,
        userName: this.userName,
        status: this.status
      })
    },
    getresetting() {
      this.agentId = ''
      this.userName = ''
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

<style></style>
