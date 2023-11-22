<template>
  <el-card>
    <Control></Control>
    <!-- 表格 -->
    <Table :tableData="tableData"></Table>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
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
          name: "admin",
          time: "2023/11/22",
          address: "123",
          status: false,
          sex: "男",
        },
        {
          id: "34505",
          name: "admin1",
          time: "2023/11/22",
          address: "123",
          sex: "男",

          status: false,
        },
        {
          id: "024548",
          name: "admin2",
          time: "2023/11/22",
          address: "123",
          sex: "女",

          status: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>