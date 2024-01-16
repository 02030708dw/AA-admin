<template>
  <el-row style="display: flex; justify-content: center">
    <!-- <el-pagination
      :page-size="pageSize"
      :current-page="pageNo"
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChange"
    /> -->

    <el-pagination
      :current-page="pageNo"
      :page-sizes="[20, 30, 40, 50, 60, 70, 80, 90, 100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />

  </el-row>
  <!-- 分页组件 -->
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 1
    },
    // 页码
    pageNo: {
      type: Number,
      default: 1
    },
    // 每页数量
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      Page: 1
    }
  },
  methods: {
    // 页码改变
    handlePageChange(e) {
      console.log(e)
      this.$emit('PageChange', e)
    },
    // 每页N条
    handleSizeChange(val) {
      this.$emit('PageSizeChange', val)
    }
  }
}
</script>

<style>
</style>
