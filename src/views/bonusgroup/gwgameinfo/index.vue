<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @Add="getAddShow" @query="getquery" @Refresh="HandelRefresh" />
    <Table ref="TableView" :table-data="tableData" @Edl="getDel" @eitor="getEditShow" @UdateStatus="getGameEdit" />
    <Pagination :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsEdit ref="Edit" @confirm="getGameEdit" />
    <ComponentsAdd ref="ComponentsAdd" @confirm="getAdd" />
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import ComponentsEdit from "./ComponentsEdit.vue";
import ComponentsAdd from "./ComponentsAdd.vue"
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  gameInfoPage,
  agameInfoEdit,
  gameInfoGroup,
  gameInfoAdd,
  gameInfoDel
} from "@/api/bonusgroup/gwgameinfo";
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsEdit,
    ComponentsAdd
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      sign: null
    };
  },
  methods: {
    // 删除
    getDel(id) {
      gameInfoDel(id)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('删除失败!')
          console.log(err)
        })
    },
    // 显示添加弹窗
    getAddShow() {
      this.$refs.ComponentsAdd.getAddstatus()
    },
    getAdd(e) {
      gameInfoAdd(e)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('添加失败!')
        })
    },
    HandelPagesChange(e) {
      this.PagesSize = e;
      this.getdata(this.pageNo);
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true);
      // 请求数据
      gameInfoPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        gameName: this.gameName,
        gamePlayName: this.gamePlayName,
        gamePlayTypeName: this.gamePlayTypeName,
        sign: this.sign,
      })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus();
            this.$refs.TableView.HandelLoading(false);
          }, 1000);
          this.$message({ message: "刷新成功!", type: "success" });
        })
        .catch(() => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false);
            this.$refs.ControlView.HandelBtnStatus();
          });
          this.$message.error("刷新失败!");
        });
    },
    // 请求分页数据
    getdata(index = 1) {
      this.pageNo = index;
      gameInfoPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        gameName: this.gameName,
        gamePlayName: this.gamePlayName,
        gamePlayTypeName: this.gamePlayTypeName,
        sign: this.sign,
      })
        .then((res) => {
          this.total = res.resultSet.total;
          this.tableData = res.resultSet.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 条件查询
    getquery(e) {
      console.log(e);
      this.gameName = e.gameName;
      this.gamePlayName = e.gamePlayName;
      this.gamePlayTypeName = e.gamePlayTypeName;
      this.sign = e.sign;
      this.getdata(1);
    },
    // 重置查询
    getresetting() {
      this.gameName = null;
      this.gamePlayName = null;
      this.gamePlayTypeName = null;
      this.sign = null;
      this.getdata(1);
    },
    // 显示编辑弹窗
    getEditShow(e) {
      this.$refs.Edit.getEditstatus(e);
    },
    // 编辑币种
    getGameEdit(e) {
      agameInfoEdit({ id: e.id, sign: e.sign, winAmount: e.winAmount, fullAmount: e.fullAmount })
        .then((res) => {
          this.getdata(this.pageNo);
          this.$message({
            message: "编辑成功!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("编辑失败!");
        });
    },
  },
  created() {
    this.getdata(1);
  },
};
</script>

<style lang="scss"></style>
