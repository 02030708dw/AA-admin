<template>
  <el-card>
    <Control @noticetypeAdd="getAdddialog"></Control>
    <Table
      @Edl="getDel"
      :tableData="tableData"
      @EditorShow="getnottypeeditorshow"
      @UdateStatus="getUdateStatus"
    ></Table>
    <Pagination :total="total" @PageChange="getnoticetypedata"></Pagination>
    <NoticetypeAdd ref="nottypeadd" @confirm="getaddnoticetype"></NoticetypeAdd>
    <NoticetypeEditor
      ref="nottypeeditor"
      @confirm="getEditornoticetype"
    ></NoticetypeEditor>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import NoticetypeAdd from "./NoticetypeAdd";
import NoticetypeEditor from "./NoticetypeEditor.vue";
import {
  noticetypePage,
  addnoticetype,
  delnoticetype,
  editnoticetype,
  updateStatus,
} from "@/api/message/noticetype";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
    };
  },
  methods: {
    // 删除公告类型
    getDel(id) {
      delnoticetype(id)
        .then((res) => {
          this.getnoticetypedata(this.pageNo);
          this.$message({
            message: "删除成功!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("删除失败!");
        });
    },
    // 请求分页数据
    getnoticetypedata(index) {
      this.pageNo = index;
      noticetypePage({ pageNo: index, pageSize: 10 })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 打开公告类型弹窗
    getAdddialog() {
      this.$refs.nottypeadd.getAddstatus();
    },
    getEditornoticetype(data) {
      editnoticetype({ status: data.status, name: data.name, id: data.id })
        .then((res) => {
          this.getnoticetypedata(this.pageNo);
          this.$message({
            message: "编辑成功!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(res);
          this.$message.error("编辑失败!");
        });
    },
    getUdateStatus(data) {
      updateStatus({ id: data.id, status: data.status })
        .then((res) => {
          this.getnoticetypedata(this.pageNo);
          this.$message({
            message: "修改成功!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(res);
          this.$message.error("修改失败!");
        });
    },
    // 添加公告
    getaddnoticetype(e) {
      addnoticetype(e)
        .then((res) => {
          // 刷新数据
          this.getnoticetypedata(this.pageNo);
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(res);
          this.$message.error("添加失败!");
        });
    },
    // 打开编辑公告弹窗
    getnottypeeditorshow(item) {
      this.$refs.nottypeeditor.getEditorstatus(item);
    },
  },
  created() {
    this.getnoticetypedata(1);
  },
  components: {
    Table,
    Control,
    Pagination,
    NoticetypeAdd,
    NoticetypeEditor,
  },
};
</script>

<style>
</style>