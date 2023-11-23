<template>
  <el-card>
    <Control @noticetypeAdd="getAdddialog"></Control>
    <Table :tableData="tableData" @EditorShow="getnottypeeditorshow"></Table>
    <Pagination :total="total" @PageChange="getnoticetypedata"></Pagination>
    <NoticetypeAdd ref="nottypeadd" @confirm="getaddnoticetype"></NoticetypeAdd>
    <NoticetypeEditor ref="nottypeeditor"></NoticetypeEditor>
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import Pagination from "@/components/Pagination/Pagination.vue";
import NoticetypeAdd from "./NoticetypeAdd";
import NoticetypeEditor from "./NoticetypeEditor.vue";
import { noticetypePage, addnoticetype } from "@/api/message/noticetype";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
    };
  },
  methods: {
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
    // 添加公告
    getaddnoticetype(e) {
      addnoticetype(e)
        .then((res) => {
          // 刷新数据
          this.getnoticetypedata(this.pageNo);
        })
        .catch((err) => {
          console.log(res);
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