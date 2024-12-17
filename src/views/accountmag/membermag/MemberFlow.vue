<!-- 会员资金流水 -->
<template>
    <el-card shadow="never" style="border: 0px;">
        <!-- 顶部查询栏 -->
        <el-row style="margin-bottom: 10px;">
            <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{
                $t('Refresh') }}</el-button>
            <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
        </el-row>
        <!-- 表格 -->
        <el-card shadow="never">
            <el-table v-loading="loading" :data="tableData" :border="true"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
                <el-table-column prop="remark" :label="$t('describe')" width=""></el-table-column>
                <el-table-column prop="flow" :label="$t('Flowamount')" width=""></el-table-column>
                <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
                    <template slot-scope="scope">
                        {{ $creationTime(scope.row.createdAt) }}
                    </template>
                </el-table-column>
                <el-table-column prop="creator" :label="$t('Updatedby')" width="" />
            </el-table>
        </el-card>

        <!-- 分页 -->
        <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getList" />
    </el-card>
</template>
<script>
import { MemberflowPage } from '@/api/account/member'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            loading: false,
            tableData: [],
            btnIcoType: true,
            // 总条数
            total: 0,
            // 页码
            pageNo: 1,
            // 页数
            PagesSize: 20,
            // 会员id
            memberId: ''
        }
    },
    methods: {
        // 获取分页数据
        getList(index) {
            this.pageNo = index
            MemberflowPage({ pageNo: index, pageSize: this.PagesSize, memberId: this.memberId }).then(res => {
                console.log(res)
                this.tableData = res.resultSet.data
                this.total = res.resultSet.total
            }).catch(err => {
                console.log(err)
            })
        },
        // 刷新
        HandelRefresh() {
            this.btnIcoType = false
            this.loading = true
            MemberflowPage({ pageNo: this.pageNo, pageSize: this.PagesSize, memberId: this.memberId }).then(res => {
                console.log(res)
                this.tableData = res.resultSet.data
                this.total = res.resultSet.total
                setTimeout(() => {
                    this.btnIcoType = true
                    this.loading = false
                    this.$message({
                        message: '刷新刷新!',
                        type: 'success'
                    })
                }, 1000)
            }).catch(err => {
                setTimeout(() => {
                    this.btnIcoType = true
                    this.loading = false
                    this.$message.error('刷新失败!')
                }, 1000)

                console.log(err)
            })
        },
        // 改变页数
        HandelPagesChange(e) {
            this.PagesSize = e
            this.getList(this.pageNo)
        }
    }
}
</script>
<style lang="scss" scoped></style>