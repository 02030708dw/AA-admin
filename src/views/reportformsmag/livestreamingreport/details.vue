<template>
    <el-dialog :visible.sync="visible" title="详情列表" width="900px" :before-close="handleClose">
        <el-table v-loading="loading" :data="detailList" border style="width: 100%"
            :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" max-height="400">
            <el-table-column prop="day" label="日期" />
            <el-table-column prop="amount" label="单金额" :formatter="formatMoney" />
            <el-table-column prop="incomeNum" label="首冲人数" />
            <el-table-column prop="platformType" label="渠道">
                <template #default="{ row }">
                    {{
                        {
                            1: 'facebook',
                            2: 'tiktok',
                            3: 'youtube'
                        }[row.platformType] || '未知'
                    }}
                </template>
            </el-table-column>
            <el-table-column prop="registerNum" label="注册人数" />
            <el-table-column prop="remaining" label="剩余" />
            <el-table-column prop="totalCount" label="总数" />
            <el-table-column prop="type" label="类型">
                <template #default="{ row }">
                    {{
                        {
                            1: '刮刮乐'
                        }[row.type] || '未知'
                    }}
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getReportLiveStreamInfo } from '@/api/reportforms/reportforms'
export default {
    name: "DetailDialog",
    data() {
        return {
            visible: false,
            loading: false,
            detailList: []
        }
    },
    methods: {
        async HandelShow(row) {
            this.visible = true
            this.loading = true
            try {
                console.log({ row });

                const res = await getReportLiveStreamInfo({ type: row.type, id: row.id })
                // 假设接口返回数组列表
                this.detailList = res?.data || []
            } catch (e) {
                this.$message.error('获取详情失败')
                this.detailList = []
            } finally {
                this.loading = false
            }
        },
        formatMoney(row, column, cellValue) {
            return this.$formatNumber ? this.$formatNumber(cellValue) : cellValue
        },
        handleClose(done) {
            this.visible = false
            this.detailList = []
            done()
        }
    }
}
</script>

<style scoped></style>
