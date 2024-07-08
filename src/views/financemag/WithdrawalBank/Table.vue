<template>
    <el-card>
        <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="bankCode" label="银行编码" width="" />
            <el-table-column prop="bankName" label="银行名称" width="" />
            <el-table-column prop="currency" label="币种" width="" />
            <el-table-column prop="" label="图标" width="120">
                <template slot-scope="scope">
                    <div class="image_box">
                        <img :src="scope.row.icon" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="">
                <template slot-scope="scope">
                    <div>
                        <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
                            active-text="启用" inactive-text="停用" @change="getupdateStatus($event, scope.row.id)" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
                <template slot-scope="scope">
                    {{ $creationTime(scope.row.createdAt) }}
                </template>
            </el-table-column>
            <el-table-column prop="" :label="$t('operate')" width="">
                <template slot-scope="scope">
                    <el-button type="text" @click="geteroleEitor(scope.row)">{{ $t("edit") }}</el-button>
                    <el-button slot="reference" type="text" style="color: red" @click="getroledel(scope.row.id)">{{
                        $t("delete") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>
export default {
    props: {
        // 表格数据
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            // 表格加载状态
            loading: false
        }
    },
    methods: {
        // 改变loading
        HandelLoading(status) {
            this.loading = status
        },
        // 删除
        getroledel(id) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$emit('delete', id)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        // 编辑
        geteroleEitor(item) {
            this.$emit('Eitor', item)
        },
        // 状态修改
        getupdateStatus(status, id) { 
            this.$emit('updateStatus', {status:status,id:id})
        }
    },
}
</script>
<style lang="scss" scoped>
.image_box {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>