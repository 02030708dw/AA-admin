<template>
    <el-row style="padding-bottom: 10px">
        <el-input v-model="name" style="width: 200px; margin: 0 5px" :placeholder="$t('username')" />

        <el-select v-model="isAgent" style="width: 200px; margin-left: 10px" :placeholder="$t('请选择用户类型')" clearable>
            <el-option :label="$t('普通用户')" :value="0" />
            <el-option :label="$t('代理')" :value="1" />
        </el-select>

        <el-button style="margin-left: 10px" type="primary" @click="getquery">
            {{ $t('query') }}
        </el-button>

        <!-- 刷新 -->
        <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">
            {{ $t('Refresh') }}
        </el-button>
        <el-button v-else type="success" icon="el-icon-loading" disabled>
            {{ $t('Refresh') }}
        </el-button>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            isAgent: '',
            btnIcoType: true
        }
    },
    methods: {
        // 刷新
        HandelRefresh() {
            this.$emit('Refresh')
            this.btnIcoType = false
        },
        // 改变按钮状态
        HandelBtnStatus() {
            this.btnIcoType = true
        },
        // 查询
        getquery() {
            this.$emit('query', {
                name: this.name,
                isAgent: this.isAgent
            })
        }
    }
}
</script>
