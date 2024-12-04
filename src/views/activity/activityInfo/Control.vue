<template>
  <el-row style="padding-bottom: 10px">
    <el-button v-has="'activity:add'" type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input v-model="title" style="width: 200px;margin-left:10px;" :placeholder="$t('title')" />
    <el-select v-model="type" :placeholder="$t('typesof')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in typeType" :key="index" :value="item.value" :label="item.name" />
    </el-select>
    <el-select v-model="status" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-button  style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query')
      }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
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
      status: null, // 状态
      type: null,
      title: '',
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ],
      typeType: [
        { value: 1, name: '体育' },
        { value: 2, name: '彩票' },
        { value: 3, name: '兑换' },
        { value: 4, name: '电子' },
        { value: 5, name: '真人' },
        { value: 6, name: '棋牌' },
        { value: 10, name: '其他' },
      ],
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      this.$emit('activityAdd')
    },
    // 条件查询
    getquery() {
      this.$emit('query', { status: this.status, title: this.title, type: this.type })
    },
    // 重置查询
    getresetting() {
      this.status = null
      this.title = ''
      this.type = null
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
