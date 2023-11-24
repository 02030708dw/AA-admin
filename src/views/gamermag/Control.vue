<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getgamerAdd()">新增</el-button>
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