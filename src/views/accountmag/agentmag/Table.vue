<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="name" label="代理名称" width="300" />
      <el-table-column prop="name" label="代理转移" width="300" />
      <el-table-column prop="" label="状态" width="280">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" active-color="#13ce66">
            </el-switch>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style>
</style>