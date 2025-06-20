<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="name" :label="$t('name')" />
      <el-table-column prop="dailyGift" label="每日赠送投注次数" />
      <el-table-column prop="description" :label="$t('describe')" />
      <el-table-column prop="gwMerchantCode" label="gw商户code" />
      <el-table-column prop="rechargeBonus" label="每个充值用户奖励的奖金（代理）" />
      <el-table-column prop="rechargeNumbers" label="每个充值用户奖励的投注次数" />
      <el-table-column prop="registrationBonus" label="每个注册用户奖励的奖金（代理）" />
      <el-table-column prop="registrationNumbers" label="每个注册用户奖励的投注次数" />
      <el-table-column prop="updatedAt" :label="$t('Updatetime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="#13ce66"
              :active-text="$t('Enable')" :inactive-text="$t('Deactivate')"
              @change="getUdateStatus($event, scope.row)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">{{
            $t("edit") }}</el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">{{ $t("delete")
          }}</el-button>
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
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 编辑
    getEditor(item) {
      this.$emit('EditorShow', item)
    },
    // 删除
    getEdl(Id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('Edl', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改状态
    getUdateStatus(e, item) {
      item.status = e
      this.$emit('UdateStatus', item)
    },
  }
}
</script>

<style lang="scss" scoped>
.image_box {
  margin: auto;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
