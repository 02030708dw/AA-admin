<template>
  <el-card>
    <Control ref="ControlView" @resetting="getresetting" @query="getquery" @Refresh="HandelRefresh"
      @Add="getBonusAddShow" />
    <Table ref="TableView" :table-data="tableData" @delete="getDel" @UdateStatus="getUdateStatus"
      @EditorShow="getEitorShow" @BindShow="getBindShow" />
    <Pagination  :pageNo="pageNo" :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    <ComponentsAdd ref="bonusAdd" @confirm="getBonusAdd" />
    <ComponentsEitor ref="ComponentsEitor" @confirm="getEitor" />
    <ComponentsBind :SysBonusGroup="SysBonusGroup" ref="ComponentsBind" @confirm="getBind" />
  </el-card>
</template>

<script>
import Table from "./Table.vue";
import Control from "./Control";
import ComponentsAdd from "./ComponentsAdd";
import ComponentsEitor from './ComponentsEitor.vue'
import ComponentsBind from './ComponentsBind.vue'
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  bonusGroupAdd,
  bonusGroupBind,
  bonusGroupDel,
  bonusGroupInfo,
  bonusGroupPage,
  bonusGroupEdit,
} from "@/api/bonusgroup/sysbonusgroup";
import { gameInfoGroup } from "@/api/bonusgroup/gwgameinfo";
export default {
  components: {
    Table,
    Control,
    Pagination,
    ComponentsAdd,
    ComponentsEitor,
    ComponentsBind
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      PagesSize: 20,
      SysBonusGroup: [],
    };
  },

  methods: {
    getSysBonusGroupInfo() {
      gameInfoGroup().then(res => {
        this.SysBonusGroup = res.resultSet
      })
    },
    // 显示绑定弹窗
    getBindShow(e) {
      this.$refs.ComponentsBind.getAddstatus(e);
    },
    getBind(data) {
      bonusGroupBind(data)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('编辑失败!')
          console.log(err)
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
      bonusGroupPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        groupName: this.groupName,
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
      bonusGroupPage({
        pageNo: this.pageNo,
        pageSize: this.PagesSize,
        groupName: this.groupName,
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
      this.planName = e.planName;
      this.userName = e.userName;
      this.getdata(1);
    },
    // 重置查询
    getresetting() {
      this.planName = null;
      this.userName = null;
      this.getdata(1);
    },
    // 删除币种
    getDel(id) {
      bonusGroupDel(id)
        .then((res) => {
          this.getdata(this.pageNo);
          this.$message({
            message: "删除成功!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("删除失败!");
        });
    },
    // 显示添加弹窗
    getBonusAddShow() {
      this.$refs.bonusAdd.getAddstatus();
    },
    // 添加币种
    getBonusAdd(e) {
      bonusGroupAdd(e)
        .then((res) => {
          // 刷新数据
          this.getdata(this.pageNo);
          // this.$store.dispatch("user/gamerSet");
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("添加失败!");
        });
    },
    // 显示编辑弹窗
    getEitorShow(e) {
      this.$refs.ComponentsEitor.getAddstatus(e)
    },
    getEitor(data) {
      bonusGroupEdit(data)
        .then((res) => {
          this.getdata(this.pageNo)
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error('编辑失败!')
          console.log(err)
        })
    },
    //修改状态
    getUdateStatus(data) {
      bonusGroupEdit(data)
        .then((res) => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.getdata(this.pageNo)
        })
        .catch((err) => {
          this.$message.error('修改失败!')
          console.log(err)
        })
    },
  },
  created() {
    this.getdata(1);
    this.getSysBonusGroupInfo()
  },
};
</script>

<style lang="scss"></style>
