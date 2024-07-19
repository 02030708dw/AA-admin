<template>

    <el-card>
        <el-row style="padding-bottom: 10px">
            <el-input v-model="userName" style="width: 200px;margin-right:10px;" :placeholder="$t('username')" />
            <el-input v-model="ip" style="width: 200px;margin-right:10px;" :placeholder="$t('IPAddress')" />
            <el-button type="primary" @click="getdata">{{ $t('query') }}</el-button>
            <el-button type="info" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
        </el-row>
        <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="userName" label="username" />
            <el-table-column prop="area" label="area" />
            <el-table-column prop="ip" label="IPAddress" />
            <el-table-column prop="updatedAt" :label="$t('Updatetime')" width="">
                <template slot-scope="scope">
                    {{ $creationTime(scope.row.updatedAt) }}
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    </el-card>
</template>

<script>
import { ipPage } from '@/api/IP'
import Pagination from '@/components/Pagination/Pagination.vue'
export default {
    name: 'IPTable',
    components: { Pagination },
    data() {
        return {
            tableData: [],
            loading: false,
            total: 0,
            pageNo: 1,
            PageSize: 20,
            userName: null,
            ip:'',
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        HandelPagesChange(e) {
            this.PageSize = e
            this.getdata()
        },
        getdata() {
            ipPage({ pageNo: this.pageNo, PageSize: this.PageSize, userName: this.userNamem, ip:this.ip}).then(res => {
                this.tableData = res.resultSet.data
                this.total = res.resultSet.total
            })
        },
        getresetting() {
            this.pageNo = 1
            this.userName = null
            this.getdata()
        },
    }
}
</script>
