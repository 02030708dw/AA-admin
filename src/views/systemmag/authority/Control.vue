<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" v-has="'authority:add'"  @click="getAdd()">{{ $t("increase") }}</el-button>
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
      btnIcoType: true
    }
  },
  methods: {
    // 添加
    getAdd() {
      this.$emit('AuthorityAdd')
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
