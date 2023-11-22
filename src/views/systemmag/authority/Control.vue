<template>
  <div>
    <!-- 新增按钮 -->
    <el-row>
      <el-button type="primary" @click="getaddroute">新增</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Control",

  methods: {
    // 添加一级菜单
    getaddroute() {
      this.$emit("changeShow");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
