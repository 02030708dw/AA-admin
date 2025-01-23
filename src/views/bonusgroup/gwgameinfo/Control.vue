<template>
  <el-row style="padding-bottom: 10px">
    <el-input
      v-model="groupName"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('游戏名称')"
    />
    <el-input
      v-model="gamePlayName"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('游戏玩法名称')"
    />
    <el-input
      v-model="gamePlayTypeName"
      style="width: 200px; margin-left: 10px"
      :placeholder="$t('游戏类型名称')"
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
      groupName: null, // 游戏名称
      gamePlayName: null, //游戏玩法名称
      gamePlayTypeName: null, //游戏类型名称
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
        gamePlayName: this.gamePlayName,
        gamePlayTypeName: this.gamePlayTypeName,
      });
    },
    // 重置查询
    getresetting() {
      this.groupName = null;
      this.gamePlayName = null;
      this.gamePlayTypeName = null;
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
