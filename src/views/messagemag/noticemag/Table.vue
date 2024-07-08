<template>
  <el-card>
    <el-table
      v-loading="loading"
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
              :active-value="1"
              :inactive-value="0"
              active-text="发布"
              inactive-text="撤销"
              @change="getupdateStatus($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
        <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="280">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e6a23c"
            @click="getEitor(scope.row)"
          >{{ $t("edit") }}</el-button>

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getdel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 状态修改弹窗 -->
    <el-dialog
      :title="$t('PublishRevoke')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="gethandelClose"
    >
      <el-row style="display: flex; align-items: center">
        <el-col :span="4">{{
          UdateStatusData.status ? $t("publisher") : $t("Revocationby")
        }}</el-col>
        <el-col
          :span="18"
        ><el-input
          v-model="operator"
          :placeholder="$t('Pleaseentertheoperator')"
        /></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("cancellation")
        }}</el-button>
        <el-button type="primary" @click="getupdateStatusok">{{
          $t("determine")
        }}</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      UdateStatusData: {
        status: '',
        id: ''
      },
      operator: '',
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 编辑
    getEitor(item) {
      this.$emit('NoticeEitor', item)
    },
    // 删除
    getdel(id) {
      this.$confirm('确定删除此公告吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('NoticeDel', id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 状态修改
    getupdateStatus(status, id) {
      this.dialogVisible = !this.dialogVisible
      this.UdateStatusData.status = status
      this.UdateStatusData.id = id
    },
    getupdateStatusok() {
      if (!this.operator) {
        return this.$message.error('请输入操作人!')
      }
      this.$emit('NoticeUpdateStatus', {
        status: this.UdateStatusData.status,
        id: this.UdateStatusData.id,
        publisher: this.UdateStatusData.status ? this.operator : '',
        canceler: this.UdateStatusData.status ? '' : this.operator
      })
      this.dialogVisible = !this.dialogVisible
    },
    gethandelClose() {
      this.operator = ''
      this.$emit('UdateStatusClose')
    }
  }
}
</script>2509960727Zmy

<style>
</style>
