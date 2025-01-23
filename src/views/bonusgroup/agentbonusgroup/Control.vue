<template>
  <el-row style="padding-bottom: 10px">
    <el-input
      v-model="planName"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('方案名')"
    />
    <el-input
      v-model="userName"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('用户名')"
    />
    <el-button style="margin-left: 10px" type="primary" @click="getquery()">{{
      $t("query")
    }}</el-button>
    <el-button
      type="info"
      style="margin-left: 10px"
      plain
      @click="getresetting()"
      >{{ $t("resetting") }}</el-button
    >
    <!-- 刷新按钮 -->
    <el-button
      v-if="btnIcoType"
      type="success"
      icon="el-icon-refresh-left"
      @click="HandelRefresh"
      >{{ $t("Refresh") }}</el-button
    >
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{
      $t("Refresh")
    }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: "Control",
  data() {
    return {
      planName: null, // 方案名
      userName: null, //用户名
      btnIcoType: true,
    };
  },
  methods: {
    // 条件查询
    getquery() {
      this.$emit("query", {
        planName: this.planName,
        userName: this.userName,
      });
    },
    // 重置查询
    getresetting() {
      this.planName = null;
      this.userName = null;
      this.$emit("resetting");
    },
    // 刷新
    HandelRefresh() {
      this.$emit("Refresh");
      this.btnIcoType = false;
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true;
    },
  },
};
</script>

<style></style>
