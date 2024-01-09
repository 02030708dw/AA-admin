<template>
  <el-card>
    <Control ></Control>
    <Table></Table>
    <Pagination></Pagination>
  </el-card>
</template>
<script >
// 组件
import Control from './Control.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Table from './Table.vue'
// 接口
import {MemBerrebatesPages,MemBerrebatesAdd,MemBerrebatesDel,MemBerrebatesUpda} from '../../../api/account/memberrebates'
export default {
  components: { Pagination, Control, Table },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
