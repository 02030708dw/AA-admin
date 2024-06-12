<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <!-- 条件筛选框 -->
    <el-select
      v-model="currency"
      placeholder="币种"
      style="width: 200px; margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in currencyType"
        :key="index"
        :value="item.title"
        :label="item.title"
      />
    </el-select>
    <el-input
      v-model="threeName"
      style="width: 200px; margin-left: 10px"
      placeholder="三方名称"
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
      >刷新</el-button
    >
    <el-button v-else type="success" icon="el-icon-loading" disabled
      >刷新</el-button
    >
  </el-row>
</template>

<script>
export default {
  name: "Control",
  data() {
    return {
      btnIcoType: true,
      currency: "",
      threeName: "",
      currencyType: [
        { index: 1, title: "THB" },
        { index: 2, title: "IDR" },
        { index: 3, title: "VND" },
        { index: 4, title: "PHP" },
      ],
    };
  },
  methods: {
    getAdd() {
      this.$emit("thirdAdd");
    },
    getquery() {
      this.$emit("thirdquery", {
        currency: this.currency,
        threeName: this.threeName,
      });
    },
    getresetting() {
      this.currency = null;
      this.threeName = '';
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
