<template>
    <el-dialog :title="$t('Balanceadditionsubtraction')" :visible.sync="dialogVisible" width="30%">
        <el-form ref="FormData" :rules="rules" :model="FormData" label-width="110px">
            <el-form-item :label="$t('sort')" prop="order">
                <el-input v-model="FormData.order" />
            </el-form-item>
            <el-form-item label="三方充值" placeholder="请选择三方充值" prop="threePayId">
                <el-select v-model="FormData.threePayId" :placeholder="$t('typesof')" style="width: 200px">
                    <el-option v-for="(item, index) in thirdDropDownList" :key="index" :value="item.id"
                        :label="item.threeName" />
                </el-select>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('cancellation') }}</el-button>
            <el-button type="primary" @click="HandelUpdataBalance">{{ $t('determine') }}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { editPayment } from '@/api/account/member'
//三方充值配置下拉框列表
import { thirdDropDown } from '@/api/thirdpartypayment/thirdpartypayment'
export default {
    data() {
        return {
            dialogVisible: false,
            FormData: {
                order: '',
                memberId: '',
                threePayId: null
            },
            rules: {
                order: [{ required: true, message: '请输入排序', trigger: 'blur' }],
                threePayId: [{ required: true, message: '请选择三方支付商id', trigger: 'blur' }],
            },
            thirdDropDownList: []
        }
    },
    mounted() {
        this.getThirdDropDown()
    },
    methods: {
        //三方充值配置下拉框列表
        getThirdDropDown() {
            thirdDropDown().then(res => {
                this.thirdDropDownList = res.resultSet
            })
        },
        HandelChangeShow(id = null) {
            this.dialogVisible = !this.dialogVisible
            if (this.dialogVisible) {
                this.FormData.memberId = id
            } else {
                this.FormData = {
                    order: '',
                    threePayId: '',
                }
            }
        },
        HandelUpdataBalance() {
            this.$refs.FormData.validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请填写完整信息!',
                        type: 'warning'
                    })
                } else {
                    editPayment(this.FormData).then(res => {
                        this.$message({ message: '操作成功!', type: 'success' })
                    }).catch(() => {
                        this.$message.error('操作失败!')
                    })
                    this.HandelChangeShow()
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped></style>