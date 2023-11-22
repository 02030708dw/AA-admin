<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="name" label="角色名称" width="280" />
      <el-table-column prop="id" label="角色编号" width="250" />
      <el-table-column prop="describe" label="角色描述" width="400" />
      <el-table-column prop="time" label="创建时间" width="180" />
      <el-table-column prop="" label="状态" width="240">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" active-color="#13ce66">
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" style="color: #e6a23c">权限</el-button>
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