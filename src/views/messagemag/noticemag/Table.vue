<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="序号" width="150" />
      <el-table-column prop="title" label="公告标题" width="350" />
      <el-table-column prop="time" label="更新时间" width="350" />
      <el-table-column prop="" label="发布/撤销" width="300">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" active-color="#13ce66">
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c">修改</el-button>
          <el-button type="text" style="color: red">删除</el-button>
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