<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="name" :label="$t('name')" width="" />
      <el-table-column prop="threeId" :label="$t('ThirdpartyID')" width="" />

      <el-table-column prop="" :label="$t('typesof')" width="">
        <template slot-scope="scope">
          <div>
            {{ scope.row.type | TypeF }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('PopularGames')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.isHot"
              active-text="热门"
              inactive-text="普通"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              @change="getupdateisHot($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-select
              v-model="scope.row.status"
              :placeholder="$t('state')"
              style="width: 150px;margin-left: 10px"
              @change="getupdateStatus($event, scope.row.id)"
            >
              <el-option
                v-for="(item, index) in statusType"
                :key="index"
                :value="item.index"
                :label="item.title"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="" />
      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="getEitor(scope.row)">{{
            $t("edit")
          }}</el-button>

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getdel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
  filters: {
    TypeF(value) {
      switch (value) {
        case 0:
          return '未分类'
        case 1:
          return '真人'
        case 2:
          return '体育'
        case 3:
          return '老虎机'
        case 4:
          return '棋牌'
        case 5:
          return '彩票'
      }
    }
  },
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
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 },
        { title: '游戏商维护中', index: 2 }
      ],
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 删除
    getdel(id) {
      this.$confirm('确定删除此款游戏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('gamedel', id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑
    getEitor(item) {
      this.$emit('gameeitor', item)
    },
    // 改变状态
    getupdateStatus(status, Id) {
      this.$emit('updateStatus', { status: status, id: Id })
    },
    // 修改热门游戏
    getupdateisHot(status, Id) {
      this.$emit('getisHot', { isHot: status, gameId: Id })
    }
  }
}
</script>

<style>
</style>
