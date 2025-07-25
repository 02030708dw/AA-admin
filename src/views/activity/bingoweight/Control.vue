<template>
  <el-row style="padding-bottom: 10px" :gutter="10" align="middle">
    <el-button type="primary" @click="getAdd">添加</el-button>
    <el-input v-model="name" placeholder="请输入权重组名称" clearable style="width: 200px; margin: 0 10px;" />
    <el-button type="primary" @click="getquery">查询</el-button>
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
      刷新
    </el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>
      刷新
    </el-button>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      btnIcoType: true,
    };
  },
  methods: {
    getAdd() {
      this.$emit('ControlAdd');
    },
    getquery() {
      this.$emit('query', {
        name: this.name,
      });
    },
    HandelRefresh() {
      this.$emit('Refresh');
      this.btnIcoType = false;
    },
    HandelBtnStatus() {
      this.btnIcoType = true;
    },
  },
};
</script>
