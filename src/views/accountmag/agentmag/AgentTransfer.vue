<template>
    <el-dialog :title="$t('Transfersubordinateagents')" :visible.sync="dialogVisible" width="50%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">

            <!-- <el-form-item :label="$t('oldAgentId')" prop="">
                <span>{{ ruleForm.oldAgentId }}</span>
            </el-form-item> -->
            <el-form-item :label="$t('oldAgentId')" prop="">
                <span>{{ ruleForm.userName }}</span>
            </el-form-item>
            <el-form-item :label="$t('targetAgentId')" prop="targetAgentId">
                <el-select v-model="ruleForm.targetAgentId" placeholder="选择转移的下级代理"
                    style="width: 200px;margin-left: 10px">
                    <el-option v-for="(item, index) in tableData" :key="index.id" :value="item.id"
                        :label="item.userName" />
                </el-select>

            </el-form-item>
            <el-form-item label="选择转移的下级代理" prop="">
                <el-checkbox-group v-model="agentS">
                    <el-checkbox v-for="(item, i) in agentList" :key="item.id" :label="i">
                        {{ item.realName }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="getStatus()">{{ $t("cancellation") }}</el-button>
            <el-button type="primary" @click="getconfirm()">{{
        $t("determine")
                }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {
    AagentGetList,
    OldAgentList,
    TargetAgentList
} from '@/api/account/agent'
export default {
    data() {
        return {
            // 弹窗状态
            dialogVisible: false,
            // 表单数据
            ruleForm: {
                agentS: [],
                oldAgentId: 0,
                targetAgentId: null
            },
            agentList: [],
            agentS: [],
            tableData: [],
            rules: {
                targetAgentId: [{ required: true, message: "请选择目标代理", trigger: "blur" }],
            },
        }
    },
    methods: {
        // 改变弹窗状态
        getStatus(data) {
            console.log(data);
            this.dialogVisible = !this.dialogVisible
            // 关闭时清空
            if (!this.dialogVisible) {
                this.ruleForm = {
                    agentS: [],
                    oldAgentId: 0,
                    targetAgentId: null
                }
                this.agentList = []
                this.tableData = []
            } else {
                this.ruleForm.oldAgentId = data.id
                this.ruleForm.userName = data.userName
                OldAgentList(data.id).then(res => {
                    this.agentList = res.resultSet
                })
                TargetAgentList(data.id).then(res => {
                    this.tableData = res.resultSet
                })
                // AagentGetList(data.parentId).then(res => {
                //     this.agentList = res.resultSet
                // })
            }

        },
        // 确定添加事件
        getconfirm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.ruleForm.agentS = this.agentS.map(v => {
                        return {
                            agentId: this.agentList[v].id,
                            parentId: this.agentList[v].parentId
                        }
                    });
                    this.$emit('confirm', this.ruleForm)
                    // 关闭弹窗
                    this.dialogVisible = false
                } else {
                    this.$message({
                        message: '请填写完整信息!',
                        type: 'warning'
                    })
                    return false
                }
            })
        }
    }
}
</script>
