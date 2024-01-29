<template>
    <!-- 新增 修改 -->
    <el-dialog :title="TypeIndex === 1 ? '编辑提现银行' : '添加提现银行'" :visible.sync="dialogVisible" width="40%" @close="HandelClose">

        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
            <el-form-item label="银行编码" prop="bankCode">
                <el-input v-model="ruleForm.bankCode" placeholder="请输入银行编码" />
            </el-form-item>
            <el-form-item label="银行名称" prop="bankName">
                <el-input v-model="ruleForm.bankName" placeholder="请输入银行名称" />
            </el-form-item>
            <el-form-item label="图标" prop="icon">
                <el-upload 
                class="avatar-uploader" 
                :show-file-list="false" 
                :on-success="handleAvatarSuccess" :on-error="uploadonerror">
                    <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态" prop="">
                <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="HandelChange()">{{ $t("cancellation") }}</el-button>
            <el-button type="primary" @click="getconfirm()">{{
                $t("determine")
            }}</el-button>
        </span>

    </el-dialog>
</template>
<script>
export default {
    props: {
        // 0 添加 1 修改
        TypeIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                bankCode: '', // 银行编码
                bankName: '', // 银行名称
                icon: '', //图标
                status: 0,// 状态
                id: '', //ID
            },
            rules: {
                bankCode: [{ required: true, message: '请输入银行编码', trigger: 'blur' }],
                bankName: [{ required: true, message: '请输入银行名称', trigger: 'blur' }],
                icon: [{ required: true, message: '请上传银行图标', trigger: 'blur' }]
            }
        }
    },
    methods: {
        HandelClose() {
            this.dialogVisible = false
            this.ruleForm = {
                    bankCode: '', // 银行编码
                    bankName: '', // 银行名称
                    icon: '', //图标
                    status: 0,// 状态
                    id: '', //ID
                }
        },
        // 改变弹窗状态
        HandelChange(data = null) {
            this.dialogVisible = !this.dialogVisible
            if (data != null) {
                // 填充数据
                this.ruleForm = {
                    bankCode: data.bankCode,
                    bankName: data.bankName,
                    icon: data.icon,
                    status: data.status,
                    id: data.id
                }
            }
            // 关闭时清空数据
            if (!this.dialogVisible) {
                this.ruleForm = {
                    bankCode: '', // 银行编码
                    bankName: '', // 银行名称
                    icon: '', //图标
                    status: 0,// 状态
                    id: '', //ID
                }
            }
        },
        uploadonerror(err, file, fileList) {
            this.getBase64(file.raw).then(res => {
                this.ruleForm.icon = res
            })
        },
        // 上传图片
        handleAvatarSuccess(response, file, fileList) {
            console.log(file)
            this.getBase64(file.raw).then(res => {
                this.ruleForm.icon = res
            })
        },
        // 图片转base64
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                let imgResult = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                    imgResult = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(imgResult)
                }
            })
        },
        // 确定事件
        getconfirm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$emit('upta', this.ruleForm)
                    // 关闭弹窗
                    this.HandelChange()
                } else {
                    this.$message({
                        message: '请填写完整信息!',
                        type: 'warning'
                    })
                    return false
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
    width: 178px;
    height: 178px;
    border: 1px dashed #494b4b3d;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>