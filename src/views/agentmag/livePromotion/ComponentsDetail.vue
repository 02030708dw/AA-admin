<template>
  <el-dialog title="详情" :visible.sync="visible" width="700px" top="20px" @close="handleClose">
    <el-descriptions direction="vertical" :column="4" border v-loading="loading">
      <el-descriptions-item label="直播账号">{{ formatValue(detail.liveAccount) }}</el-descriptions-item>
      <el-descriptions-item label="联系账号">{{ formatValue(detail.contactAccount) }}</el-descriptions-item>
      <el-descriptions-item label="直播开始">{{ formatValue(detail.liveStartTime) }}</el-descriptions-item>
      <el-descriptions-item label="直播结束">{{ formatValue(detail.liveEndTime) }}</el-descriptions-item>
      <el-descriptions-item label="直播地址">{{ formatValue(detail.url) }}</el-descriptions-item>
      <el-descriptions-item label="推广中转页">{{ formatValue(detail.livePromotionUrl) }}</el-descriptions-item>

      <el-descriptions-item label="平台类型">
        {{ platformMap[detail.platformType] || '无' }}
      </el-descriptions-item>

      <el-descriptions-item label="产品类型">
        {{ detail.productType === 1 ? '刮刮乐' : '无' }}
      </el-descriptions-item>

      <el-descriptions-item label="红包金额">{{ formatValue(detail.redPacketAmount) }}</el-descriptions-item>
      <el-descriptions-item label="红包数量">{{ formatValue(detail.redPacketNumbers) }}</el-descriptions-item>
      <el-descriptions-item label="红包总数">{{ formatValue(detail.redPacketTotalNumbers) }}</el-descriptions-item>
      <el-descriptions-item label="红包兑换码">{{ formatValue(detail.redPacketCode) }}</el-descriptions-item>

      <el-descriptions-item label="刮刮乐数量">{{ formatValue(detail.scratchNumbers) }}</el-descriptions-item>
      <el-descriptions-item label="刮刮乐总数">{{ formatValue(detail.scratchTotalNumbers) }}</el-descriptions-item>
      <el-descriptions-item label="刮刮乐兑换码">{{ formatValue(detail.scratchCode) }}</el-descriptions-item>

      <el-descriptions-item label="彩票数量">{{ formatValue(detail.ticketNumbers) }}</el-descriptions-item>
      <el-descriptions-item label="彩票总数">{{ formatValue(detail.ticketTotalNumbers) }}</el-descriptions-item>
      <el-descriptions-item label="彩票兑换码">{{ formatValue(detail.ticketCode) }}</el-descriptions-item>

      <el-descriptions-item label="预约类型">
        {{ reservationMap[detail.reservationType] || '无' }}
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ServiceDetail } from '@/api/agent/livePromotion'

export default {
  name: 'DetailDialog',
  data() {
    return {
      visible: false,
      detail: {},
      loading: false,
      platformMap: {
        1: 'Facebook',
        2: 'Tiktok',
        3: 'YouTube',
      },
      reservationMap: {
        1: '直播前',
        2: '直播中',
      },
    }
  },
  methods: {
    async open(livePromotionId) {
      this.visible = true
      this.loading = true
      try {
        const res = await ServiceDetail({ livePromotionId })
        this.detail = res.resultSet || {}
      } catch (err) {
        this.$message.error('获取详情失败')
      } finally {
        this.loading = false
      }
    },
    handleClose() {
      this.detail = {}
    },
    formatValue(val) {
      return val === null || val === undefined || val === '' ? '无' : val
    },
  },
}
</script>
