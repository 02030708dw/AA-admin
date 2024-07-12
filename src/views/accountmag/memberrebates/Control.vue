<template>
  <el-row style="padding-bottom: 10px">
    <!-- 新增 -->
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <!-- 条件筛选 -->
    <!-- 游戏商id -->
    <el-select
      v-model="GamerId"
      filterable
      placeholder="选择游戏商"
      style="width: 200px; margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in gamerIdData"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <!-- 会员id -->
    <el-select
      v-model="MemberId"
      placeholder="选择会员"
      style="width: 200px; margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in memberData"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-button style="margin-left: 10px" type="primary" @click="getquery()">{{
      $t("query")
    }}</el-button>
    <el-button
      type="info"
      style="margin-left: 10px"
      plain
      @click="getresetting()"
    >{{ $t("resetting") }}</el-button>
    <!-- 刷新 -->
    <el-button
      v-if="btnIcoType"
      type="success"
      icon="el-icon-refresh-left"
      @click="HandelRefresh"
    >刷新</el-button>
    <el-button
      v-else
      type="success"
      icon="el-icon-loading"
      disabled
    >刷新</el-button>
  </el-row>
</template>
<script>
export default {
  props: {
    memberData: {
      type: Array,
      default: () => {
        return []
      }
    },
    gamerIdData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      btnIcoType: true,
      MemberId: '',
      GamerId: ''
    }
  },
  methods: {
    // 新增
    getAdd() {
      this.$emit('Add')
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
    // 查询
    getquery() {
      this.$emit('query', { MemberId: this.MemberId, GamerId: this.GamerId })
    },
    // 重置
    getresetting() {
      this.MemberId = ''
      this.GamerId = ''
      this.$emit('resetting')
    }
  }
}
</script>
<style lang="scss" scoped></style>
