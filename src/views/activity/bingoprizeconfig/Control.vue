<template>
  <el-row style="padding-bottom: 10px" :gutter="10" align="middle">
    <el-button type="primary" @click="getAdd">{{ $t('increase') }}</el-button>

    <el-select v-model="bingoWeightGroupId" placeholder="请选择权重分组" clearable style="width: 200px; margin:0 10px;">
      <el-option label="全部" :value="null" />
      <el-option v-for="(label, key) in weightGroupOptions" :key="key" :label="label" :value="Number(key)" />
    </el-select>

    <el-button type="primary" @click="getquery">查询</el-button>

    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>刷新</el-button>
  </el-row>
</template>

<script>
export default {
  props: {
    weightGroupOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      bingoWeightGroupId: '',
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      this.$emit('ControlAdd')
    },
    getquery() {
      this.$emit('query', {
        bingoWeightGroupId: this.bingoWeightGroupId
      })
    },
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    HandelBtnStatus() {
      this.btnIcoType = true
    }
  }
}
</script>
