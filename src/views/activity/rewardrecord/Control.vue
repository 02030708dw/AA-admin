<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="name" style="width: 200px; margin:0 5px" :placeholder="$t('username')" />
    <el-select clearable v-model="isClaimed" :placeholder="$t('Hasitbeencollected')"
      style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in [{ index: 1, title: 'correct' }, { index: 0, title: 'deny' }]" :key="index"
        :value="item.index" :label="$t(item.title)" />
    </el-select>
    <!-- 选择日期 -->
    <el-date-picker v-model="value" style="margin-right: 10px;" type="daterange" align="right" unlink-panels
      :range-separator="$t('to')" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
      @change="heandlerTime" />
    <el-button v-has="'noticemag:page'" style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query')
      }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
      }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      isClaimed: '',
      name: '',
      btnIcoType: true,
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
    getAdd() {
      console.log(1);
      this.$emit('ControlAdd')
    },
    // 重置查询
    getresetting() {
      this.status = null
      this.$emit('resetting')
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
    getquery() {
      this.$emit('query', { name: this.name, isClaimed: this.isClaimed })
    },
  }
}
</script>

<style></style>
