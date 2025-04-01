<template>
  <el-row style="padding-bottom: 10px">
    <!-- <el-button  type="primary" @click="getAdd()">{{ $t("increase") }}</el-button> -->
    <el-input v-model="name" style="width: 200px; margin:0 5px" :placeholder="$t('name')" />
    <el-select clearable v-model="isAgent" :placeholder="$t('customertype')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 0, title: '普通用户' }, { index: 1, title: '代理' }]" :key="index"
        :value="item.index" :label="$t(item.title)" />
    </el-select>
    <el-select clearable v-model="status" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
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
  data() {
    return {
      status: '',
      name: '',
      btnIcoType: true,
      value: '',
      isAgent: null,
      statusType: [
        { index: 0, title: '禁用' },
        { index: 1, title: '正常' },
        { index: 2, title: '删除' },
      ]
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
      this.name = null
      this.isAgent = null
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
      this.$emit('query', { name: this.name, status: this.status, isAgent: this.isAgent })
    },
  }
}
</script>

<style></style>
