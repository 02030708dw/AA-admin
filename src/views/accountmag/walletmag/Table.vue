<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="id" :label="$t('id')" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
      <el-table-column prop="gamerCode" label="gamerCode" />
      <el-table-column prop="userName" label="userName" />

      <!-- 折叠面板 -->
      <el-table-column width="450">
        <template v-slot="{ row }">
          <el-collapse>
            <el-collapse-item title="钱包信息">
              <!-- 在折叠面板内嵌套表格 -->
              <el-table :data="[row]" style="width: 100%">
                <el-table-column prop="msg" label="钱包异常" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </template>
      </el-table-column>

      <el-table-column :label="$t('operate')" width="200">
        <template v-slot="{ row }">
          <el-button type="text" style="color: #ff0000" @click="getCreate(row)">
            重新创建
          </el-button>
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
    getCreate(row) {
      this.$emit("getCreate", row);
    },
  },
};
</script>

<style></style>
