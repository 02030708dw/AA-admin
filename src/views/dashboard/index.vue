<template>
  <el-card class="card_box">
    <div class="container_box">

      <daily />

      <Monthlyreport />

    </div>

  </el-card>
</template>

<script>
// 平台日报
import daily from './daily.vue'
// 平台月报
import Monthlyreport from './Monthlyreport.vue'
export default {
  components: {
    daily,
    Monthlyreport
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.container_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
