<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="userName" :label="$t('username')" width="280" />

      <el-table-column prop="password" :label="$t('password')" width="200" />
      <el-table-column prop="telPhone" :label="$t('phone')" width="200" />
      <el-table-column prop="nickeName" :label="$t('nickeName')" width="200" />
      <el-table-column prop="realName" :label="$t('name')" width="200" />
      <el-table-column
        prop="parentMemberId"
        :label="$t('parentMemberId')"
        width="200"
      />
      <el-table-column prop="agenId" :label="$t('agenId')" width="200" />
      <el-table-column prop="plugUrl" :label="$t('plugUrl')" width="200" />

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
          <el-button type="text" @click="Membershiptransfer(scope.row)">{{
            $t("Membershiptransfer")
          }}</el-button>
          <el-button type="text" @click="Proxytransfer(scope.row)">{{
            $t("Proxytransfer")
          }}</el-button>
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
    // 删除事件

    // 编辑事件
    Membershiptransfer(item) {
      this.$emit("Membershiptransfer", item);
    },
    Proxytransfer(item) {
      this.$emit("Proxytransfer", item);
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit("updateStatus", { status: e, id: Id });
    },
  },
  filters: {
    Channeltype(value) {
      switch (value) {
        case 0:
          return "冻结";
        case 1:
          return "正常";
      }
    },
  },
};
</script>
    
    <style>
</style>