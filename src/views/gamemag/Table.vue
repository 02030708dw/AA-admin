<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="name" :label="$t('name')" width="200" />
      <el-table-column prop="threeId" :label="$t('ThirdpartyID')" width="200" />

      <el-table-column prop="type" :label="$t('typesof')" width="200" />

      <el-table-column prop="" :label="$t('state')" width="150">
        <template slot-scope="scope">
          <div>
            <el-switch
              @change="getupdateStatus($event, scope.row.id)"
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>
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
  methods: {
    // 删除
    getdel(id) {
      this.$emit("gamedel", id);
    },
    // 编辑
    getEitor(item) {
      this.$emit("gameeitor", item);
    },
    // 改变状态
    getupdateStatus(status, Id) {
      this.$emit("updateStatus", { status: status, id: Id });
    },
  },
};
</script>

<style>
</style>