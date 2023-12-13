<template>
  <el-row style="display: flex; justify-content: center">
    <el-pagination
      :page-size="pageSize"
      :current-page="pageNo"
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </el-row>
  <!-- 分页组件 -->
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 总条数
    total: {
      type: Number,
      default: 1,
    },
    // 页码
    pageNo: {
      type: Number,
      default: 1,
    },
    // 每页数量
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    // 页码改变
    handlePageChange(e) {
      this.$emit("PageChange", e);
    },
  },
};
</script>

<style>
</style>