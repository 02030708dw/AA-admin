<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="channelId" :label="$t('ChannelID')" width="" />
      <el-table-column prop="account" :label="$t('AccountName')" width="" />
      <el-table-column prop="alipay" :label="$t('Alipayaccount')" width="" />
      <el-table-column
        prop="bankCardNo"
        :label="$t('Bankaccount')"
        width=""
      />
      <el-table-column prop="bankName" :label="$t('BankName')" width="" />
      <el-table-column
        prop="coin"
        :label="$t('Virtualcoinaddress')"
        width=""
      />
      <el-table-column prop="wechat" :label="$t('WeChataccount')" width="" />
      <el-table-column prop="" :label="$t('Channeltype')" width="">
        <template slot-scope="scope">
          <div>
            {{ scope.row.type | TypeF }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="200">
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

      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>

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
  methods: {
    // 删除事件
    getroledel(Id) {
      this.$confirm('确定删除此条配置吗?', '提示', {
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
  },
  filters: {
    TypeF(value) {
      switch (value) {
        case 0:
          return '银行卡'
        case 1:
          return '支付宝'
        case 2:
          return '微信'
        case 3:
          return '虚拟币'
      }
    }
  }
}
</script>

    <style>
</style>
