<template>
  <el-card>
    <Control @changeShow="changeShow" />
    <Table :select="select" @changeShow="changeSelect" />
    <!-- 新增弹窗 -->
    <DialogApprove :show="show" @cancel="getcancel" />
  </el-card>
</template>

<script>

// 新增路由弹窗
import DialogApprove from './DialogApprove.vue'
import Control from './Control'
import Table from './Table'
export default {
  components: {
    DialogApprove,
    Control,
    Table
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 新增弹窗状态
      show: false,
      showUpdate: false,
      // 查询
      select: true
    }
  },

  methods: {
    /*
    *  修改数据值
    */
    changeShow() {
      this.show = true
    },
    changeSelect(Boolean) {
      this.select = Boolean
    },
    // 取消添加事件
    getcancel() {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
</style>
