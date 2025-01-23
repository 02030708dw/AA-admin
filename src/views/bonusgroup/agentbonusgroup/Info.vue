<template>
  <el-dialog width="40%" title="代理奖金组详情" :visible.sync="dialogVisible">
    <el-form v-loading="loading" label-width="150px" disabled style="width: 400px;" class="demo-ruleForm">
      <el-form-item label="方案名称">
        <el-input v-model="info.planName" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="info.description" />
      </el-form-item>
      <el-form-item label="奖金组">
        <el-tree style="margin-top: 5px;" :data="treeData" accordion @node-click="handleNodeClick">
        </el-tree>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button> -->
      <el-button type="primary" @click="getAddstatus()">{{
        $t("determine")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { agentBonusGroupInfo } from "@/api/bonusgroup/agentbonusgroup";
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      bonusGroup: [],
      info: {},
      loading: false
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    // 改变弹窗状态
    async getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        console.log(2);
        this.bonusGroup = []
      } else {
        this.loading = true
        const res = await agentBonusGroupInfo({ planId: data.id, userId: data.userId })
        this.bonusGroup = res.resultSet.bonusGroupList
        this.info = res.resultSet
        this.loading = false
      }
    },

  },
  computed: {
    treeData() {
      return this.bonusGroup.map(bonusGroup => {
        return {
          label: bonusGroup.bonusGroupName,
          children: bonusGroup.gwGameInfoList.map(gwGameInfo => {
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
                      bonusGroupAgentSettingId: gamePlay.bonusGroupAgentSettingId
                    };
                  })
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
