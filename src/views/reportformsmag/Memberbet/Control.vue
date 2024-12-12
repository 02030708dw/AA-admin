<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="name" style="width: 200px;margin-right: 10px" :placeholder="$t('username')" />
    <el-select v-model="type" :placeholder="$t('typesof')" style="width: 200px;margin-right: 10px">
      <el-option v-for="(item, index) in gametype" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-select v-model="countType" :placeholder="$t('typesof')" style="width: 200px;margin-right: 10px">
      <el-option v-for="(item, index) in [{ label: '区间明细', value: 0 }, { label: '区间总计', value: 1 }]" :key="index"
        :value="item.value" :label="item.label" />
    </el-select>
    <!-- 选择日期 -->
    <el-date-picker v-model="value" style="margin-right: 20px;" type="daterange" align="right" unlink-panels
      :range-separator="$t('to')" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
      @blur="heandlerTime" />
    <el-button style="margin-left: 10px" type="primary" @click="getquery()"> {{
      $t('query') }} </el-button>
    <!-- 刷新 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
      }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>
<script>
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
      name: '',
      countType: 0,
      type: '',
      // 游戏类型选项
      gametype: [
        { label: "未分类", value: 0 },
        { label: "电子", value: 1 },
        { label: "棋牌", value: 2 },
        { label: "彩票", value: 3 },
        { label: "体育", value: 4 },
        { label: "真人", value: 5 },
        { label: "小游戏", value: 6 },
        { label: "热门", value: 7 },
        { label: "捕鱼", value: 8 },
        { label: "斗鸡", value: 9 },
      ],
    }
  },
  methods: {
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
    // 查询
    getquery() {
      this.$emit('query', { name: this.name, type: this.type, countType: this.countType })
    }
  }
}
</script>
<style lang="scss" scoped></style>
