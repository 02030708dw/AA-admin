<template>
  <el-row style="padding-bottom: 10px">
    <el-button  type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-select clearable v-model="countType" placeholder="统计类型" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 1, title: '当天' }, { index: 2, title: '总计' }]" :key="index"
        :value="item.index" :label="item.title" />
    </el-select>
    <el-select clearable v-model="thresholdType" placeholder="条件类型" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 1, title: '反水' }, { index: 2, title: '输反' }]" :key="index"
        :value="item.index" :label="item.title" />
    </el-select>
    <el-select clearable v-model="status" placeholder="是否启用" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 0, title: '停用' }, { index: 1, title: '启用' }]" :key="index"
        :value="item.index" :label="item.title" />
    </el-select>
    <el-button  style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query')
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
      thresholdType: null, // 条件类型
      countType: null, // 统计类型
      status: null, // 状态
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
      this.$emit('query', { thresholdType: this.thresholdType, countType: this.countType, status: this.status })
    },
  }
}
</script>

<style></style>
