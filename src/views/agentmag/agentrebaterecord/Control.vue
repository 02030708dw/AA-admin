<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="memberName" style="width: 200px; margin:0 5px" :placeholder="$t('username')" />
    <el-input v-model="orderNo" style="width: 200px; margin:0 5px" :placeholder="$t('orderNo')" />
    <el-select v-model="agentId" placeholder="返点目标代理" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in agentIddata" :key="index" :value="item.value" :label="item.name" />
    </el-select>
    <el-select v-model="rebateType" placeholder="返点类型" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ value: 1, name: '充值' }, { value: 2, name: '投注' }]" :key="index"
        :value="item.value" :label="item.name" />
    </el-select>
    <el-select v-model="type" :placeholder="$t('Statistictype')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ value: 1, name: '正常统计' }, { value: 2, name: '有效算法' }]" :key="index"
        :value="item.value" :label="item.name" />
    </el-select>
    <el-button style="margin-left: 10px" type="primary" @click="getquery()"> {{
      $t('query') }} </el-button>
    <!-- 刷新 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
    }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>
<script>
import { AgentPage } from '@/api/account/agent'
export default {
  data() {
    return {
      // 按钮状态
      btnIcoType: true,
      agentId: null,
      memberName: null,
      orderNo: null,
      rebateType: null,
      type: null,
      agentIddata: []
    }
  },
  created() {
    this.getAgentPage()
  },
  methods: {
    // 获取代理id
    getAgentPage() {
      this.agentIddata = []
      AgentPage({ pageNo: 1, pageSize: 100000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.agentIddata.push({
            name: res.resultSet.data[i].userName,
            value: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
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
    // 查询
    getquery() {
      this.$emit('query', { agentId: this.agentId, memberName: this.memberName, orderNo: this.orderNo, rebateType: this.rebateType, type: this.type })
    }
  }
}
</script>
