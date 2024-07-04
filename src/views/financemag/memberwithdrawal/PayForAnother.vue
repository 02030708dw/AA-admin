<!-- eslint-disable vue/return-in-computed-property -->
<template>
    <!-- 查看详情 -->
    <el-dialog title="代理提现详情" :visible.sync="dialogVisible" :rules="rules" width="40%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="'提现金额'" prop="amt">
                <el-input v-model="ruleForm.amount" />
            </el-form-item>
            <el-form-item :label="'提现银行户名'" prop="bankAccount">
                <el-input v-model="ruleForm.bankAccount" />
            </el-form-item>
            <el-form-item :label="'提现银行卡号'" prop="bankCardNo">
                <el-input v-model="ruleForm.bankCardNo" />
            </el-form-item>
            <el-form-item :label="'提现银行名称'" prop="bankName">
                <el-input v-model="ruleForm.bankName" />
            </el-form-item>
            <el-form-item :label="'ifsc'" prop="ifsc">
                <el-input v-model="ruleForm.ifsc" />
            </el-form-item>
            <el-form-item :label="'提现订单号'" prop="orderNo">
                <el-input v-model="ruleForm.orderNo" />
            </el-form-item>
            <el-form-item :label="'三方支付'" prop="threePayId">
                <el-select v-model="ruleForm.threePayId" placeholder="选择币种" style="width: 200px">
                  <el-option v-for="(item, index) in threePayList" :key="index" :value="item.id" :label="item.threeName" />
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
                amount: [{ required: true, message: '请输入提现金额', trigger: 'blur' }],
                bankAccount: [{ required: true, message: '请输入提现银行户名', trigger: 'blur' }],
                bankCardNo: [{ required: true, message: '请输入提现银行卡号', trigger: 'blur' }],
                bankName: [{ required: true, message: '请输入提现银行名称', trigger: 'blur' }],
                orderNo: [{ required: true, message: '请输入提现订单号', trigger: 'blur' }],
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
                        ifsc: this.ruleForm.ifsc ? this.ruleForm.ifsc: 'no',
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
