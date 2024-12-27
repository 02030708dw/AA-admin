<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="userName" :label="$t('username')" width="" />
      <el-table-column prop="password" :label="$t('password')" width="" />
      <el-table-column prop="realName" :label="$t('name')" width="" />
      <el-table-column prop="telPhone" :label="$t('phone')" width="" />
      <el-table-column prop="firstLevelDailyRate" :label="$t('一级日盈利率')" width="" />
      <el-table-column prop="secondLevelDailyRate" :label="$t('二级日盈利率')" width="" />
      <el-table-column prop="email" :label="$t('邮箱')" width="" />
      <el-table-column prop="parentId" :label="$t('parentId')" width="" />
      <el-table-column v-has="'agent:status'" prop="" :label="$t('state')" width="200">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
              :active-text="$t('Enable')" :inactive-text="$t('Deactivate')"
              @change="getupdateStatus($event, scope.row.id)" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-has="'Currency:edit'" type="text" @click="getEitor(scope.row)">{{
            $t("edit")
          }}</el-button>
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("Transfersubordinateagents")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="$t('Selectthawingtype')" :show-close="false" :close-on-click-modal="false"
      :visible.sync="dialogVisible" width="30%">
      <el-row>
        <label>冻结/解冻类型:</label>
        <el-select v-model="item.type" style="margin-left: 10px" placeholder="请选择类型">
          <el-option value="1" label="只冻结/解冻代理" />
          <el-option value="2" label="冻结/解冻代理以及代理下的所有会员" />
        </el-select>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancellation()">{{ $t("cancellation") }}</el-button>
        <el-button type="primary" @click="getconfirm()">{{
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
      item: {
        status: null,
        id: '',
        type: null
      },
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.dialogVisible = true
      this.item.status = e
      this.item.id = Id
    },
    getconfirm() {
      this.$emit('updateStatus', this.item)
      this.item = {
        status: null,
        id: '',
        type: null
      }
      this.dialogVisible = false
    },
    // 取消

    cancellation() {
      this.tableData.forEach(v => {
        if (v.id == this.item.id) {
          if (this.item.status == 0) {
            v.status = 1
          } else {
            v.status = 0
          }
        }
      })
      // this.$emit('updateStatus', this.item)
      // this.item = {
      //   status: null,
      //   id: '',
      //   type: null
      // }
      this.dialogVisible = false
    },
    geteroleEitor(item) {
      this.$emit('transfer', item)
    },
    getEitor(item) {
      this.$emit('Edit', item)
    }
  }
}
</script>

<style></style>
