<template>
  <el-card>
    <Control @NoticeAdd="getNoticeAddShow"></Control>
    <!-- 表格 -->
    <Table
      :tableData="tableData"
      @NoticeDel="getNoticeDel"
      @NoticeUpdateStatus="getNoticeUpdateStatus"
      @NoticeEitor="getNotcieEitorShow"
    ></Table>
    <Pagination :total="total" @PageChange="getnoticedata"></Pagination>
    <noticeAdd ref="noticeAdd" @confirm="getNoticeAdd"></noticeAdd>
    <noticeEitor ref="noticeEitor" @confirm="getNoticeEitor"></noticeEitor>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import noticeAdd from "./noticeAdd.vue";
import noticeEitor from "./noticeEitor.vue";
import {
  noticePage,
  addnotice,
  delnotice,
  updateStatus,
  editnotice,
} from "@/api/message/notice";
export default {
  components: {
    Table,
    Control,
    Pagination,
    noticeAdd,
    noticeEitor,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
    };
  },
  methods: {
    // 请求分页数据
    getnoticedata(index) {
      this.pageNo = index;
      noticePage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示添加公告弹窗
    getNoticeAddShow() {
      this.$refs.noticeAdd.getAddstatus();
    },
    // 添加公告
    getNoticeAdd(e) {
      addnotice(e)
        .then((res) => {
          this.getnoticedata();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    getNoticeDel(id) {
      delnotice(id)
        .then((res) => {
          this.getnoticedata();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示编辑弹窗
    getNotcieEitorShow(e) {
      this.$refs.noticeEitor.getAddstatus(e);
    },
    getNoticeEitor(data) {
      editnotice({
        content: data.content,
        id: data.id,
        noteTypeId: data.noteTypeId,
        status: data.status,
        title: data.title,
      })
        .then((res) => {
          this.getnoticedata();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 状态修改
    getNoticeUpdateStatus(status, id) {
      console.log(status, id);
    },
  },
  created() {
    this.getnoticedata();
  },
};
</script>

<style lang="scss">
</style>