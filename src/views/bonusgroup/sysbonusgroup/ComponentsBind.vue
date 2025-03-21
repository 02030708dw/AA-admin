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
                    <el-tree draggable ref="tree" style="margin-top: 5px;" :default-expanded-keys="defaultExpandedKeys"
                        show-checkbox :default-checked-keys="bonusGroup" node-key="gameInfoId" :data="treeData"
                        accordion :allow-drag="allowDrag" :allow-drop="allowDrop" @node-drop="handleNodeDrop">
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
            sortedSysBonusGroup: [],
            defaultExpandedKeys: [],
        };
    },
    methods: {
        // 改变弹窗状态
        async getAddstatus(data) {
            this.dialogVisible = !this.dialogVisible
            if (!this.dialogVisible) {
                this.close()
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
            console.log(selectedItems);
            const gameInfoSort = selectedItems.reduce((acc, curr, index) => {
                acc[curr] = index;
                return acc;
            }, {});
            this.$emit('confirm', { gameInfoSort, gameInfoIdList: selectedItems, bonusGroupId: this.info.id })
            this.dialogVisible = false;
        },
        mapTreeData(list) {
            this.bonusGroup = []
            this.defaultExpandedKeys = [];
            // 提取 gameInfoId -> sort 映射表
            const sortMap = {};
            list.forEach(gwGameInfo => {
                gwGameInfo.gamePlayAndTypeListRespList.forEach(gamePlayAndType => {
                    gamePlayAndType.gamePlayList.forEach(gamePlay => {
                        sortMap[gamePlay.gameInfoId] = gamePlay.sort;
                        this.defaultExpandedKeys.push(gamePlay.gameInfoId);
                        this.bonusGroup.push(gamePlay.gameInfoId);
                    });
                });
            });

            // 重新构建 sortedSysBonusGroup（保证所有数据存在，并按 sort 排序）
            this.sortedSysBonusGroup = this.SysBonusGroup.map(gwGameInfo => {
                return {
                    ...gwGameInfo,
                    gamePlayAndTypeListRespList: gwGameInfo.gamePlayAndTypeListRespList.map(gamePlayAndType => {
                        return {
                            ...gamePlayAndType,
                            gamePlayList: gamePlayAndType.gamePlayList
                                .sort((a, b) => {
                                    const sortA = sortMap[a.gameInfoId] ?? a.sort ?? Number.MAX_SAFE_INTEGER;
                                    const sortB = sortMap[b.gameInfoId] ?? b.sort ?? Number.MAX_SAFE_INTEGER;
                                    return sortA - sortB;
                                })
                        };
                    })
                };
            });
        },
        // 允许拖动（仅允许最后一级拖动）
        allowDrag(node) {
            return !node.childNodes || node.childNodes.length === 0;
        },
        // 允许放置（只允许同级拖动）
        allowDrop(draggingNode, dropNode, type) {
            if (draggingNode.parent !== dropNode.parent) {
                return false; // 只能在相同父级下拖动
            }
            return type === 'prev' || type === 'next'; // 允许放在当前层的前后，不允许放到内部
        },
        // 处理拖动结束后，保持选中和展开状态
        handleNodeDrop(draggingNode, dropNode, type, event) {
            // 1. 记录选中的节点和展开的节点
            const selectedNodes = this.$refs.tree.getCheckedNodes();
            this.$nextTick(() => { //拖动后节点取消选中问题
                if (draggingNode.checked) { //选中就添加
                    selectedNodes.push(draggingNode.data);
                    this.$refs.tree.setCheckedNodes(selectedNodes);
                }
            });
        }
    },
    computed: {
        treeData() {
            return this.sortedSysBonusGroup.map(gwGameInfo => {
                return {
                    label: gwGameInfo.gameName,
                    children: gwGameInfo.gamePlayAndTypeListRespList.map(gamePlayAndType => {
                        return {
                            label: gamePlayAndType.gamePlayTypeName,
                            children: gamePlayAndType.gamePlayList.map(gamePlay => {
                                return {
                                    label: gamePlay.gamePlayName,
                                    gameInfoId: gamePlay.gameInfoId,
                                };
                            })
                        };
                    })
                };
            });
        }
    }
};
</script>

<style></style>