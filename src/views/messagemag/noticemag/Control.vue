<template>
  <el-row style="padding-bottom: 10px">
    <el-button @click="getAdd()" type="primary">新增</el-button>
  </el-row>
</template>
      
  <script>
export default {
  name: "Control",
  methods: {
    getAdd() {
      this.$emit("NoticeAdd");
    },
  },
};
</script>
      
      <style>
</style>