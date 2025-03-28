<template>
    <el-dialog :title="$t('Detail')" :visible.sync="dialogTableVisible">
        <el-table height="400px" :border="true" v-loading="loading" :data="tableData"
            :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="gamerName" :label="$t('GameMerchantName')"></el-table-column>
            <el-table-column prop="rate" :label="$t('RebateRate')"></el-table-column>
            <el-table-column prop="phaseAmount" :label="$t('Totalprofitandloss')"></el-table-column>
            <el-table-column prop="amount" :label="$t('amountofmoney')"></el-table-column>
        </el-table>
        <Pagination  :pageNo="pageNo" :total="total" @PageChange="getData" @PageSizeChange="HandelPagesChange" />
    </el-dialog>
</template>
<script>
import Pagination from '@/components/Pagination/Pagination.vue'
import { getGamerInfo } from '@/api/reportforms/reportforms'
export default {
    components: {
        Pagination,
    },
    data() {
        return {
            dialogTableVisible: false,
            loading: false,
            tableData: [],
            pageNo: 1,
            pageSize: 20,
            total: null,
            id: '',
            day: '',
        }
    },
    methods: {
        // 改变页数
        HandelPagesChange(e) {
            this.PageSize = e
            this.getData(this.pageNo)
        },
        HandelShow({agentId, day}) {
            this.dialogTableVisible = true
            this.loading = true
            this.tableData = []
            this.agentId = agentId
            this.day = day
            this.getData(1)
        },
        async getData(index = 1) {
            this.pageNo = index
            const res = await getGamerInfo({ pageNo: this.pageNo, pageSize: this.pageSize, agentId: this.agentId, day: this.day })
            this.tableData = res.resultSet.data
            this.total = res.resultSet.total
            this.loading = false
        },
    }
}
</script>