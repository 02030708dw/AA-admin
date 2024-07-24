<template>
    <el-row style="padding-bottom: 10px">
        <!-- 新增按钮 -->
        <el-button v-has="'WithdrawalBank:add'" type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
        <!-- 银行编码 -->
        <el-input v-model="bankCode" style="width: 180px; margin-left: 10px" placeholder="请输入银行编码" />
        <!-- 银行名称 -->
        <el-input v-model="bankName" style="width: 180px; margin-left: 10px" placeholder="请输入银行名称" />
        <!-- 状态 -->
        <el-select v-model="status" :placeholder="$t('state')" style="width: 200px; margin-left: 10px">
            <el-option :value="0" label="停用" />
            <el-option :value="1" label="启用" />
        </el-select>
        <!-- 查询 -->
        <el-button v-has="'WithdrawalBank:page'" style="margin-left: 10px" type="primary" @click="getquery()">
            {{ $t("query") }}
        </el-button>
        <!-- 重置 -->
        <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
        <!-- 刷新按钮 -->
        <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
        }}</el-button>
        <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            btnIcoType: true, // 刷新按钮状态
            bankCode: "", // 银行编码
            bankName: "", // 银行名称
            status: null, // 状态
        };
    },
    methods: {
        // 改变刷新按钮状态
        HandelBtnStatus() {
            this.btnIcoType = true
        },
        // 重置
        getresetting() {
            this.bankCode = ''
            this.bankName = ''
            this.status = null
            this.$emit('resetting')
        },
        // 条件查询
        getquery() {
            this.$emit('query', { bankCode: this.bankCode, bankName: this.bankName, status: this.status })
        },
        // 刷新事件
        HandelRefresh() {
            this.$emit('Refresh')
            this.btnIcoType = false
        },
        // 添加事件
        getAdd() {
            this.$emit('Add')
        },
    },
};
</script>
<style lang="scss" scoped></style>
