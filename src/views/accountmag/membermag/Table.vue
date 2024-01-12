<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="userName" :label="$t('username')" width="" />

      <!-- <el-table-column prop="password" :label="$t('password')" width="" /> -->
      <el-table-column prop="telPhone" :label="$t('phone')" width="" />
      <el-table-column prop="nickeName" :label="$t('nickeName')" width="" />
      <el-table-column prop="realName" :label="$t('name')" width="" />
      <el-table-column
        prop="parentMemberId"
        :label="$t('parentMemberId')"
        width=""
      />
      <el-table-column prop="agenId" :label="$t('agenId')" width="" />
      <el-table-column prop="plugUrl" :label="$t('plugUrl')" width="" />

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
      <el-table-column prop="" label="会员信息" width="">
        <template slot-scope="scope">
          <el-button type="text" @click="MemberInfo(scope.row)">会员详情</el-button>
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
  name: 'Table',
  filters: {
    Channeltype(value) {
      switch (value) {
        case 0:
          return '冻结'
        case 1:
          return '正常'
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
    // 编辑事件
    Membershiptransfer(item) {
      this.$emit('Membershiptransfer', item)
    },
    Proxytransfer(item) {
      this.$emit('Proxytransfer', item)
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, id: Id })
    },
    // 会员详情
    MemberInfo(data) {
      this.$emit('Info', data)
    }
  }
}
</script>

    <style>
</style>
