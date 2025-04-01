<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="memberName" :label="$t('Membername')" />
      <el-table-column prop="ifsc" label="IFSC" width="" />

      <el-table-column prop="" :label="$t('Withdrawalinformation')" width="400">
        <template slot-scope="scope">
          <div class="info_box">
            <div v-if="scope.row.bankName" class="item_box">
              <div class="item_title">{{ $t("Nameofwithdrawalbank") }}:</div>
              <div class="item_conent">{{ scope.row.bankName }}</div>
            </div>
            <div v-if="scope.row.bankCardNo" class="item_box">
              <div class="item_title">
                {{ $t("Withdrawalbankcardnumber") }}:
              </div>
              <div class="item_conent">{{ scope.row.bankCardNo }}</div>
            </div>
            <div v-if="scope.row.alipay" class="item_box">
              <div class="item_title">{{ $t("Alipayaccount") }}:</div>
              <div class="item_conent">{{ scope.row.alipay }}</div>
            </div>
            <div v-if="scope.row.wechat" class="item_box">
              <div class="item_title">{{ $t("WeChataccount") }}:</div>
              <div class="item_conent">{{ scope.row.wechat }}</div>
            </div>
            <div v-if="scope.row.coin" class="item_box">
              <div class="item_title">{{ $t("Virtualcoinaddress") }}:</div>
              <div class="item_conent">{{ scope.row.coin }}</div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="updatedAt" :label="$t('Updatetime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
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

.status_box {

  .text_box {
    font-size: 10px;
  }
}

.info_box {
  margin: 0 auto;
  width: 400px;

  .item_box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item_title {
      font-size: 16px;
      font-weight: 510;
      width: 150px;
      text-align: right;
    }

    .item_conent {
      margin-left: 5px;
      font-size: 16px;
      font-weight: 520;
      text-align: left;
    }
  }
}
</style>
