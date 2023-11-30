<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="account" :label="$t('AccountName')" width="250" />
      <el-table-column prop="alipay" :label="$t('Alipayaccount')" width="200" />
      <el-table-column
        prop="bankCardNo"
        :label="$t('Bankaccount')"
        width="200"
      />
      <el-table-column prop="bankName" :label="$t('BankName')" width="200" />
      <el-table-column prop="channelId" :label="$t('ChannelID')" width="200" />
      <el-table-column
        prop="coin"
        :label="$t('Virtualcoinaddress')"
        width="200"
      />
      <el-table-column prop="wechat" :label="$t('WeChataccount')" width="200" />
      <el-table-column prop="type" :label="$t('Channeltype')" width="200" />
      <el-table-column prop="" :label="$t('state')" width="150">
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

      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
            >{{ $t("delete") }}</el-button
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
  methods: {
    // 删除事件
    getroledel(Id) {
      this.$confirm("确定删除此条配置吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("delete", Id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit("eitor", item);
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit("updateStatus", { status: e, id: Id });
    },
  },
};
</script>
    
    <style>
</style>