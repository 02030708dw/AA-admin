<template>
  <el-row style="padding-bottom: 10px">
    <!-- 代理ID -->
    <el-select v-model="agentId" clearable placeholder="代理" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in agentIdData" :key="index" :value="item.value" :label="item.name" />
    </el-select>
    <!-- 代理名称 -->
    <el-input v-model="agentName" style="width: 200px; margin:0 5px" :placeholder="$t('代理名称')" clearable />

    <!-- 状态：1.待审核，2.通过，3.拒绝 -->
    <el-select v-model="status" :placeholder="$t('状态')" style="width: 200px; margin-left: 10px" clearable>
      <el-option :value="1" :label="$t('待审核')" />
      <el-option :value="2" :label="$t('通过')" />
      <el-option :value="3" :label="$t('拒绝')" />
    </el-select>

    <!-- 类型：1.平台套餐，2.账户余额 -->
    <el-select v-model="type" :placeholder="$t('类型')" style="width: 200px; margin-left: 10px" clearable>
      <el-option :value="1" :label="$t('平台套餐')" />
      <el-option :value="2" :label="$t('账户余额')" />
    </el-select>

    <el-button style="margin-left:10px;" type="primary" @click="getquery()">
      {{ $t('查询') }}
    </el-button>

    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
      {{ $t('刷新') }}
    </el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>
      {{ $t('刷新') }}
    </el-button>
  </el-row>
</template>

<script>
import { AgentPage } from '@/api/account/agent'
export default {
  name: 'Control',
  data() {
    return {
      agentId: null,
      agentName: '',
      status: null,
      type: null,
      btnIcoType: true,
      agentIdData: []
    }
  },
  created() {
    this.getAgentPage()
  },
  methods: {
    // 获取代理id
    getAgentPage() {
      this.agentIdData = []
      AgentPage({ pageNo: 1, pageSize: 100000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.agentIdData.push({
            name: res.resultSet.data[i].userName,
            value: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询
    getquery() {
      this.$emit('query', {
        agentId: this.agentId,
        agentName: this.agentName,
        status: this.status,
        type: this.type
      });
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh');
      this.btnIcoType = false;
    },
    // 按钮状态复位
    HandelBtnStatus() {
      this.btnIcoType = true;
    },
    // 重置（可选）
    getresetting() {
      this.agentId = null;
      this.agentName = '';
      this.status = null;
      this.type = null;
      this.$emit('resetting');
    },
  }
}
</script>
