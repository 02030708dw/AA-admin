<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getroleAdd()">新增</el-button>
    <!-- 条件筛选框 -->
    <el-input v-model="code" style="width: 200px;margin-left:10px;" :placeholder="$t('RoleCode')" />
    <el-input v-model="roleName" style="width: 200px;margin-left:10px;" :placeholder="$t('RoleName')" />
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
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      status: null,
      code: '',
      roleName: '',
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ]

    }
  },
  methods: {
    // 新增按钮
    getroleAdd() {
      this.$emit('roleAdd')
    },
    // 查询
    getquery() {
      this.$emit('rolequery', {
        code: this.code,
        roleName: this.roleName,
        status: this.status
      })
    },
    // 重置
    getresetting() {
      this.status = null
      this.code = ''
      this.roleName = ''
      this.$emit('resetting')
    }
  }
}
</script>

<style scoped lang="scss"></style>
