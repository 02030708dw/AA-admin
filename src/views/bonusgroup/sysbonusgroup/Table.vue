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
      <el-table-column prop="groupName" :label="$t('奖金组名称')" />
      <el-table-column prop="description" :label="$t('奖金组描述')" />
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
      <el-table-column prop="creator" :label="$t('创建人')" />
      <el-table-column prop="updater" :label="$t('更新人')" />
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-has="'noticetypemag:status'"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              :active-text="$t('Enable')"
              :inactive-text="$t('Deactivate')"
              @change="getUdateStatus($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="" :label="$t('operate')" width="120">
        <template slot-scope="scope">
          <el-button
            v-has="'activity:edit'"
            type="text"
            style="color: #e6a23c"
            @click="getEditor(scope.row)"
            >{{ $t("详情") }}</el-button
          >

          <el-button
            v-has="'Currency:del'"
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
            >{{ $t("delete") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "Table",
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
    // 详情
    getEditor(item) {
      this.$emit("EditorShow", item);
    },
    // 删除
    getroledel(id) {
      this.$confirm("确定删除此奖金组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("delete", id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    geteroleEitor(item) {
      this.$emit("eitor", item);
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
