<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="权重组名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="刮刮乐活动配置id" prop="scratchConfigId">
        <el-select clearable v-model="ruleForm.scratchConfigId" placeholder="配置id" style="width: 200px">
          <el-option v-for="(item, index) in configList" :key="index" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="刮刮乐类型">
        <el-select clearable v-model="ruleForm.type" placeholder="刮刮乐类型" style="width: 200px;">
          <el-option label="RedHot7" :value="1" />
          <el-option label="MoneyTree" :value="2" />
          <el-option label="GoBananas" :value="3" />
          <el-option label="LD" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('describe')">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">{{
        $t("determine")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    configList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "description": "",
        "name": "",
        "scratchConfigId": 0,
        "type": null
      },
      rules: {
        name: [{ required: true, message: '请输入权重组名称', trigger: 'blur' }],
        scratchConfigId: [
          { required: true, message: '请输入刮刮乐活动配置id', trigger: 'blur' }
        ],

      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "description": "",
          "name": "",
          "scratchConfigId": null,
          "type": null
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'this.ruleForm');
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