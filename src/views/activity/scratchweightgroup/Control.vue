<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>

    <!-- 权重组名称 -->
    <el-input v-model="name" style="width: 200px; margin:0 5px" placeholder="权重组名称" />

    <!-- 类型选择 -->
    <el-select clearable v-model="type" placeholder="刮刮乐类型" style="width: 180px; margin-left: 10px;">
      <el-option label="RedHot7" value="1" />
      <el-option label="MoneyTree" value="2" />
      <el-option label="GoBananas" value="3" />
      <el-option label="LD" value="4" />
    </el-select>

    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>

    <!-- 刷新按钮 -->
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
      name: null,
      type: null,
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      this.$emit('ControlAdd')
    },
    getresetting() {
      this.name = null
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
        type: this.type,   // 传出type
      })
    },
  }
}
</script>

<style scoped></style>
