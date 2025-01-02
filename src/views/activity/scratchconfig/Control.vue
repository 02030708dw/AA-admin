<template>
  <el-row style="padding-bottom: 10px">
    <el-button v-has="'demogame:create'" type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-select v-model="status" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-input v-model="name" style="width: 200px; margin:0 5px" :placeholder="$t('username')" />
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
      name: null,
      status: null,
      btnIcoType: true,
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ],
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
      this.$emit('query', { name: this.name, status: this.status })
    },
  }
}
</script>

<style></style>
