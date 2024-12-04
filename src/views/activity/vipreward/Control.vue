<template>
  <el-row style="padding-bottom: 10px">
    <el-button v-has="'demogame:create'" type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-select clearable v-model="repeatable_type" placeholder="领取类型" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 1, title: '领一次' }, { index: 2, title: '每天领取' }]" :key="index"
        :value="item.index" :label="item.title" />
    </el-select>
    <el-select clearable v-model="reward_type" placeholder="奖励类型" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 1, title: '奖金' }, { index: 2, title: '反水' }]" :key="index"
        :value="item.index" :label="item.title" />
    </el-select>
    <el-button v-has="'noticemag:page'" style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
      }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      account: null,
      type: null,
      repeatable_type: null, //领取类型
      reward_type: null,//奖励类型
      btnIcoType: true,
    }
  },
  methods: {
    getAdd() {
      console.log(1);
      this.$emit('ControlAdd')
    },
    // 重置查询
    getresetting() {
      this.status = null
      this.$emit('resetting')
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    getquery() {
      this.$emit('query', { repeatable_type: this.repeatable_type, reward_type: this.reward_type })
    },
  }
}
</script>

<style></style>
