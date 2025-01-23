<template>
    <el-dialog top="20px" width="50%" title="绑定" :visible.sync="dialogVisible">
        <el-form v-loading="loading" label-width="150px" class="demo-ruleForm">
            <el-form-item label="奖金组名称">
                <el-input disabled v-model="info.groupName" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input disabled v-model="info.description" />
            </el-form-item>
            <el-form-item label="奖金组">
                <div style="height: 300px;overflow-y: scroll;overflow-x: hidden">
                    <el-tree ref="tree" style="margin-top: 5px;" :default-expanded-keys="defaultExpandedKeys"
                        show-checkbox :default-checked-keys="bonusGroup" node-key="gameInfoId" :data="treeData"
                        accordion>
                    </el-tree>
                </div>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
            <el-button type="primary" @click="getconfirm()">{{
                $t("determine")
                }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { bonusGroupInfo } from "@/api/bonusgroup/sysbonusgroup";
export default {
    props: {
        SysBonusGroup: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // 弹窗状态
            dialogVisible: false,
            bonusGroup: [], //初始选中的奖金组
            info: {},
            loading: false,
            defaultExpandedKeys: [],
        };
    },
    methods: {
        // 改变弹窗状态
        async getAddstatus(data) {
            this.dialogVisible = !this.dialogVisible
            if (!this.dialogVisible) {
                this.bonusGroup = []
                this.defaultExpandedKeys = [];
            } else {
                this.loading = true
                const res = await bonusGroupInfo({ id: data.id })
                this.mapTreeData(res.resultSet) //渲染当前项树形结构
                this.info = data
                this.loading = false
            }
        },
        close() {
            this.bonusGroup = []
            this.defaultExpandedKeys = [];
        },
        getconfirm() {
            const selectedItems = this.$refs.tree.getCheckedNodes(true).map(item => item.gameInfoId)
            this.$emit('confirm', { gameInfoIdList: selectedItems, bonusGroupId: this.info.id })
            this.dialogVisible = false;
        },
        getGameInfoIdList(list = []) {
            const newIDList = [];
            list.map(gwGameInfo => {
                gwGameInfo.gamePlayAndTypeListRespList.map(gamePlayAndType => {
                    gamePlayAndType.gamePlayList.map(gamePlay => {
                        newIDList.push(gamePlay.gameInfoId)
                    })
                })
            })
            return newIDList
        },
        mapTreeData(list) {
            this.bonusGroup = []
            this.defaultExpandedKeys = [];
            list.map(gwGameInfo => {
                gwGameInfo.gamePlayAndTypeListRespList.map(gamePlayAndType => {
                    gamePlayAndType.gamePlayList.map(gamePlay => {
                        this.defaultExpandedKeys.push(gamePlay.gameInfoId)
                        this.bonusGroup.push(gamePlay.gameInfoId)
                    })
                })
            })
        },
    },
    computed: {
        treeData() {
            console.log(this.bonusGroup, this.defaultExpandedKeys);//别动
            return this.SysBonusGroup.map(gwGameInfo => {
                return {
                    label: gwGameInfo.gameName,
                    children: gwGameInfo.gamePlayAndTypeListRespList.map(gamePlayAndType => {
                        return {
                            label: gamePlayAndType.gamePlayTypeName,
                            children: gamePlayAndType.gamePlayList.map(gamePlay => {
                                return {
                                    label: gamePlay.gamePlayName,
                                    gameInfoId: gamePlay.gameInfoId,
                                    gamePlayId: gamePlay.gamePlayId,
                                    winAmount: gamePlay.winAmount,
                                    sign: gamePlay.sign,
                                };
                            })
                        };
                    })
                };
            });
        },
    }
};
</script>

<style></style>