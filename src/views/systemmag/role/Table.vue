<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="SerialNumber" width="120" />
      <el-table-column prop="roleName" label="RoleName" width="200" />
      <el-table-column prop="code" label="RoleCode" width="200" />
      <el-table-column prop="" label="state" width="150">
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
      <el-table-column prop="createdAt" label="Creationtime" width="180" />
      <el-table-column prop="updatedAt" label="Updatetime" width="180" />
      <el-table-column prop="updater" label="Updatedby" width="180" />
      <el-table-column prop="remark" label="notes" width="180" />
      <el-table-column prop="" label="operate" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)"
            >edit</el-button
          >
          <!-- <el-button type="text" style="color: #e6a23c">权限</el-button> -->

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
            >delete</el-button
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
      visible: false,
    };
  },
  methods: {
    // 更新角色状态
    getupdateStatus(e, Id) {
      this.$emit("updateStatus", { status: e, Id: Id });
    },
    // 删除角色
    getroledel(Id) {
      this.$emit("roledel", Id);
    },
    // 编辑角色
    geteroleEitor(item) {
      this.$emit("roleEditor", item);
    },
  },
};
</script>

<style>
</style>