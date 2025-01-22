<template>
  <el-row style="padding-bottom: 10px">
    <el-button v-has="'activity:add'" type="primary" @click="getAdd()">{{
      $t("increase")
    }}</el-button>
    <el-input
      v-model="groupName"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('奖金组名称')"
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
      groupName: null, // 奖金组名称
      btnIcoType: true,
    };
  },
  methods: {
    // 添加
    getAdd() {
      this.$emit("Add");
    },
    // 条件查询
    getquery() {
      this.$emit("query", {
        groupName: this.groupName,
      });
    },
    // 重置查询
    getresetting() {
      this.groupName = null;
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
