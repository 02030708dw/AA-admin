<template>
  <el-card class="card_box">
    <div class="container_box">
      <div class="item_box">
        <Agent />
      </div>
      <div class="item_box">
        <Gamer/>
      </div>
      <div class="item_box">
        <Member/>
      </div>
      <div class="item_box">
        <Platform/>
      </div>
      <!-- <daily />

      <Monthlyreport /> -->

    </div>

  </el-card>
</template>

<script>
// 平台日报
import Agent from './Agent.vue'
import Gamer from './Gamer.vue'
import Member from './Member.vue'
import Platform from './Platform.vue'
export default {
  components: {
    Agent,
    Gamer,
    Member,
    Platform
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
  .item_box{
    width: 49%;
  }
  .item_box:nth-child(n+3){
    margin-top: 20px;
  }
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
