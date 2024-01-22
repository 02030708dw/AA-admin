<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getgameAdd()">{{
      $t("increase")
    }}</el-button>
    <el-select
      v-model="gamerId"
      :placeholder="$t('SelectGameMerchant')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in gameriddata"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <!-- <el-input v-model="gamerId" style="width: 200px;margin-left:10px;" :placeholder="$t('GamemerchantsID')" /> -->
    <el-input v-model="name" style="width: 200px;margin-left:10px;" :placeholder="$t('name')" />
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
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh') }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  props: {
    gameriddata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      gamerId: '',
      name: '',
      type: null,
      status: null,
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 },
        { title: '游戏商维护中', index: 2 }
      ],
      typeArrList: [
        { title: '真人', index: 1 },
        { title: '体育', index: 2 },
        { title: '老虎机', index: 3 },
        { title: '棋牌', index: 4 },
        { title: '彩票', index: 5 }
      ],
      btnIcoType: true
    }
  },
  methods: {
    getgameAdd() {
      this.$emit('gameAdd')
    },
    getquery() {
      this.$emit('Gamequery', { gamerId: this.gamerId, name: this.name, type: this.type, status: this.status })
    },
    getresetting() {
      this.gamerId = ''
      this.name = ''
      this.type = null
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
