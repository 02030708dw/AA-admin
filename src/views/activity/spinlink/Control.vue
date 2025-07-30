<template>
    <el-row style="padding-bottom: 10px">
        <el-input v-model="name" style="width: 200px; margin: 0 5px" placeholder="请输入会员名称" />

        <el-select v-model="isAgent" style="width: 200px; margin-left: 10px" placeholder="请选择用户类型" clearable>
            <el-option label="普通用户" :value="0" />
            <el-option label="代理" :value="1" />
        </el-select>

        <el-select v-model="status" style="width: 200px; margin-left: 10px" placeholder="请选择状态" clearable>
            <el-option label="禁用" :value="0" />
            <el-option label="正常" :value="1" />
            <el-option label="删除" :value="2" />
        </el-select>

        <el-button style="margin-left: 10px" type="primary" @click="getquery">
            查询
        </el-button>

        <!-- 刷新按钮 -->
        <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
            刷新
        </el-button>
        <el-button v-else type="success" icon="el-icon-loading" disabled>
            刷新
        </el-button>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            isAgent: '',
            status: '',
            btnIcoType: true
        }
    },
    methods: {
        // 查询
        getquery() {
            this.$emit('query', {
                name: this.name,
                isAgent: this.isAgent,
                status: this.status
            })
        },
        // 刷新
        HandelRefresh() {
            this.$emit('Refresh')
            this.btnIcoType = false
        },
        // 恢复刷新按钮状态
        HandelBtnStatus() {
            this.btnIcoType = true
        }
    }
}
</script>
