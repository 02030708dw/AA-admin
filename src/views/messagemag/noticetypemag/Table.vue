<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="序号" width="200" />
      <el-table-column prop="name" label="公告类型" width="350" />
      <el-table-column prop="" label="状态" width="300">
        <template slot-scope="scope">
          <div>
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              active-color="#13ce66"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e6a23c"
            @click="getEditor(scope.row)"
            >修改</el-button
          >
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
  methods: {
    // 修改公告类型
    getEditor(item) {
      this.$emit("EditorShow", item);
    },
  },
};
</script>
  
  <style>
</style>