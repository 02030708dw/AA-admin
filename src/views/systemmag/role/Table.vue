<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" :label="$t('SerialNumber')" width="120" />
      <el-table-column prop="roleName" :label="$t('RoleName')" width="" />
      <el-table-column prop="code" :label="$t('RoleCode')" width="" />
      <el-table-column prop="" :label="$t('state')" width="" v-has="'role:status'">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
            :active-text="$t('Enable')" :inactive-text="$t('Deactivate')" @change="getupdateStatus($event, scope.row.id)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" :label="$t('Updatetime')" width="180">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('Updatedby')" width="180" />
      <el-table-column prop="remark" :label="$t('notes')" width="180" />
      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geterolePermission(scope.row)">
            {{$t('Bindpermissions')}}
          </el-button>
          <el-button v-has="'role:edit'" type="text" @click="geteroleEitor(scope.row)">
            {{ $t("edit") }}
          </el-button>
          <!-- <el-button type="text" style="color: #e6a23c">权限</el-button> -->
          <el-button v-has="'role:del'" slot="reference" type="text" style="color: red"
            @click="getroledel(scope.row.id)">{{ $t("delete")
            }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="50%" :title="$t('addpermission')" :visible.sync="dialogFormVisible">
      <!-- <el-form>
        <el-form-item :label="$t('route.RightsManagement')">
          <el-checkbox-group v-model="authorityIds">
            <el-checkbox v-for="(item, index) in authorityList" :key="index" :label="item.id">
              {{ item.authorityName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form> -->
      <el-tree ref="treeRef" :data="authorityList" :default-checked-keys="authorityIds"
        node-key="id" show-checkbox @check="checkChange" :props="{ children: 'children', label: 'authorityName' }
      "></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="getconfirm">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
import { getAuthorityTtree, addAssignment } from '@/api/systemmag/role'
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
      visible: false,
      loading: false,
      //角色绑定权限
      roleId: 0,
      authorityList: [],
      authorityIds: [],
      dialogFormVisible: false,
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
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
    },
    //绑定权限
    geterolePermission(item) {
      this.authorityList = []
      this.authorityIds = []
      this.dialogFormVisible = true
      this.roleId = item.id
      getAuthorityTtree(item.id).then(res => {
        this.authorityList = res.resultSet
        this.getAuthorityIds(this.authorityList)
        console.log(this.authorityIds);
      })
    },
    // 获取权限
    getAuthorityIds(item) {
      item.forEach(v => {
        if (v.children && v.children.length > 0) {
          this.getAuthorityIds(v.children)
        } else if (v.isCheck) {
          this.authorityIds.push(v.id)
        }
      })
    },
    checkChange(data, node) {
      this.authorityIds = node.checkedKeys
      console.log(this.authorityIds, 'this.authorityIds');
      console.log(node)
    },
    getconfirm() {
      let authorityIds = [...this.authorityIds, ...this.$refs.treeRef.getHalfCheckedKeys()] //选中,半选中
      // 关闭弹窗
      this.dialogFormVisible = false;
      this.$emit("roleAuthority", { authorityIds, roleId: this.roleId })
    },
  }
}
</script>

<style></style>
