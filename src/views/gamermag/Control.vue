<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getgamerAdd()">{{
      $t("increase")
    }}</el-button>
  </el-row>
</template>
      
  <script>
export default {
  name: "Control",
  methods: {
    getgamerAdd() {
      this.$emit("gamerAdd");
    },
  },
};
</script>
      
      <style>
</style>