<template>
    <el-dialog :title="$t('Detail')" :visible.sync="dialogTableVisible">
        <el-table height="400px" :border="true" v-loading="loading" :data="tableData"
            :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="day" :label="$t('Date')"></el-table-column>
            <el-table-column prop="remark" label="项目"></el-table-column>
            <el-table-column prop="amount" :label="$t('amountofmoney')"></el-table-column>
        </el-table>
        <Pagination :total="total" @PageChange="getData" @PageSizeChange="HandelPagesChange" />
    </el-dialog>
</template>
<script>
import Pagination from '@/components/Pagination/Pagination.vue'
import { getActivityInfo } from '@/api/reportforms/reportforms'
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
            id: ''
        }
    },
    methods: {
        // 改变页数
        HandelPagesChange(e) {
            this.PageSize = e
            this.getData(this.pageNo)
        },
        HandelShow(id) {
            this.dialogTableVisible = true
            this.loading = true
            this.tableData = []
            this.agentId = id
            this.getData(1)
        },
        async getData(index = 1) {
            this.pageNo = index
            const res = await getActivityInfo({ pageNo: this.pageNo, pageSize: this.pageSize, agentId: this.agentId })
            this.tableData = res.resultSet.data
            this.total = res.resultSet.total
            this.loading = false
        },
    }
}
</script>