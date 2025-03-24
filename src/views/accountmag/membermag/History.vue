<template>
  <el-card shadow="never" style="border: 0px">
    <!-- 顶部查询栏 -->
    <el-row style="margin-bottom: 10px">
      <el-select
        v-model="gammerId"
        filterable
        :placeholder="$t('SelectGameMerchant')"
        style="width: 200px; margin-right: 10px"
      >
        <el-option
          v-for="(item, index) in gamerPagesList"
          :key="index"
          :value="item.index"
          :label="item.title"
        />
      </el-select>
      <el-date-picker
        v-model="timeArr"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button style="margin-left: 10px" type="primary" @click="getquery()">{{
        $t("query")
      }}</el-button>
      <el-button
        type="info"
        style="margin-left: 10px"
        plain
        @click="getresetting()"
        >{{ $t("resetting") }}</el-button
      >
      <el-button
        v-if="btnIcoType"
        type="success"
        icon="el-icon-refresh-left"
        @click="HandelRefresh"
        >{{ $t("Refresh") }}</el-button
      >
      <el-button v-else type="success" icon="el-icon-loading" disabled>{{
        $t("Refresh")
      }}</el-button>
    </el-row>
    <!-- 表格 -->
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="tableData"
        :border="true"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column prop="id" label="会员钱包ID" width="" /> -->
        <el-table-column :label="$t('total')" width="">
          <el-table-column
            prop="memberName"
            :label="$t('Membername')"
            width=""
          />
        </el-table-column>

        <el-table-column :label="$formatNumber(this.resultSet.betAmoutSum)">
          <el-table-column
            prop="betAmout"
            :label="$t('Bettingamount')"
            :formatter="formatMoney"
          />
        </el-table-column>

        <el-table-column :label="$formatNumber(this.resultSet.validBetAmountSum)">
          <el-table-column
            prop="validBetAmount"
            :label="$t('有效投注')"
            :formatter="formatMoney"
          />
        </el-table-column>

        <el-table-column :label="$formatNumber(this.resultSet.awardAmountSum)">
          <el-table-column
            prop="awardAmount"
            :label="$t('Awardamount')"
            :formatter="formatMoney"
          />
        </el-table-column>

        <el-table-column :label="$t('state')" width="">
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.status)">
              {{ typeS(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="gamerName"
          :label="$t('GameMerchantName')"
          width=""
        />
        <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
          <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
          </template>
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-button @click="getDetails(scope.row)">{{
              $t("Detail")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :visible.sync="innerVisible"
      append-to-body
      :modal="false"
      top="10%"
      @close="onClose"
    >
      <el-descriptions size="small" border :title="$t('投注详情')">
        <el-descriptions-item
          v-for="(value, key) in gamerBetDetail"
          :key="key"
          :label="key"
        >
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 分页 -->
    <Pagination
      :total="total"
      @PageSizeChange="HandelPagesChange"
      @PageChange="getMemberFlowingWater"
    />
  </el-card>
</template>
<script>
import { MemberHistory } from "@/api/account/member";
import { gamerPage } from "../../../api/gamer/gamer";
// 分页
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      gamerPagesList: [],
      gammerId: "",
      loading: false,
      tableData: [],
      timeArr: [],
      btnIcoType: true,
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      // 页数
      PagesSize: 20,
      // 会员id
      memberId: "",
      resultSet: {
        betAmoutSum: "",
        awardAmountSum: "",
      },
      gamerBetDetail: {},
      innerVisible: false,
    };
  },
  created() {
    this.HandelAgentPages();
  },
  methods: {
    // 获取游戏商信息
    HandelAgentPages() {
      this.gamerPagesList = [];
      // gamerPage({ pageNo: 1, pageSize: 1000000 }).then(res => {
      let res = this.$store.state.user.gamer;
      for (let i = 0; i < res.length; i++) {
        this.gamerPagesList.push({
          title: res[i].name,
          index: res[i].id,
        });
      }
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    // 获取分页数据
    getMemberFlowingWater(index) {
      this.pageNo = index;
      MemberHistory({
        pageNo: index,
        pageSize: this.PagesSize,
        memberId: this.memberId,
        gammerId: this.gammerId,
        startTime: this.timeArr?.[0],
        endTime: this.timeArr?.[1],
      })
        .then((res) => {
          console.log(res);
          this.tableData = res.resultSet.data;
          this.resultSet = res.resultSet;
          this.total = +res.resultSet.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询
    getquery() {
      this.getMemberFlowingWater(1);
    },
    // 刷新
    HandelRefresh() {
      this.btnIcoType = false;
      this.loading = true;
      MemberHistory({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        memberId: this.memberId,
        gammerId: this.gammerId,
        startTime: this.timeArr?.[0],
        endTime: this.timeArr?.[1],
      })
        .then((res) => {
          console.log(res);
          this.tableData = res.resultSet.data;
          this.total = +res.resultSet.total;
          this.resultSet = res.resultSet;
          setTimeout(() => {
            this.btnIcoType = true;
            this.loading = false;
            this.$message({
              message: "刷新刷新!",
              type: "success",
            });
          }, 1000);
        })
        .catch((err) => {
          setTimeout(() => {
            this.btnIcoType = true;
            this.loading = false;
            this.$message.error("刷新失败!");
          }, 1000);

          console.log(err);
        });
    },
    // 重置
    getresetting() {
      this.gammerId = null;
      this.timeArr = null;
      this.getMemberFlowingWater(1);
    },
    // 改变页数
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.getMemberFlowingWater(this.pageNo);
    },

    getDetails(e) {
      if (!e.gamerBetDetail) {
        this.$message.warning(this.$t("暂无数据"));
        return;
      }
      this.gamerBetDetail = {}; // 先清空数据，确保数据更新
      this.$nextTick(() => {
        this.gamerBetDetail = JSON.parse(e.gamerBetDetail);
        this.innerVisible = true;
      });
    },

    onClose() {
      this.innerVisible = false;
      this.gamerBetDetail = Object.assign({}, {}); // 触发 Vue 监听
      console.log(this.gamerBetDetail);
    },

    // 格式化金额
    formatMoney(row, column, cellValue) {
      return this.$formatNumber(cellValue);
    },

    typeS(value) {
      switch (value) {
        case 0:
          return this.$t("待开奖");
        case 1:
          return this.$t("中奖");
        case 2:
          return this.$t("未中奖");
        case 3:
          return this.$t("撤单");
        case 4:
          return this.$t("作废");
        case 5:
          return this.$t("退款");
        case 6:
          return this.$t("和局");
        case 7:
          return this.$t("半赢");
        case 8:
          return this.$t("半输");
      }
    },

    getTagType(value) {
      if (value === 1) {
        return "success";
      } else if (value === 0) {
        return ""; // 默认颜色
      } else {
        return "info";
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
