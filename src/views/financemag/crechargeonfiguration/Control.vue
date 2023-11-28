<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-input
      style="width: 300px; margin-left: 10px"
      placeholder="请输入渠道ID"
      v-model="keywords"
      class="input-with-select"
      :clearable="true"
      @clear="getclear"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="getquery"
      ></el-button>
    </el-input>
  </el-row>
</template>
          
  <script>
export default {
  name: "Control",
  data() {
    return { keywords: "" };
  },
  methods: {
    getAdd() {
      this.$emit("RechargelAdd");
    },
    // 查询
    getquery() {
      if (!this.keywords) {
        this.$message({
          message: "请输入渠道ID",
          type: "warning",
          showClose: true,
        });
        return;
      }
      this.$emit("query", this.keywords);
    },
    // 清空
    getclear() {
      this.$emit("clear");
    },
  },
};
</script>
          
          <style>
</style>