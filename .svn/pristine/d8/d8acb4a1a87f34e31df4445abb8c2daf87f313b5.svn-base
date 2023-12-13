<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="120" />
      <el-table-column prop="roleName" :label="$t('RoleName')" width="" />
      <el-table-column prop="code" :label="$t('RoleCode')" width="" />
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              @change="getupdateStatus($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        :label="$t('Creationtime')"
        width="180"
      />
      <el-table-column prop="updatedAt" :label="$t('Updatetime')" width="180" />
      <el-table-column prop="updater" :label="$t('Updatedby')" width="180" />
      <el-table-column prop="remark" :label="$t('notes')" width="180" />
      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>
          <!-- <el-button type="text" style="color: #e6a23c">权限</el-button> -->

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
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
      visible: false
    }
  },
  methods: {
    // 更新角色状态
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, Id: Id })
    },
    // 删除角色
    getroledel(Id) {
      this.$confirm('确定删除此角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('roledel', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑角色
    geteroleEitor(item) {
      this.$emit('roleEditor', item)
    }
  }
}
</script>

<style>
</style>
