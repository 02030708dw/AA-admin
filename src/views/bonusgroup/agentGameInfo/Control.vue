<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="agentName" style="width: 200px; margin:0 5px" placeholder="代理名称" />
    <el-input v-model="gameName" style="width: 200px; margin:0 5px" placeholder="游戏名称" />
    <el-input v-model="playName" style="width: 200px; margin:0 5px" placeholder="玩法名称" />
    <el-input v-model="playTypeName" style="width: 200px; margin:0 5px" placeholder="玩法类型名称" />
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
  data() {
    return {
      agentName: "",
      gameName: "",
      playName: "",
      playTypeName: "",
      btnIcoType: true,
    }
  },
  methods: {
    // 重置查询
    getresetting() {
      this.status = null
      this.agentName = null
      this.gameName = null
      this.playName = null
      this.playTypeName = null
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
      this.$emit('query', { agentName: this.agentName, gameName: this.gameName, playName: this.playName, playTypeName: this.playTypeName })
    },
  }
}
</script>

<style></style>
