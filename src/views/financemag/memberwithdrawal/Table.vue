<template>
  <!-- 会员提现表格 -->
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="memberName" :label="$t('Membername')" width=""></el-table-column>
      <el-table-column prop="" :label="$t('Withdrawalinformation')" width="">
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
      <el-table-column prop="orderNo" :label="$t('orderNo')" />
      <el-table-column prop="amount" :label="$t('amountofmoney')" />
      <el-table-column prop="threePayName" :label="$t('ThreePartyNames')" />
      <el-table-column :label="$t('Reviewstatus')" prop="aduitStatus">
        <template slot-scope="scope">
          <div class="status_box">
            <!-- 审核状态 -->
            <el-tag :type="getStatusType(scope.row.aduitStatus)" size="small">
              {{ FaduitStatus(scope.row.aduitStatus) }}
            </el-tag>

            <!-- 驳回原因 -->
            <div v-if="scope.row.aduitStatus === 2" class="text_box">
              {{ $t("Reasonforrejection") }}:
              {{ scope.row.rejection ? scope.row.rejection : "There is no" }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('Audittime')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.aduitTime | timeF }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('Updatedby')" width=""></el-table-column>
      <!-- 操作 -->
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-if="scope.row.aduitStatus != 0" type="text" @click="HandelInfo(scope.row)">{{ $t("Detail")
            }}</el-button>
          <el-popconfirm :confirm-button-text="$t('determine')" :cancel-button-text="$t('cancellation')" v-if="scope.row.aduitStatus === 0"
            :title="$t('passthrough')" >
            <el-button @click="getaudit(1, scope.row.id)" style="margin-right: 5px;" slot="reference" v-has="'memberwithdrawal:aduit'" type="text">
              {{ $t("passthrough") }}
            </el-button>
          </el-popconfirm>
          <el-button v-has="'memberwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text" style="color: red"
            @click="getaudit(2, scope.row.id)">
            {{ $t("reject") }}
          </el-button>
          <el-button v-has="'memberwithdrawal:aduit'" v-if="scope.row.aduitStatus === 0" type="text"
            style="color: #a4a4a4" @click="getaudit(3, scope.row.id)">
            {{ $t("cancellation") }}
          </el-button>
          <el-button v-has="'memberwithdrawal:fo'" v-if="scope.row.aduitStatus === 0" type="text"
            @click="Handelpay(scope.row)">{{ $t("Paymentonbehalf") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 驳回原因弹窗 -->
    <el-dialog :title="$t('Reasonforrejection')" :visible.sync="dialogVisible" width="30%">
      <span>{{ $t("Pleaseenterthereasonforrejection") }}</span>
      <el-input v-model="reason" style="margin-top: 10px" type="textarea" :rows="4"
        :placeholder="$t('Pleaseenterthereasonforrejection')" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="getaudit(2)">{{ $t("skip") }}</el-button>
        <el-button type="primary" @click="getaudit(2)">{{
          $t("determine")
        }}</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { formatDate } from "../../../utils/formattime";
import { Audit } from "@/api/finance/memberwithdrawal";
export default {
  name: "Table",
  filters: {
    timeF(value) {
      return formatDate(value);
    },
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      reason: "", // 驳回原因
      loading: false,
      Id: "",
    };
  },
  methods: {
    FaduitStatus(value) {
      switch (value) {
        case 0:
          return this.$t("PendingReview");
        case 1:
          return this.$t("Approve");
        case 2:
          return this.$t("Rejected");
        case 3:
          return this.$t("Cancelled");
        case 4:
          return this.$t("InProgress");
        default:
          return this.$t("PendingReview");
      }
    },
    getStatusType(status) {
      switch (status) {
        case 0: return 'primary';      // 待审核 - 蓝色
        case 1: return 'success';   // 审核通过 - 绿色
        case 2: return 'danger';    // 驳回 - 红色
        case 3: return 'info';   // 已取消 - 橙色
        case 4: return 'warning';   // 进行中 - 黄色
        default: return 'default';  // 默认灰色
      }
    },
    // 改变loading
    HandelLoading(status) {
      this.loading = status;
    },
    // 删除事件
    getroledel(Id) {
      this.$emit("delete", Id);
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit("eitor", item);
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit("updateStatus", { status: e, id: Id });
    },
    HandelInfo(item) {
      this.$emit("info", item);
    },
    Handelpay(item) {
      this.$emit("pay", item);
    },
    getaudit(index, id = null) {
      if (id) {
        this.Id = id;
      }
      switch (index) {
        // 通过
        case 1:
          Audit({ auditStatus: index, reason: "", recordId: this.Id })
            .then((res) => {
              this.$emit("operate");
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        // 驳回
        case 2:
          if (this.dialogVisible) {
            Audit({
              auditStatus: index,
              reason: this.reason,
              recordId: this.Id,
            })
              .then((res) => {
                this.$emit("operate");
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            this.dialogVisible = false;
            this.reason = "";
          } else {
            this.dialogVisible = true;
          }
          // 弹窗驳回原因
          break;
        // 取消
        case 3:
          Audit({ auditStatus: index, reason: "", recordId: this.Id })
            .then((res) => {
              this.$emit("operate");
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.info_box {
  margin: 0 auto;

  .item_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .item_title {
      font-size: 16px;
      font-weight: 510;
      width: 150px;
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
