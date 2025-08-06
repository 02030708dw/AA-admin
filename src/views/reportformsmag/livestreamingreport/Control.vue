<template>
  <el-row style="padding-bottom: 10px">
    <!-- 选择代理 -->
    <el-select v-model="userId" clearable :placeholder="$t('SelectProxy')" style="width: 200px;margin-left:20px;">
      <el-option v-for="(item, index) in AgentPagesList" :key="index" :value="item.index" :label="item.title" />
    </el-select>

    <!-- 类型选择 -->
    <el-select v-model="type" style="margin-left: 10px" placeholder="请选择类型">
      <el-option value="1" label="刮刮乐" />
      <el-option value="2" label="宾果" />
    </el-select>

    <!-- 查询按钮 -->
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">
      {{ $t('query') }}
    </el-button>

    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
      {{ $t('Refresh') }}
    </el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>
      {{ $t('Refresh') }}
    </el-button>
  </el-row>
</template>

<script>
import { AgentPage } from '@/api/account/agent'

export default {
  name: 'Control',
  data() {
    return {
      userId: null,
      type: '1',
      btnIcoType: true,
      AgentPagesList: []
    }
  },
  created() {
    this.HandelAgentPages()
  },
  methods: {
    // 获取代理信息
    HandelAgentPages() {
      this.AgentPagesList = []
      AgentPage({ pageNo: 1, pageSize: 1000000 }).then(res => {
        this.AgentPagesList = res.resultSet.data.map(item => ({
          title: item.userName,
          index: item.id
        }))
      }).catch((err) => {
        console.log(err)
      })
    },
    // 查询按钮
    getquery() {
      this.$emit('query', { type: this.type, userId: this.userId })
    },
    // 刷新按钮
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 控制按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    // 重置
    getresetting() {
      this.userId = null
      this.type = null
      this.$emit('resetting')
    },
  }
}
</script>
