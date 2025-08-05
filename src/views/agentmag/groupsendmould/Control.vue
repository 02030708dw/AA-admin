<template>
  <el-row style="padding-bottom: 10px" type="flex" align="middle">
    <el-button type="primary" @click="getAdd">{{ $t('increase') }}</el-button>

    <el-input v-model="name" placeholder="请输入模板名称" clearable style="width: 200px; margin-left: 10px" />

    <el-select v-model="status" clearable placeholder="请选择状态" style="width: 200px; margin-left: 10px">
      <el-option label="停用" :value="0" />
      <el-option label="启用" :value="1" />
    </el-select>

    <el-select v-model="type" clearable placeholder="请选择类型" style="width: 200px; margin-left: 10px">
      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-button style="margin-left: 10px" type="primary" @click="getquery">{{ $t('query') }}</el-button>

    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
      {{ $t('Refresh') }}
    </el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>
      {{ $t('Refresh') }}
    </el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      name: '',
      status: null,
      type: null,
      btnIcoType: true,
      typeOptions: [
        { label: '红包', value: 1 },
        { label: '刮刮乐', value: 2 },
        { label: '免费彩票', value: 3 },
        { label: '转盘', value: 4 },
        { label: '宾果', value: 5 },
        { label: '代金券', value: 6 },
        { label: '预告', value: 7 },
      ],
    }
  },
  methods: {
    getAdd() {
      this.$emit('ControlAdd')
    },
    getresetting() {
      this.name = ''
      this.status = null
      this.type = null
      this.$emit('resetting')
    },
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    getquery() {
      this.$emit('query', {
        name: this.name,
        status: this.status,
        type: this.type,
      })
    },
  },
}
</script>
