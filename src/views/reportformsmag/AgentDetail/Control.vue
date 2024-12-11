<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="name" style="width: 200px; margin:0 5px" :placeholder="$t('username')" />
    <el-button style="margin-left: 10px" type="primary" @click="getquery()"> {{
      $t('query') }} </el-button>
    <!-- 刷新 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
      }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      // 按钮状态
      btnIcoType: true,
      name: '',
    }
  },
  methods: {
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    // 查询
    getquery() {
      this.$emit('query', { name: this.name })
    }
  }
}
</script>
