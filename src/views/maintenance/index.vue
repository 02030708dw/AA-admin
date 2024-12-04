<template>
    <el-card>
        <el-row style="padding-bottom: 10px">
            <el-select v-model="gameType" style="width: 200px;margin-right:10px;"
                :placeholder="$t('Pleaseselectagametype')">
                <el-option v-for="(item, index) in gamertype" :key="index" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-select v-model="gamerId" filterable :placeholder="$t('SelectGameMerchant')"
                style="width: 200px;margin-right: 10px">
                <el-option v-for="(item, index) in gameriddata" :key="index" :value="item.index" :label="item.title" />
            </el-select>
            <el-button type="primary" @click="getquery">{{ $t('query') }}</el-button>
            <el-button type="info" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
        </el-row>
        <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="gamerName" :label="$t('GameMerchantName')" />
            <el-table-column prop="gameType" :label="$t('typesof')">
                <template slot-scope="scope">
                    {{ getGamerType(scope.row.gameType) }}
                </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('state')" width="">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.status" :placeholder="$t('state')"
                        style="width: 150px; margin-left: 10px" @change="getupdateStatus($event, scope.row.id)">
                        <el-option v-for="(item, index) in statusType" :key="index" :value="item.index"
                            :label="item.title" />
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total" @PageSizeChange="HandelPagesChange" @PageChange="getdata" />
    </el-card>
</template>

<script>
import { gamerTypePage, gamerTypeUpdateStatus } from '@/api/gamer/gamer.js'
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
            gameType: null,
            gamerId: null,
            status: null,
            ip: '',
            // 游戏类型选项
            gamertype: [
                { label: "未分类", value: 0 },
                { label: "电子", value: 1 },
                { label: "棋牌", value: 2 },
                { label: "彩票", value: 3 },
                { label: "体育", value: 4 },
                { label: "真人", value: 5 },
                { label: "小游戏", value: 6 },
                { label: "热门", value: 7 },
                { label: "捕鱼", value: 8 },
                { label: "斗鸡", value: 9 },
            ],
            statusType: [
                { title: "停用", index: 0 },
                { title: "启用", index: 1 },
                { title: "游戏商维护中", index: 2 },
            ],
        }
    },
    computed: {
        gameriddata() {
            let data = [], res = this.$store.state.user.gamer || []
            for (let i = 0; i < res.length; i++) {
                data.push({
                    title: res[i].name,
                    index: res[i].id
                })
            }
            return data
        },
    },
    created() {
        this.getdata(1)
    },
    methods: {
        getGamerType(i) {
            switch (i) {
                case 0:
                    return "未分类";
                case 1:
                    return '电子'
                case 2:
                    return "棋牌";
                case 3:
                    return "彩票";
                case 4:
                    return "体育";
                case 5:
                    return "真人";
                case 6:
                    return "小游戏";
                case 7:
                    return '热门'
                case 8:
                    return '捕鱼'
                case 8:
                    return '斗鸡'

            }
        },
        getupdateStatus(status, id) {
            gamerTypeUpdateStatus({ status, id })
                .then((res) => {
                    this.$message({
                        message: '修改成功!',
                        type: 'success'
                    })
                    this.getdata(this.pageNo)
                })
                .catch((err) => {
                    this.$message.error('修改失败!')
                    console.log(err)
                })
        },
        HandelPagesChange(e) {
            this.PageSize = e
            this.getdata(this.pageNo)
        },
        getdata(index = 1) {
            this.pageNo = index
            gamerTypePage({ pageNo: this.pageNo, PageSize: this.PageSize, gameType: this.gameType, gamerId: this.gamerId, status: this.status }).then(res => {
                this.tableData = res.resultSet.data
                this.total = res.resultSet.total
            })
        },
        getresetting() {
            this.pageNo = 1
            this.PageSize = 20
            this.gameType = null
            this.gamerId = null
            this.status = null
            this.getdata(1)
        },
        getquery(e) {
            this.getdata(1)
        },
    },

}
</script>
