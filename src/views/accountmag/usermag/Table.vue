<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="100" />
      <el-table-column prop="userName" :label="$t('name')" width="280" />
      <el-table-column prop="telPhone" :label="$t('phone')" width="300" />
      <el-table-column prop="" :label="$t('state')" width="240">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              @change="getupdateStatus($event, scope.row.id)"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button
            @click="getEitor(scope.row)"
            type="text"
            style="color: #e6a23c"
            >{{ $t("edit") }}</el-button
          >
          <el-button
            @click="getdel(scope.row.id)"
            type="text"
            style="color: red"
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
    getdel(id) {
      this.$emit("userdel", id);
    },
    getupdateStatus(status, Id) {
      this.$emit("updateStatus", { status: status, id: Id });
    },
    getEitor(item) {
      this.$emit("usereitor", item);
    },
  },
};
</script>

<style>
</style>