<template>
  <el-dialog :title="$t('Membershiptransfer')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('MemberID')" prop="">
        <span>{{ ruleForm.id }}</span>
      </el-form-item>
      <el-form-item :label="$t('TargetMemberList')" prop="">
        <!-- <el-select v-model="targetAgentId" placeholder="选择代理" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in TargetMemberList" :key="index" :value="item.index" :label="item.title" />
        </el-select> -->
      </el-form-item>

      <el-form-item :label="$t('TransferMemberList')" prop="">
        <!-- <el-checkbox-group v-model="agentData">
          <el-checkbox v-for="(item, i) in MemberList" :key="item.id" :label="i">
            {{ item.realName }}
          </el-checkbox>
        </el-checkbox-group> -->
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{$t('cancellation')}}</el-button>
      <el-button type="primary" @click="getconfirm()">{{$t('determine')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { OldMemberList, TargetMemberList } from "@/api/account/member";
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      //表单数据
      ruleForm: {},
      targetMemberId: "",
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
        this.targetMemberId = "";
      } else {
        this.targetMemberId = "";
        console.log(data);
        OldMemberList(data.parentMemberId)
        TargetMemberList(data.parentMemberId)
        this.ruleForm = data;
      }
    },
    // 确定添加事件
    getconfirm() {
      if (!this.targetMemberId) {
        return this.$message({
          message: "请填写完整信息!",
          type: "warning",
        });
      }
      const list = {
        memberS: [
          {
            memberId: this.ruleForm.id,
            parentMemberId: this.ruleForm.parentMemberId,
          },
        ],
        oldMemberId: this.ruleForm.id,
        targetMemberId: this.targetMemberId,
      };
      this.$emit("confirm", list);
      // 关闭弹窗
      this.dialogVisible = false;
    },
  },
};
</script>
<style></style>