<template>
  <el-card>
    <!-- 顶部操作 -->
    <Control></Control>
    <!-- 表格 -->
    <Table></Table>
  </el-card>
</template>

<script>
// 表格组件
import Table from "./Table.vue";
import Control from "./Control.vue";
export default {
  components: { Table, Control },
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style lang="scss">
</style>