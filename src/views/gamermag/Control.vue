<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getgamerAdd()">{{
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
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getquery()"
    > {{ $t('query') }} </el-button>
    <!-- 重置按钮 -->
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
      name: '',
      status: null,
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 },
        { title: '游戏商维护中', index: 2 }
      ],
      btnIcoType: true,
      gamerId:'',
    }
  },
  methods: {
    getgamerAdd() {
      this.$emit('gamerAdd')
    },
    getquery() {
      this.$emit('query', { name: this.name, status: this.status })
    },
    getresetting() {
      this.name = ''
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
