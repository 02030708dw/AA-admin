<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="userName" style="width: 200px;margin-right: 10px;" :placeholder="$t('username')" />
    <el-input v-model="userPhone" style="width: 200px;" :placeholder="$t('phone')" />
    <el-select
      v-model="agentId"
      :placeholder="$t('SelectProxy')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in agentIddata"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-select
      v-model="status"
      :placeholder="$t('state')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in statusType"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-button v-has="'membermag:page'" style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh') }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
// 获取代理id
// import { AgentPage } from '@/api/account/agent'
export default {
  name: 'Control',
  props: {
    agentIddata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      agentId: '',
      userPhone:'',
      userName: '',
      status: null,
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ],
      btnIcoType: true,
      // agentIddata: []
    }
  },
  created() {
    
  },
  methods: {
    // // 获取代理id
    // getAgentPage() {
    //   this.agentIddata = []
    //   AgentPage({ pageNo: 1, pageSize: 100000 }).then(res => {
    //     for (let i = 0; i < res.resultSet.data.length; i++) {
    //       this.agentIddata.push({
    //         title: res.resultSet.data[i].userName,
    //         index: res.resultSet.data[i].id
    //       })
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    getquery() {
      this.$emit('Memquery', {
        agentId: this.agentId,
        userName: this.userName,
        userPhone:this.userPhone,
        status: this.status
      })
    },
    getresetting() {
      this.agentId = ''
      this.userName = ''
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
    }
  }
}
</script>

<style></style>
