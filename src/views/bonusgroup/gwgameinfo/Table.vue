<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="80" />
      <el-table-column prop="gameName" :label="$t('游戏名称')" />
      <el-table-column prop="gamePlayName" :label="$t('玩法名称')" />
      <el-table-column prop="gamePlayTypeName" :label="$t('游戏类型名称')" />
      <el-table-column :label="$t('展示标识')">
        <template slot-scope="scope">
          <!-- <div>
            {{ scope.row.sign | TypeF }}
          </div> -->
          <el-switch
            v-has="'activity:status'"
            v-model="scope.row.sign"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            :active-text="$t('展示')"
            :inactive-text="$t('不展示')"
            @change="getUdateStatus($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="winAmount" :label="$t('单注中奖金额')" />
      <el-table-column prop="createdAt" :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" :label="$t('Updatetime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('更新人')" />
      <el-table-column fixed="right" prop="" :label="$t('operate')" width="120">
        <template slot-scope="scope">
          <el-button
            v-has="'Currency:edit'"
            type="text"
            @click="geteroleEitor(scope.row)"
            >{{ $t("edit") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "Table",
  filters: {
    TypeF(value) {
      switch (value) {
        case 0:
          return "不展示";
        case 1:
          return "展示";
      }
    },
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status;
    },
    // 编辑
    geteroleEitor(item) {
      this.$emit("eitor", item);
    },
    // 修改状态
    getUdateStatus(e, item) {
      item.status = e;
      this.$emit("UdateStatus", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.image_box {
  margin: auto;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
