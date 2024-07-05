<template>
    <el-card shadow="never" style="border: 0px;display: flex;justify-content: center;">
        <el-form label-width="100px" ref="ruleForm" :model="UserInfo" :rules="rules" style="margin-right: 100px;" class="demo-ruleForm">
            <el-form-item :label="$t('name')" prop="userName">
                <el-input v-model="UserInfo.userName" style="width: 300px" :placeholder="$t('name')"  />
            </el-form-item>
            <el-form-item :label="$t('phone')" prop="telPhone">
                <el-input v-model="UserInfo.telPhone" style="width: 300px" :placeholder="$t('phone')" />
            </el-form-item>
            <el-form-item v-for="(v,i) in UserInfo.bankCardNoList" :key="i" :label="$t('Bankaccount')+(i+1)">
                <el-input v-model="v.bankCardNo" style="width: 300px" :placeholder="$t('Bankaccount')" />
            </el-form-item>
        </el-form>
        <el-row
            style="margin-top: 10px;display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;width:100%;">
            <el-button :loading="loading" :type="'primary'" style="width: 150px;" @click="submit">{{ $t('save') }}</el-button>

        </el-row>
    </el-card>
</template>

<script>
import { MemberEdit } from '@/api/account/member'
export default {
    data() {
        return {
            // 用户信息
            UserInfo: {
                memberId: '',
                telPhone: '', // 电话
                userName: '', // 名称
                bankCardNoList: [], // 银行卡
            },
            rules: {
                userName: [{ required: true, message: '请输入名称' }],
                telPhone: [{ required: true, message: '请输入电话' }],
            },
            loading: false,
        }
    },
    methods: {
        submit(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    MemberEdit(this.UserInfo).then(()=>{
                        this.$message({
                            message: '修改成功!',
                            type: 'success'
                        })
                        this.loading = false
                        this.$emit('Refresh')
                    }).catch(()=>{
                        this.loading = false
                    })
                } else {
                    this.$message({
                        message: '请填写完整信息!',
                        type: 'warning'
                    })
                    return false;
                }
            });
        },
        
    }
}
</script>
<style lang="scss" scoped>

</style>
