<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column
        prop="title"
        :label="$t('AnnouncementTitle')"
        width="350"
      />
      <el-table-column prop="createdAt" :label="$t('Updatetime')" width="350" />
      <el-table-column prop="status" :label="$t('PublishRevoke')" width="300">
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
      <el-table-column prop="" :label="$t('operate')" width="280">
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
    // 编辑
    getEitor(item) {
      this.$emit("NoticeEitor", item);
    },
    // 删除
    getdel(id) {
      this.$emit("NoticeDel", id);
    },
    //状态修改
    getupdateStatus(status, id) {
      this.$emit("NoticeUpdateStatus", { status: status, id: id });
    },
  },
};
</script>

<style>
</style>