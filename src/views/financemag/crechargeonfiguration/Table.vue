<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="channelName" :label="$t('Channelname')" width="" />
      <el-table-column prop="account" :label="$t('AccountName')" width="" />
      <el-table-column prop="currency" :label="$t('Currency')" width="" />
      <el-table-column  label="充值信息" width="500">
        <template slot-scope="scope">
          <div class="info_box">
            <div v-if="scope.row.alipay" class="item_box">
              <div class="item_title">{{ $t('Alipayaccount') }}:</div>
              <div class="item_conent">{{ scope.row.alipay }}</div>
            </div>
            <div v-if="scope.row.bankName" class="item_box">
              <div class="item_title">{{ $t('BankName') }}:</div>
              <div class="item_conent">{{ scope.row.bankName }}</div>
            </div>
            <div v-if="scope.row.bankCardNo" class="item_box">
              <div class="item_title">{{ $t('Bankaccount') }}:</div>
              <div class="item_conent">{{ scope.row.bankCardNo }}</div>
            </div>
            <div v-if="scope.row.coin" class="item_box">
              <div class="item_title">{{ $t('Virtualcoinaddress') }}:</div>
              <div class="item_conent">{{ scope.row.coin }}</div>
            </div>
            <div v-if="scope.row.wechat" class="item_box">
              <div class="item_title">{{ $t('WeChataccount') }}:</div>
              <div class="item_conent">{{ scope.row.wechat }}</div>
            </div>

          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('icon')" width="120">
        <template slot-scope="scope">
          <div class="image_box" v-if="scope.row.icon">
            <img :src="scope.row.icon" alt="">
          </div>
        </template>
      </el-table-column>
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
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
        <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
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

    <style lang="scss" scoped>
    .image_box{
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info_box{
      margin: 0 auto;
      width: 400px;
      .item_box{
        margin-top: 8px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .item_title{
          font-size: 16px;
          font-weight: 520;
          width: 150px;
          text-align: right;
          //text-align: justify;
          //text-align-last: justify;
        }
        .item_conent{
          margin-left: 5px;
          font-size: 18px;
          font-weight: 520;
          text-align: left;
        }
      }
    }
</style>
