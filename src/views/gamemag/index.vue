<template>
  <el-card>
    <Control ref="ControlView" :gameriddata="GamerIdData" @resetting="getresetting" @gameAdd="getGameAddShow" @Gamequery="getGamequery" @Refresh="HandelRefresh" />
    <Table
      ref="TableView"
      :table-data="tableData"
      @gamedel="getGameDel"
      @gameeitor="getGameEitorShow"
      @updateStatus="getGameupdateStatus"
      @getisHot="getisHot"
    />
    <Pagination :total="total" @PageChange="getgamedata" />
    <GameAdd ref="GameAdd" :gameriddata="GamerIdData" @confirm="getGameAdd" />
    <GameEitor ref="GameEitor" :gameriddata="GamerIdData" @confirm="getGameEitor" />
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
  gameEdit,
  gameisHot
} from '@/api/game/game'
import {
  gamerPage
} from '@/api/gamer/gamer'
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
      status: null,
      // 游戏商id
      GamerIdData: []
    }
  },
  created() {
    this.getgamedata(1)
    this.GetGamerPages()
  },
  methods: {
    // 获取游戏商id
    GetGamerPages() {
      gamerPage({ pageNo: 1, pageSize: 1000000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.GamerIdData.push(res.resultSet.data[i].id)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 刷新事件
    HandelRefresh() {
      this.$refs.TableView.HandelLoading(true)
      // 请求数据
      gamePage({ pageNo: this.pageNo, pageSize: 10, gamerId: this.gamerId, name: this.name, type: this.type, status: this.status })
        .then((res) => {
          this.total = res.resultSet.total
          this.tableData = res.resultSet.data
          setTimeout(() => {
            this.$refs.ControlView.HandelBtnStatus()
            this.$refs.TableView.HandelLoading(false)
          }, 1000)
          this.$message({ message: '刷新成功!', type: 'success' })
        })
        .catch(() => {
          setTimeout(() => {
            this.$refs.TableView.HandelLoading(false)
            this.$refs.ControlView.HandelBtnStatus()
          })
          this.$message.error('刷新失败!')
        })
    },
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
    },
    // 修改热门游戏
    getisHot(e) {
      gameisHot(e).then(res => {
        this.getgamedata(this.pageNo)
        this.$message({
          message: '设置热门游戏成功!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('设置失败!')
      })
    }
  }
}
</script>

<style></style>
