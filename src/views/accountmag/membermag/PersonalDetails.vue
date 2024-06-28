<template>
    <el-card shadow="never" style="border: 0px;display: flex;justify-content: center;">
        <el-form label-width="100px" style="margin-right: 100px;" class="demo-ruleForm">
            <el-form-item :label="$t('phone')">
                <el-input v-model="UserInfo.telPhone" style="width: 300px" :placeholder="$t('phone')" />
            </el-form-item>
            <el-form-item :label="$t('name')">
                <el-input v-model="UserInfo.userName" style="width: 300px" :placeholder="$t('name')" />
            </el-form-item>
            <el-form-item :label="$t('Bankaccount')">
                <el-input v-model="UserInfo.bank" style="width: 300px" :placeholder="$t('Bankaccount')" />
            </el-form-item>
        </el-form>
        <el-row
            style="margin-top: 10px;display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;width:100%;">
            <el-button :type="'primary'" style="width: 150px;" @click="submit">{{ $t('save') }}</el-button>

        </el-row>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            // 用户信息
            UserInfo: {
                telPhone: '', // 电话
                userName: '', // 名称
                bank: '', // 银行卡
            }
        }
    },
    methods: {
        submit(){

        }
    }
}
</script>
<style lang="scss" scoped>

</style>
