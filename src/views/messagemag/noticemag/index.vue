<template>
  <el-card>
    <Control></Control>
    <!-- 表格 -->
    <Table></Table>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
export default {
  components: {
    Table,
    Control,
  },
  data() {
    return {
      tableData: [{ title: "111", time: "2023/11/22", status: false }],
    };
  },
};
</script>

<style lang="scss">
</style>