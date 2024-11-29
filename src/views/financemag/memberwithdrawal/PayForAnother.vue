<!-- eslint-disable vue/return-in-computed-property -->
<template>
    <!-- 查看详情 -->
    <el-dialog :title="$t('Proxywithdrawaldetails')" :visible.sync="dialogVisible" :rules="rules" width="40%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="'提现金额'">
                <el-input v-model="ruleForm.amount" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 1" :label="$t('Alipayaccount')">
                <el-input v-model="ruleForm.alipay" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 4" label="收款人姓名">
                <el-input v-model="ruleForm.bankAccount" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 0" label="提现银行卡号">
                <el-input v-model="ruleForm.bankCardNo" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 4" label="Gcash收款手机号">
                <el-input v-model="ruleForm.bankCardNo" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 0" label="提现银行名称">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 4" label="'银行code'">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 3" label="虚拟币地址">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item :label="$t('icon')">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 4" label="收款人IFSC">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 2" label="微信账号">
                <el-input v-model="ruleForm.wechat" disabled />
            </el-form-item>
            <el-form-item :label="'提现订单号'">
                <el-input v-model="ruleForm.orderNo" disabled />
            </el-form-item>
            <el-form-item :label="'三方支付'" prop="threePayId">
                <el-select v-model="ruleForm.threePayId" placeholder="充值类型" style="width: 200px">
                    <el-option v-for="(item, index) in threePayList" :key="index" :value="item.id"
                        :label="item.threeName" />
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
            <el-button type="primary" @click="getconfirm()">{{
        $t("determine")
                }}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { ThreePayList } from '@/api/finance/memberwithdrawal'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {},
            threePayList: [],
            rules: {
                threePayId: [{ required: true, message: '请选择三方支付', trigger: 'blur' }],
            }
        }
    },
    created() {
        ThreePayList().then(res => {
            this.threePayList = res.resultSet
        })
    },
    methods: {
        // 改变弹窗状态
        getAddstatus(data) {
            this.dialogVisible = !this.dialogVisible
            // 关闭时清空
            if (!this.dialogVisible) {
                this.ruleForm = {}
            } else {
                this.ruleForm = { ...data }
                console.log(this.ruleForm);
            }
        },
        // 确定添加事件
        getconfirm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let ruleForm = {
                        amt: this.ruleForm.amount,
                        bankAccount: this.ruleForm.bankAccount,
                        bankCardNo: this.ruleForm.bankCardNo,
                        bankName: this.ruleForm.bankName,
                        ifsc: this.ruleForm.ifsc ? this.ruleForm.ifsc : 'no',
                        orderNo: this.ruleForm.orderNo,
                        threePayId: this.ruleForm.threePayId,
                    }
                    this.$emit("pay", ruleForm);
                    // 关闭弹窗
                    this.dialogVisible = false;
                } else {
                    this.$message({
                        message: "请填写完整信息!",
                        type: "warning",
                    });
                    return false;
                }
            });
        },
    }
}
</script>
