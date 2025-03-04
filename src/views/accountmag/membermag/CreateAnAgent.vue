<template>
    <el-dialog :title="$t('Proxytransfer')" :visible.sync="dialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item :label="$t('Applicantsemail')">
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="一级反水率">
                <el-input v-model="ruleForm.firstLevelRate" />
            </el-form-item>
            <el-form-item label="二级反水率">
                <el-input v-model="ruleForm.twoLevelRate" />
            </el-form-item>
            <el-form-item label="三级反水率">
                <el-input v-model="ruleForm.threeLevelRate" />
            </el-form-item>
            <el-form-item label="代理返点设定">
                <div class="flex" v-for="v in ruleForm.settingData">
                    <div class="type">{{ gamertype[v.gameType] }} :</div>
                    <el-input placeholder="充值反水率" v-model="v.rechargeRate" />
                    <el-input placeholder="有效投注比例" v-model="v.ratio" />
                    <el-select clearable v-model="v.type" :placeholder="$t('Typeofclaim')"
                        style="width: 350px;margin:0 5px">
                        <el-option v-for="(item, index) in [{ index: 1, title: '正常统计' }, { index: 2, title: '有效算法' }]"
                            :key="index" :value="item.index" :label="item.title" />
                    </el-select>
                </div>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="getAddstatus()">{{ $t('cancellation') }}</el-button>
            <el-button type="primary" @click="getconfirm()">{{ $t('determine') }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            // 弹窗状态
            dialogVisible: false,
            //表单数据
            ruleForm: {
                email: "",
                firstLevelRate: null,
                id: 0,
                settingData: [
                    {
                        gameType: 0,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 1,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 2,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 3,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 4,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 5,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 6,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 7,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 8,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                    {
                        gameType: 9,
                        ratio: null,
                        rechargeRate: null,
                        type: 1
                    },
                ],
                threeLevelRate: null,
                twoLevelRate: null
            },
            //游戏类型选项
            rules: {
                targetAgentId: [{ required: true, message: "请选择目标代理", trigger: "blur" }],
            },
            settingData: [
                {
                    gameType: 0,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 1,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 2,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 3,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 4,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 5,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 6,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 7,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 8,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
                {
                    gameType: 9,
                    ratio: null,
                    rechargeRate: null,
                    type: 1
                },
            ],
            gamertype: ["未分类", "电子", "棋牌", "彩票", "体育", "真人", "小游戏", "热门", "捕鱼", "斗鸡",],
        };
    },
    methods: {
        // 改变弹窗状态
        getAddstatus(data) {
            this.dialogVisible = !this.dialogVisible;
            const settingData = this.settingData.map(item => ({ ...item }));
            // 关闭时清空
            if (!this.dialogVisible) {
                console.log('关闭');

                this.ruleForm = {
                    email: "",
                    firstLevelRate: null,
                    id: 0,
                    settingData,
                    threeLevelRate: null,
                    twoLevelRate: null
                };
            } else {
                this.ruleForm.settingData = settingData
                console.log(data);

                this.ruleForm.id = data
            }
        },
        // 确定添加事件
        getconfirm() {
            const isValid = this.ruleForm.settingData.every(item => item.ratio !== null && item.rechargeRate !== null);

            if (!isValid) {
                this.$message({
                    message: "请填写完整信息!",
                    type: "warning",
                });
                return;
            }

            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$emit("confirm", this.ruleForm);
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
    },
};
</script>
<style lang="scss">
.flex {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;

    .type {
        width: 175px;
        text-align: right;
    }
}
</style>