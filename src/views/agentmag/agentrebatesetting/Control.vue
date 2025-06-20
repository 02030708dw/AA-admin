<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input v-model="agentName" style="width: 180px; margin-left: 10px" :placeholder="$t('Agentname')" />
    <el-select v-model="agentId" filterable :placeholder="$t('SelectProxy')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in agentIddata" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-select v-model="gameType" :placeholder="$t('typesof')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in typeArrList" :key="index" :value="item.index" :label="item.title" />
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
    agentIddata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      agentId: null,
      agentName: null,
      gameType: null,
      typeArrList: [
        { title: '未分类', index: 0 },
        { title: '电子', index: 1 },
        { title: '棋牌', index: 2 },
        { title: '彩票', index: 3 },
        { title: '体育', index: 4 },
        { title: '真人', index: 5 },
        { title: '小游戏', index: 6 },
        { title: '热门', index: 7 },
        { title: "捕鱼", index: 8 },
        { title: "斗鸡", index: 9 },
      ],
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      console.log(1);
      this.$emit('ControlAdd')
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
    },
    getquery() {
      this.$emit('query', { gameType: this.gameType, agentId: this.agentId, agentName: this.agentName })
    },
  }
}
</script>

<style></style>
