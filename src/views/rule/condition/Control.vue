<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input v-model="name" style="width: 200px;margin-left:10px;" placeholder="条件名称" />
    <el-select v-model="type" :placeholder="$t('typesof')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in typeType" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
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
      name: null,
      type: null,
      typeType: [
        { title: '充值', index: 1 },
        { title: '提现', index: 2 },
        { title: '进入游戏', index: 3 }
      ],
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      console.log(1);
      this.$emit('ControlAdd')
    },
    // 条件查询
    getquery() {
      this.$emit('query', { name: this.name, type: this.type })
    },
    // 重置查询
    getresetting() {
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
