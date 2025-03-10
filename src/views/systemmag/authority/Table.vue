<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" />
      <el-table-column
        prop="authorityName"
        :label="$t('PermissionName')"
      />
      <el-table-column prop="id" :label="$t('PermissionID')" />
      <el-table-column prop="code" :label="$t('Permissioncode')" />
      <el-table-column
        prop="parentId"
        :label="$t('ParentnodeID')"
      />
      <el-table-column prop="" :label="$t('Permissiontype')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.type | AuthorityType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" :label="$t('Notes')" />

      <el-table-column prop="" v-has="'authority:status'" :label="$t('state')" width="200">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              :active-text="$t('Enable')" :inactive-text="$t('Deactivate')"
              @change="getupdateStatus($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')">
        <template slot-scope="scope">
          <el-button v-has="'authority:edit'" type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>
          <el-button
          v-has="'authority:del'"
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
  filters: {
    AuthorityType(value) {
      switch (value) {
        case 1:
          return '菜单'
        case 2:
          return '按钮'
        case 3:
          return '功能'
      }
    }
  },
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
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 删除事件
    getroledel(Id) {
      this.$confirm('确定删除此条权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit('eitor', item)
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, id: Id })
    }
  }
}
</script>

<style>
</style>
