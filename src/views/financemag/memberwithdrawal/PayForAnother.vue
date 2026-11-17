<!-- eslint-disable vue/return-in-computed-property -->
<template>
    <!-- 查看详情 -->
    <el-dialog :title="$t('Proxywithdrawaldetails')" :visible.sync="dialogVisible" :rules="rules" width="40%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="180px" class="demo-ruleForm">
            <el-form-item :label="$t('Withdrawalamount')">
                <el-input v-model="ruleForm.amount" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 1" :label="$t('Alipayaccount')">
                <el-input v-model="ruleForm.alipay" disabled />
            </el-form-item>
            <el-form-item v-if="isMobileWallet" label="收款人姓名">
                <el-input v-model="ruleForm.bankAccount" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 0" :label="$t('Withdrawalbankcardnumber')">
                <el-input v-model="ruleForm.bankCardNo" disabled />
            </el-form-item>
            <el-form-item v-if="isMobileWallet" :label="`${mobileWalletName}收款手机号`">
                <el-input v-model="ruleForm.bankCardNo" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 0" :label="$t('Nameofwithdrawalbank')">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item v-if="isMobileWallet" label="银行code">
                <el-input v-model="ruleForm.bankName" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 3" label="虚拟币地址">
                <el-input v-model="ruleForm.coin" disabled />
            </el-form-item>
            <el-form-item v-if="isUsdt" label="USDT 网络">
                <el-input :value="ruleForm.usdtNetwork || '未配置，请先设置提现渠道'" disabled />
                <div>按后台代付汇率换算，受理时锁定数量。收款地址取自本笔提现申请。</div>
            </el-form-item>
            <el-form-item v-if="isMobileWallet" label="收款人IFSC">
                <el-input v-model="ruleForm.ifsc" disabled />
            </el-form-item>
            <el-form-item v-if="ruleForm.channelType == 2" label="微信账号">
                <el-input v-model="ruleForm.wechat" disabled />
            </el-form-item>
            <el-form-item :label="$t('orderNo')">
                <el-input v-model="ruleForm.orderNo" disabled />
            </el-form-item>
            <el-form-item :label="$t('Threepartypayment')" prop="threePayId">
                <el-select v-model="ruleForm.threePayId" placeholder="请选择代付支付商" style="width: 200px">
                    <el-option v-for="(item, index) in ThreePayfiletr" :key="index" :value="item.id"
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
            ruleForm: {
                threePayIds: [],
                threePayId: '',
            },
            threePayList: [],
            rules: {
                threePayId: [{ required: true, message: '请选择三方支付', trigger: 'blur' }],
            }
        }
    },
    computed: {
        isUsdt() {
            return Number(this.ruleForm.channelType) === 3
        },
        isMobileWallet() {
            return [4, 5].includes(Number(this.ruleForm.channelType))
        },
        mobileWalletName() {
            return Number(this.ruleForm.channelType) === 5 ? 'MAYA' : 'GCash'
        },
        ThreePayfiletr() {
            if (this.isUsdt) {
                return this.ruleForm.usdtNetwork === 'TRC20' ? this.threePayList.filter(item => item.usdt === true) : []
            }
            const ids = (this.ruleForm.threePayIds || []).map(String)
            const result = this.threePayList.filter(item => item.usdt !== true && ids.includes(String(item.id)))
                .map(item => ({ ...item, threeName: (item.threeName || '').replace(/\(推荐\)/g, '') }))
            if (result.length) {
                const best = result.reduce((a, b) => Number(a.bankCount) <= Number(b.bankCount) ? a : b)
                best.threeName += '(推荐)'
            }
            return result
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
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    if (!this.ThreePayfiletr.some(item => String(item.id) === String(this.ruleForm.threePayId))) {
                        return this.$message.warning('当前渠道不支持所选支付商，请重新选择')
                    }
                    let ruleForm = {
                        amt: String(this.ruleForm.amount),
                        orderNo: this.ruleForm.orderNo,
                        threePayId: this.ruleForm.threePayId,
                    }
                    if (this.isUsdt) {
                        if (!this.ruleForm.coin || this.ruleForm.usdtNetwork !== 'TRC20') return this.$message.warning('请核对收款地址及TRC20网络配置')
                        try {
                            await this.$confirm('确认向此提现申请的TRC20地址发起USDT代付？受理后请等待查单结果，处理中不要重复付款。', '确认USDT代付', { type: 'warning' })
                        } catch (_) { return }
                    } else {
                        let mappings = []
                        try { mappings = JSON.parse(this.ruleForm.threePayIdsString || '[]') } catch (_) { /* 交由下方校验提示 */ }
                        const mapping = Array.isArray(mappings) && mappings.find(item => String(item.threeId) === String(this.ruleForm.threePayId))
                        if (!mapping || !mapping.code) return this.$message.warning('提现银行未配置所选支付商')
                        Object.assign(ruleForm, {
                            bankAccount: this.ruleForm.bankAccount, bankCardNo: this.ruleForm.bankCardNo,
                            bankName: mapping.code, ifsc: this.ruleForm.ifsc || 'no'
                        })
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
