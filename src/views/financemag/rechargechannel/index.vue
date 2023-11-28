<template>
  <el-card>
    <!-- 充值渠道管理 -->
    <Control @RechargeannelAdd="getChannelAddShow"></Control>
    <Table
      :tableData="tableData"
      @updateStatus="getChannelUpdateStatus"
      @delete="getChannelDelete"
      @eitor="getChannelEitorShow"
    ></Table>
    <Pagination :total="total" @PageChange="getchanneldata"></Pagination>
    <RechargechannelAdd
      ref="RechargechannelAdd"
      @confirm="getChannelAdd"
    ></RechargechannelAdd>
    <RechargechannelEitor
      ref="RechargechannelEitor"
      @confirm="getChannelEitor"
    ></RechargechannelEitor>
  </el-card>
</template>

<script>
// 表格
import Table from "./Table.vue";
// 顶部操作
import Control from "./Control";
// 分页
import Pagination from "@/components/Pagination/Pagination.vue";
// 添加
import RechargechannelAdd from "./RechargechannelAdd.vue";
// 编辑
import RechargechannelEitor from "./RechargechannelEitor.vue";
// 接口
import {
  channelPage,
  channelAdd,
  channelDel,
  channelEdit,
  channelUdateStatus,
} from "@/api/finance/rechargechannel";
export default {
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
    };
  },
  components: {
    Table,
    Control,
    Pagination,
    RechargechannelAdd,
    RechargechannelEitor,
  },
  created() {
    this.getchanneldata(1);
  },
  methods: {
    // 请求分页数据
    getchanneldata(index) {
      // 记录当前页码
      this.pageNo = index;
      channelPage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 状态修改
    getChannelUpdateStatus(data) {
      channelUdateStatus({ channelId: data.id, status: data.status })
        .then((res) => {
          this.getchanneldata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    getChannelDelete(id) {
      channelDel(id)
        .then((res) => {
          this.getchanneldata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示编辑弹窗
    getChannelEitorShow(data) {
      this.$refs.RechargechannelEitor.getAddstatus(data);
    },
    // 编辑
    getChannelEitor(data) {
      channelEdit({
        id: data.id,
        name: data.name,
        status: data.status,
        type: data.type,
      })
        .then((res) => {
          this.getchanneldata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示添加弹窗
    getChannelAddShow() {
      this.$refs.RechargechannelAdd.getAddstatus();
    },
    // 添加
    getChannelAdd(data) {
      channelAdd(data)
        .then((res) => {
          this.getchanneldata(this.pageNo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>