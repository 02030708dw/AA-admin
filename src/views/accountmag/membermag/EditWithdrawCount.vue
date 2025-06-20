<template>
    <el-dialog title="修改提款次数" v-if="dialogVisible" :visible.sync="dialogVisible" width="40%">
        <el-form label-width="150px" ref="ruleForm" :model="ruleForm" :rules="rules" style="margin-right: 100px;"
            class="demo-ruleForm">
            <el-form-item label="修改类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="修改类型" style="width: 200px">
                    <el-option v-for="(item, index) in typeList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
            </el-form-item>
            <el-form-item label="次数" prop="number">
                <el-input v-model="ruleForm.number" style="width: 300px" placeholder="次数" />
            </el-form-item>
        </el-form>
        <el-row
            style="margin-top: 10px;display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;width:100%;">
            <el-button v-has="'membermag:edit'" :loading="loading" :type="'primary'" style="width: 150px;"
                @click="submit">{{ $t('save')
                }}</el-button>

        </el-row>
    </el-dialog>

</template>

<script>
import { editWithdrawCount, editWithdrawCountAll } from '@/api/account/member'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                memberId: '',
                number: '',
                type: ''
            },
            rules: {
                number: [{ required: true, message: '请输入次数' }],
                type: [{ required: true, message: '请选择修改类型' }],
            },
            loading: false,
            typeList: [{
                value: 1,
                label: '每日提款次数'
            }, {
                value: 2,
                label: '当前剩余提款次数'
            }],
        }
    },
    methods: {
        HandelChangeShow(id = null) {
            this.dialogVisible = !this.dialogVisible
            if (this.dialogVisible) {
                this.ruleForm.memberId = id == 'all' ? undefined : id
            } else {
                this.ruleForm = {
                    memberId: '',
                    type: null,
                    number: ''
                }
            }
        },
        submit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    const fn = this.ruleForm.memberId == undefined ? editWithdrawCountAll : editWithdrawCount
                    fn(this.ruleForm).then(() => {
                        this.$message({
                            message: '修改成功!',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.ruleForm = {
                            memberId: '',
                            type: null,
                            number: ''
                        }
                        this.loading = false
                        this.$emit('Refresh')
                    }).catch(() => {
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
<style lang="scss" scoped></style>
