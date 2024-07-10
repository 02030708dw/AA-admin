<template>

    <el-card>
        <el-row style="padding-bottom: 10px">
            <el-input v-model="userName" style="width: 200px;margin-left:10px;" placeholder="会员登录用户名" />
            <el-button type="primary" @click="getdata">{{ $t('query') }}</el-button>
            <el-button type="info" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
        </el-row>
        <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="userName" label="会员用户名" />
            <el-table-column prop="area" label="地区" />
            <el-table-column prop="ip" label="ip地址" />
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
export default {
    name: 'IPTable',
    data() {
        return {
            tableData: [],
            loading: false,
            total: 0,
            pageNo: 1,
            PagesSize: 20,
            userName: null,
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        HandelPagesChange(e) {
            this.PagesSize = e
            this.getdata(this.pageNo)
        },
        getdata() {
            ipPage({ pageNo: this.pageNo, PagesSize: this.PagesSize, userName: this.userName }).then(res => {
                this.tableData = res.resultSet.data
                console.log(res, '-----------------');
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
