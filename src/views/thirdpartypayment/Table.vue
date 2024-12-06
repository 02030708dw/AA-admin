<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="sort" :label="$t('sort')" width="" />
      <el-table-column prop="threeName" :label="$t('ThreePartyNames')" width="" />
      <el-table-column prop="currency" :label="$t('Currency')" width="" />
      <el-table-column prop="account" :label="$t('account')" width="" />
      <el-table-column prop="secret" :label="$t('secretkey')" width="" />
      <el-table-column prop="apiUrl" :label="$t('calladdress')" width="" />
      <el-table-column prop="javaBean" label="javaBean" width="" />
      <el-table-column
        prop="onepayMerchantId"
        label="onepayMerchantId"
        width=""
      />

      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e6a23c"
            v-has="'thirdpartypayment:edit'"
            @click="getEitor(scope.row)"
            >{{ $t("edit") }}</el-button
          >
          <el-button
            type="text"
            style="color: red"
            v-has="'thirdpartypayment:del'"
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
    getdel(id) {
      this.$confirm("确定删除此用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("getdel", id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getEitor(row) {
      this.$emit("getEitor", row);
    },
  },
};
</script>

<style></style>
