<template>
    <el-row style="padding-bottom: 10px" :gutter="10" align="middle">
        <el-input v-model="memberName" placeholder="请输入用户名" style="width: 200px;margin-right: 10px;" clearable />
        <el-select v-model="status" placeholder="是否刮开" clearable style="width:200px;margin-right: 10px;">
            <el-option label="全部" :value="null" />
            <el-option label="否" :value="0" />
            <el-option label="是" :value="1" />
        </el-select>
        <el-select v-model="type" placeholder="用户类型" clearable style="width: 200px;margin-right: 10px;">
            <el-option label="全部" :value="null" />
            <el-option label="游客" :value="1" />
            <el-option label="正式用户" :value="2" />
        </el-select>

        <el-button type="primary" @click="getquery">查询</el-button>

        <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
        <el-button v-else type="success" icon="el-icon-loading" disabled>刷新</el-button>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            memberName: '',
            status: '',
            type: '',
            btnIcoType: true,
        }
    },
    methods: {
        getquery() {
            this.$emit('query', {
                memberName: this.memberName,
                status: this.status,
                type: this.type,
            })
        },
        HandelRefresh() {
            this.$emit('Refresh')
            this.btnIcoType = false
        },
        HandelBtnStatus() {
            this.btnIcoType = true
        },
    },
}
</script>
