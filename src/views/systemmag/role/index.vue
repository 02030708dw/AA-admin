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
      tableData: [
        {
          id: "01254",
          name: "超级管理员",
          describe: "超级管理员",
          time: "2023/11/22",
          status: false,
        },
        {
          id: "34505",
          name: "管理员",
          describe: "管理员",
          time: "2023/11/22",
          status: false,
        },
        {
          id: "024548",
          name: "用户",
          describe: "用户",
          time: "2023/11/22",
          status: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>