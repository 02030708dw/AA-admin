<template>
  <el-dialog :title="$t('Proxytransfer')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('agenId')" prop="">
        <span>{{ ruleForm.agenId }}</span>
      </el-form-item>
      <el-form-item :label="$t('MemberID')" prop="">
        <span>{{ ruleForm.id }}</span>
      </el-form-item>
      <el-form-item :label="$t('targetAgentId')" prop="">
        <el-select v-model="targetAgentId" placeholder="选择代理" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in agentIddata" :key="index" :value="item.index" :label="item.title" />
        </el-select>
        <!-- <el-input v-model="targetAgentId"></el-input> -->
      </el-form-item>
      <el-form-item label="原代理的会员列表" prop="">
        <el-checkbox-group v-model="agentData">
          <el-checkbox v-for="(item, i) in agentList" :key="item.id" :label="i">
            {{ item.realName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">取 消</el-button>
      <el-button type="primary" @click="getconfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { OldAgentList, TargetMemberList } from "@/api/account/member";
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      //表单数据
      ruleForm: {},
      targetAgentId: "",
      agentData: [],
      agentIddata: [],
      //游戏类型选项

      rules: {
        // name: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {};
        this.agentIddata = []
        this.targetAgentId = "";
      } else {
        this.targetAgentId = "";
        OldAgentList(data.agenId).then(res => {
          this.agentData = res.resultSet;
        })
        TargetMemberList(data.agenId).then(res => {
          this.agentIddata = res.resultSet;
        })
        this.ruleForm = data;
      }
    },
    // 确定添加事件
    getconfirm() {
      if (!this.targetAgentId) {
        return this.$message({
          message: "请填写完整信息!",
          type: "warning",
        });
      }
      const list = {
        memberS: [
          {
            agenId: this.ruleForm.agenId,
            memberId: this.ruleForm.id,
          },
        ],
        oldAgentId: this.ruleForm.agenId,
        targetMemberId: this.targetAgentId,
      };
      this.$emit("confirm", list);
      // 关闭弹窗
      this.dialogVisible = false;
    },
  },
};
</script>
<style></style>