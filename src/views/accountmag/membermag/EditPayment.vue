<template>
    <el-dialog title="支付商展示顺序" @open="openDialog" :visible.sync="dialogVisible" width="50%">
        <el-form ref="FormData" :rules="rules" :model="FormData" label-width="110px">
            <el-form-item label="三方排序" prop="paymentProviderOrders">
                <el-transfer ref="transfer" v-model="groupModal" :data="groupModalList" :titles="['未排序', '已排序']"
                    @change="transferList" :props="{
                        key: 'threePayId',
                        label: 'threePayName'
                    }" target-order="push">
                </el-transfer>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('cancellation') }}</el-button>
            <el-button type="primary" @click="HandelUpdataBalance">{{ $t('determine') }}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { editPayment, editPaymentAll } from '@/api/account/member'
import Sortable from 'sortablejs';
//三方充值配置下拉框列表
import { thirdDropDown } from '@/api/thirdpartypayment/thirdpartypayment'
export default {
    data() {
        return {
            dialogVisible: false,
            FormData: {
                memberId: '',
                paymentProviderOrders: null
            },
            rules: {
                paymentProviderOrders: [{ required: true, message: '请选择三方支付商id', trigger: 'blur' }],
            },
            aiInfoConData: [1, 2, 3],
            groupModal: [],
            groupModalList: [],
            type: 'edit',//判断是否一键排序
        }
    },
    mounted() {
        this.getThirdDropDown()
    },
    methods: {
        //三方充值配置下拉框列表
        getThirdDropDown() {
            thirdDropDown().then(res => {
                const data = [];
                for (let i = 0; i < res.resultSet.length; i++) {
                    data.push({
                        threePayId: res.resultSet[i].id,
                        threePayName: res.resultSet[i].threeName,
                    });
                }
                this.groupModalList = data
            })
        },
        transferList(e) {
            this.$forceUpdate()
        },
        openDialog() {
            this.$nextTick(() => {
                const transfer = this.$refs.transfer.$el
                const rightPanel = transfer.getElementsByClassName('el-transfer-panel')[1].getElementsByClassName('el-transfer-panel__body')[0]
                const rightEl = rightPanel.getElementsByClassName('el-transfer-panel__list')[0]
                Sortable.create(rightEl, {
                    onEnd: evt => {
                        const { oldIndex, newIndex } = evt
                        console.log(oldIndex, newIndex)
                        let _arr = this.groupModal.splice(oldIndex, 1)
                        this.groupModal.splice(newIndex, 0, _arr[0])
                        console.log(this.groupModal)
                    }
                })
            })
        },
        HandelChangeShow(id = null, list, type = 'edit') {
            this.dialogVisible = !this.dialogVisible
            this.type = type
            console.log(id, list, type);

            if (this.dialogVisible) {
                this.FormData.memberId = id
                this.groupModal = list ? list.map(v => v.threePayId) : []
            } else {
                this.FormData = {
                    memberId: '',
                    paymentProviderOrders: '',
                }
                this.groupModal = []
            }
        },
        HandelUpdataBalance() {
            this.FormData.paymentProviderOrders = this.groupModal.map((v, i) => {
                return { threePayId: v, order: i }
            })
            this.$refs.FormData.validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请填写完整信息!',
                        type: 'warning'
                    })
                } else {
                    if (this.type == 'all') {
                        editPaymentAll(this.FormData.paymentProviderOrders).then(res => {
                            this.$message({ message: '操作成功!', type: 'success' })
                            this.$emit('Refresh')
                        }).catch(() => {
                            this.$message.error('操作失败!')
                        })
                    } else {
                        editPayment(this.FormData).then(res => {
                            this.$message({ message: '操作成功!', type: 'success' })
                            this.$emit('Refresh')
                        }).catch(() => {
                            this.$message.error('操作失败!')
                        })
                    }
                    this.HandelChangeShow()
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.aiInfoCon {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 40px;
}
</style>