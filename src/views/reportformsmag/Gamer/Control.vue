<template>
  <el-row style="padding-bottom: 10px">
    <!-- 选择日期 -->
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @blur="heandlerTime"
    />
    <!-- 选择代理 -->
    <el-select
      v-model="gamerId"
      placeholder="选择游戏商"
      style="width: 200px;margin-left:20px;"
    >
      <el-option
        v-for="(item, index) in gamerPagesList"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <!-- 查询 -->
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getquery()"
    > {{ $t('query') }} </el-button>
    <!-- 重置 -->
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{$t('Refresh')}}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{$t('Refresh')}}</el-button>
  </el-row>
</template>
<script>
// 获取代理信息
import { gamerPage } from '../../../api/gamer/gamer'
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: '',
      // 按钮状态
      btnIcoType: true,
      //  代理信息
      gamerPagesList: [],
      // 游戏商id
      gamerId: ''
    }
  },
  created() {
    this.HandelAgentPages()
  },
  methods: {
    // 获取游戏商信息
    HandelAgentPages() {
      this.gamerPagesList = []
      gamerPage({ pageNo: 1, pageSize: 1000000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.gamerPagesList.push({
            title: res.resultSet.data[i].name,
            index: res.resultSet.data[i].id
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 选择日期
    heandlerTime() {
      const timearr = []
      for (let i = 0; i < this.value.length; i++) {
        const date = new Date(this.value[i])
        const year = date.getFullYear()
        const month =
            date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const formattedDate = year + '-' + month + '-' + day
        timearr.push(formattedDate)
      }
      this.$emit('SelectDate', { startDate: timearr[0], endDate: timearr[1] })
    },
    // 日期回显
    pagesDate(data) {
      this.value = [data.startDate, data.endDate]
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    // 重置
    getresetting() {
      this.gamerId = ''
      this.$emit('resetting')
    },
    // 查询
    getquery() {
      if (!this.gamerId) {
        return this.$message.error('请选择代理!')
      }
      this.$emit('query', { gamerId: this.gamerId })
    }
  }
}
</script>
  <style lang="scss" scoped>

  </style>

