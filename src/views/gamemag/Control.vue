<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getgameAdd()">{{
      $t("increase")
    }}</el-button>
  </el-row>
</template>
        
    <script>
export default {
  name: "Control",
  methods: {
    getgameAdd() {
      this.$emit("gameAdd");
    },
  },
};
</script>
        
        <style>
</style>