<template>
  <el-row style="padding-bottom: 10px">
    <!-- 选择日期 -->
    <el-date-picker v-model="value" style="margin-right: 10px;" type="daterange" align="right" unlink-panels
      :range-separator="$t('to')" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
      @change="heandlerTime" />
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
    }
  },
  methods: {
    // 选择日期
    heandlerTime() {
      const timearr = []
      for (let i = 0; i < this.value?.length; i++) {
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
      this.$emit('query', { name: this.name })
    }
  }
}
</script>
