<template>
  <el-card>
    <Control @resetting="getresetting" @gameAdd="getGameAddShow" @Gamequery="getGamequery" />
    <Table
      :table-data="tableData"
      @gamedel="getGameDel"
      @gameeitor="getGameEitorShow"
      @updateStatus="getGameupdateStatus"
    />
    <Pagination :total="total" @PageChange="getgamedata" />
    <GameAdd ref="GameAdd" @confirm="getGameAdd" />
    <GameEitor ref="GameEitor" @confirm="getGameEitor" />
  </el-card>
</template>

<script>
import Table from './Table.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Control from './Control'
import GameAdd from './GameAdd.vue'
import GameEitor from './GameEitor.vue'
import {
  gamePage,
  gameAdd,
  gameDel,
  gameupdateStatus,
  gameEdit
} from '@/api/game/game'
export default {
  components: {
    Table,
    Control,
    Pagination,
    GameAdd,
    GameEitor
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNo: 1,
      tableData: [],
      gamerId: '',
      name: '',
      type: null,
      status: null
    }
  },
  created() {
    this.getgamedata(1)
  },
  methods: {
    // 请求分页数据
    getgamedata(index, data = null) {
      // 记录当前页码
      this.pageNo = index
      gamePage({ pageNo: index, pageSize: 10, gamerId: this.gamerId, name: this.name, type: this.type, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getGamequery(e) {
      this.gamerId = e.gamerId
      this.name = e.name
      this.type = e.type
      this.status = e.status
      this.getgamedata(1)
    },
    getresetting() {
      this.gamerId = ''
      this.name = ''
      this.type = null
      this.status = null
      this.getgamedata(1)
    },
    // 显示添加游戏
    getGameAddShow() {
      this.$refs.GameAdd.getAddstatus()
    },
    // 添加游戏
    getGameAdd(e) {
      console.log(e)
      gameAdd(e)
        .then((res) => {
          this.getgamedata(this.pageNo)
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
    // 删除
    getGameDel(e) {
      gameDel(e)
        .then((res) => {
          this.getgamedata(this.pageNo)
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
    // 显示编辑
    getGameEitorShow(e) {
      this.$refs.GameEitor.getEitorstatus(e)
    },
    // 编辑
    getGameEitor(data) {
      gameEdit({
        gameId: data.id,
        gamerId: data.gamerId,
        name: data.name,
        status: data.status,
        threeId: data.threeId,
        type: data.type
      })
        .then((res) => {
          this.getgamedata(this.pageNo)
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
    // 改变状态
    getGameupdateStatus(e) {
      gameupdateStatus({ status: e.status, gameId: e.id })
        .then((res) => {
          this.getgamedata(this.pageNo)
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('修改失败!')
        })
    }
  }
}
</script>

<style></style>
