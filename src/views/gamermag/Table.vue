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
        prop="name"
        :label="$t('GameMerchantName')"
        width="200"
      />
      <el-table-column
        prop="betUrl"
        :label="$t('Bettinginformationinterfaceaddress')"
        width="280"
      />
      <el-table-column
        prop="cashUrl"
        :label="$t('Integralinterfaceaddress')"
        width="250"
      />
      <el-table-column
        prop="incomeUrl"
        :label="$t('Rechargeinterfaceaddress')"
        width="250"
      />
      <el-table-column prop="type" :label="$t('typesof')" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.type | GamerType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="150">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="停用"
              @change="getupdateStatus($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>
          <el-button
            slot="reference"
            type="text"
            style="color: #4c8e75"
            @click="getbind(scope.row.id)"
          >{{ $t("Bindgametypes") }}</el-button>
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
  filters: {
    GamerType(value) {
      switch (value) {
        case 1:
          return '真人'
        case 2:
          return '体育'
        case 3:
          return '老虎机'
        case 4:
          return '棋牌'
        case 5:
          return '彩票'
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
  methods: {
    // 删除事件
    getroledel(Id) {
      this.$confirm('确定删除此游戏商?', '提示', {
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
    },
    // 绑定游戏类型
    getbind(id) {
      this.$emit('bind', id)
    }
  }
}
</script>

<style>
</style>
