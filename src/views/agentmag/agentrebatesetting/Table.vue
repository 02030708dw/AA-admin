<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="agentName" label="代理名称" />
      <el-table-column prop="gameType" :label="$t('GameType')">
        <template slot-scope="scope">
          {{ getGamerType(scope.row.gameType) }}
        </template>
      </el-table-column>
      <el-table-column prop="firstLevelRate" label="一级反水率" />
      <el-table-column prop="twoLevelRate" label="二级反水率" />
      <el-table-column prop="threeLevelRate" label="三级反水率" />
      <el-table-column prop="rechargeRate" label="充值反水率" />
      <el-table-column prop="type" label="统计类型">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? '正常统计' : '有效算法' }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" :label="$t('Updatetime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="creator" :label="$t('创建人')" />
      <el-table-column prop="updater" :label="$t('更新人')" />
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">{{
            $t("edit") }}</el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">{{ $t("delete")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getGamerType(i) {
      switch (i) {
        case 0:
          return "未分类";
        case 1:
          return '电子'
        case 2:
          return "棋牌";
        case 3:
          return "彩票";
        case 4:
          return "体育";
        case 5:
          return "真人";
        case 6:
          return "小游戏";
        case 7:
          return '热门'
        case 8:
          return '捕鱼'
        case 9:
          return '斗鸡'
      }
    },
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 编辑
    getEditor(item) {
      this.$emit('EditorShow', item)
    },
    // 删除
    getEdl(Id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('Edl', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改状态
    getUdateStatus(e, item) {
      item.status = e
      this.$emit('UdateStatus', item)
    },
  }
}
</script>

<style lang="scss" scoped>
.image_box {
  margin: auto;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
