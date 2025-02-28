<template>
  <el-dialog :title="$t('Proxytransfer')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('targetAgentId')" prop="targetAgentId">
        <el-select v-model="targetAgentId" :placeholder="$t('SelectProxy')" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in agentIddata" :key="index" :value="item.index" :label="item.title" />
        </el-select>
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
  props: {
    agentIddata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      //表单数据
      ruleForm: {},
      targetAgentId: "",
      agentData: [],
      //游戏类型选项
      rules: {
        targetAgentId: [{ required: true, message: "请选择目标代理", trigger: "blur" }],
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
        this.targetAgentId = "";
      } else {
        this.targetAgentId = "";
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
      console.log({ targetAgentId: this.targetAgentId, memberId: this.ruleForm.id });

      this.$emit("confirm", { targetAgentId: this.targetAgentId, memberId: this.ruleForm.id });
      // 关闭弹窗
      this.dialogVisible = false;
    },
  },
};
</script>
<style></style>