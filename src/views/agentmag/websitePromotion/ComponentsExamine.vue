<template>
    <el-dialog :title="$t('toexamine')" :visible.sync="visible" width="500px" @close="handleClose">
        <el-form :model="form" label-width="100px">
            <el-form-item label="审核状态">
                <el-radio-group v-model="form.domainStatus">
                    <el-radio :label="3">通过</el-radio>
                    <el-radio :label="4">拒绝</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark" type="textarea" :rows="3" />
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button :disabled="loading" @click="visible = false">取消</el-button>
            <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { ServiceExamine } from '@/api/agent/websitePromotion'

export default {
    name: 'Examine',
    data() {
        return {
            visible: false,
            loading: false,
            form: {
                id: null,
                domainStatus: 3, // 默认是“通过”
                remark: '',
            },
        }
    },
    methods: {
        open(id) {
            this.form.id = id
            this.visible = true
        },
        handleClose() {
            this.form = {
                id: null,
                domainStatus: 3,
                remark: '',
            }
            this.loading = false
        },
        async submit() {
            this.loading = true
            try {
                await ServiceExamine({ ...this.form })
                this.$message.success('审核提交成功')
                this.visible = false
                this.$emit('submitted')
            } catch (err) {
                this.$message.error('审核失败')
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
