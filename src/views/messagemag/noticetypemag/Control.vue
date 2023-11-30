<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getrolenoticetypeAdd()">{{
      $t("increase")
    }}</el-button>
  </el-row>
</template>
        
    <script>
export default {
  name: "Control",
  methods: {
    getrolenoticetypeAdd() {
      this.$emit("noticetypeAdd");
    },
  },
};
</script>
        
<style>
</style>