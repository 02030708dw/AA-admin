<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>

    <el-select clearable v-model="id" placeholder="配置id" style="width: 200px; margin-left: 10px;">
      <el-option v-for="(item, index) in WeightGroup" :key="index" :value="item.id" :label="item.name" />
    </el-select>

    <el-select clearable v-model="type" placeholder="刮刮乐类型" style="width: 180px; margin-left: 10px;">
      <el-option label="RedHot7" value="1" />
      <el-option label="MoneyTree" value="2" />
      <el-option label="GoBananas" value="3" />
      <el-option label="LD" value="4" />
    </el-select>

    <el-button style="margin-left: 10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>

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
    WeightGroup: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      btnIcoType: true,
      id: '',
      type: ''  // 新增字段
    }
  },
  methods: {
    getAdd() {
      this.$emit('ControlAdd')
    },
    // 重置查询
    getresetting() {
      this.id = ''
      this.type = ''
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
      this.$emit('query', { id: this.id, type: this.type })
    },
  }
}
</script>

<style></style>
