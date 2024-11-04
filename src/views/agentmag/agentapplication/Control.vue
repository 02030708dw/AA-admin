<template>
  <el-row class="row" style="padding-bottom: 10px">
    <el-date-picker v-model="application" type="daterange" align="right" unlink-panels :range-separator="$t('to')"
      start-placeholder="申请开始日期" end-placeholder="申请结束日期" :picker-options="pickerOptions"
      @blur="() => heandlerTime('application')" />
    <el-date-picker style="margin-left:10px;" v-model="review" type="daterange" align="right" unlink-panels
      :range-separator="$t('to')" start-placeholder="审核开始日期" end-placeholder="审核结束日期" :picker-options="pickerOptions"
      @blur="() => heandlerTime('review')" />
    <el-input v-model="memberId" style="width: 200px;margin-left:10px;" :placeholder="$t('MemberID')" />
    <el-input v-model="reviewerId" style="width: 200px;margin-left:10px;" placeholder="审核人id" />
    <el-select v-model="status" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-button type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{
      $t('Refresh')
    }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      memberId: null,
      reviewerId: null,
      status: null, // 状态
      btnIcoType: true,
      statusType: [
        { title: this.$t('PendingReview'), index: 1 },
        { title: '通过', index: 2 },
        { title: '拒绝', index: 3 }
      ],
      review: '',
      application: '',
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
    }
  },
  methods: {
    getquery() {
      this.$emit('query', {
        memberId: this.memberId,
        status: this.status,
        reviewerId: this.reviewerId
      })
    },
    getresetting() {
      this.memberId = ''
      this.reviewerId = null
      this.review = null
      this.application = null
      this.status = null
      this.$emit('resetting')
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 选择日期
    heandlerTime(type) {
      const timearr = []
      for (let i = 0; i < this[type].length; i++) {
        const date = new Date(this[type][i])
        const year = date.getFullYear()
        const month =
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const formattedDate = year + '-' + month + '-' + day
        timearr.push(formattedDate)
      }
      console.log(timearr[0],timearr[1]);
      
      if (type == 'application') {
        this.$emit('ApplicationDate', { startDate: timearr[0], endDate: timearr[1] })
      } else {
        this.$emit('ReviewDate', { startDate: timearr[0], endDate: timearr[1] })
      }
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
