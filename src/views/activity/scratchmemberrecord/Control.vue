<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="name" style="width: 200px; margin:0 5px" :placeholder="$t('username')" />
    <el-select v-model="status" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in  [{ index: 0, title: '停用' }, { index: 1, title: '启用' }]" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-select clearable v-model="type" :placeholder="$t('customertype')"
      style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 1, title: '游客' }, { index: 2, title: '正式用户' }]" :key="index"
        :value="item.index" :label="$t(item.title)" />
    </el-select>
    <el-button v-has="'noticemag:page'" style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query')
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
      status: null,
      type: null,
      memberName: '',
      btnIcoType: true,
    }
  },
  methods: {
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
      this.$emit('query', { memberName: this.memberName, status: this.status, type: this.type })
    },
  }
}
</script>

<style></style>
