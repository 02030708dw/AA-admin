<template>
  <el-row style="padding-bottom: 10px">
    <!-- 代理名称 -->
    <el-input v-model="agentName" style="width: 200px; margin-right: 10px" :placeholder="$t('代理名称')" clearable />

    <!-- 网站名称 -->
    <el-input v-model="name" style="width: 200px; margin-right: 10px" :placeholder="$t('网站名称')" clearable />

    <!-- 域名 -->
    <el-input v-model="domainName" style="width: 200px; margin-right: 10px" :placeholder="$t('域名')" clearable />

    <!-- 广告类型 -->
    <el-select v-model="adType" :placeholder="$t('广告类型')" style="width: 200px; margin-right: 10px" clearable>
      <el-option :value="1" :label="$t('刮刮乐')" />
      <el-option :value="2" :label="$t('红包')" />
      <el-option :value="3" :label="$t('彩票')" />
    </el-select>

    <!-- 域名状态 -->
    <el-select v-model="domainStatus" :placeholder="$t('域名状态')" style="width: 200px; margin-right: 10px" clearable>
      <el-option :value="1" :label="$t('未申请')" />
      <el-option :value="2" :label="$t('已申请')" />
      <el-option :value="3" :label="$t('通过')" />
      <el-option :value="4" :label="$t('拒绝')" />
    </el-select>

    <!-- 查询/刷新按钮 -->
    <el-button type="primary" @click="getquery">{{ $t('查询') }}</el-button>
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
      {{ $t('刷新') }}
    </el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>
      {{ $t('刷新') }}
    </el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      agentName: '',
      name: '',
      domainName: '',
      adType: null,
      domainStatus: null,
      btnIcoType: true,
    }
  },
  methods: {
    getquery() {
      this.$emit('query', {
        agentName: this.agentName,
        name: this.name,
        domainName: this.domainName,
        adType: this.adType,
        domainStatus: this.domainStatus
      })
    },
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    getresetting() {
      this.agentName = ''
      this.name = ''
      this.domainName = ''
      this.adType = null
      this.domainStatus = null
      this.$emit('resetting')
    }
  }
}
</script>
