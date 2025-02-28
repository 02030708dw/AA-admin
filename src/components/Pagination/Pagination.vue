<template>
  <!-- 分页组件 -->
  <el-row style="display: flex; justify-content: center">
    <el-pagination :current-page="pageNo" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper"
      :total="+total" @size-change="handleSizeChange" @current-change="handlePageChange" />
  </el-row>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 总条数
    total: {
      type: Number | String,
      default: 1,
    },
    // 页码
    pageNo: {
      type: Number,
      default: 1,
    },
    // 每页条数选项
    pageSizes: {
      type: Array,
      default: () => [20, 50, 100]
    }
  },
  data() {
    return {
      Page: 1,
    };
  },
  methods: {
    // 页码改变
    handlePageChange(e) {
      this.$emit("PageChange", e);
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.$emit("PageSizeChange", val);
    },
  },
};
</script>

<style></style>
