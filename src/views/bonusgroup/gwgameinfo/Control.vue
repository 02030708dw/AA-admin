<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <el-select clearable v-model="sign" :placeholder="$t('是否展示')" style="width: 200px;margin:0 5px">
      <el-option v-for="(item, index) in [{ index: 1, title: '是' }, { index: 0, title: '否' }]" :key="index"
        :value="item.index" :label="item.title" />
    </el-select>
    <el-input v-model="gameName" style="width: 200px; margin-left: 10px" :placeholder="$t('游戏名称')" />
    <el-input v-model="gamePlayName" style="width: 200px; margin-left: 10px" :placeholder="$t('游戏玩法名称')" />
    <el-input v-model="gamePlayTypeName" style="width: 200px; margin-left: 10px" :placeholder="$t('游戏类型名称')" />
    <el-button style="margin-left: 10px" type="primary" @click="getquery()">{{
      $t("query")
    }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t("resetting") }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t("Refresh")
    }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{
      $t("Refresh")
    }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: "Control",
  data() {
    return {
      gameName: null, // 游戏名称
      gamePlayName: null, //游戏玩法名称
      gamePlayTypeName: null, //游戏类型名称
      btnIcoType: true,
      sign: null,
    };
  },
  methods: {
    // 添加
    getAdd() {
      this.$emit("Add");
    },
    // 条件查询
    getquery() {
      this.$emit("query", {
        gameName: this.gameName,
        gamePlayName: this.gamePlayName,
        gamePlayTypeName: this.gamePlayTypeName,
        sign: this.sign,
      });
    },
    // 重置查询
    getresetting() {
      this.gameName = null;
      this.gamePlayName = null;
      this.gamePlayTypeName = null;
      this.sign = null;
      this.$emit("resetting");
    },
    // 刷新
    HandelRefresh() {
      this.$emit("Refresh");
      this.btnIcoType = false;
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true;
    },
  },
};
</script>

<style></style>
