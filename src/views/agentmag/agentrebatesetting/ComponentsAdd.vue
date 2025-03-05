<template>
  <el-dialog v-if="dialogVisible" :title="$t('Proxytransfer')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('SelectProxy')" prop="agentId">
        <el-select v-model="ruleForm.agentId" filterable :placeholder="$t('SelectProxy')" style="width: 200px">
          <el-option v-for="(item, index) in agentIddata" :key="index" :value="item.index" :label="item.title" />
        </el-select></el-form-item>
      <el-form-item :label="$t('typesof')" prop="gameType">
        <el-select v-model="ruleForm.gameType" :placeholder="$t('typesof')" style="width: 200px">
          <el-option v-for="(item, index) in typeArrList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Typeofclaim')" prop="type">
        <el-select clearable v-model="ruleForm.type" :placeholder="$t('Typeofclaim')" style="width: 200px">
          <el-option v-for="(item, index) in [{ index: 1, title: '正常统计' }, { index: 2, title: '有效算法' }]" :key="index"
            :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="一级反水率" prop="firstLevelRate">
        <el-input-number :controls="false" style="width: 100px;" :min="0" :max="100"
          v-model="ruleForm.firstLevelRate" /> %
      </el-form-item>
      <el-form-item label="二级反水率" prop="twoLevelRate">
        <el-input-number :controls="false" style="width: 100px;" :min="0" :max="100" v-model="ruleForm.twoLevelRate" />
        %
      </el-form-item>
      <el-form-item label="三级反水率" prop="threeLevelRate">
        <el-input-number :controls="false" style="width: 100px;" :min="0" :max="100"
          v-model="ruleForm.threeLevelRate" /> %
      </el-form-item>

      <el-form-item label="充值反水率" prop="rechargeRate">
        <el-input-number :controls="false" style="width: 100px;" :min="0" :max="100" v-model="ruleForm.rechargeRate" />
        %
      </el-form-item>
      <el-form-item label="有效投注比例" prop="ratio">
        <el-input-number :controls="false" style="width: 100px;" :min="0" :max="100" v-model="ruleForm.ratio"
          placeholder="有效投注比例" /> %
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
      ruleForm: {
        firstLevelRate: null,
        rechargeRate: null,
        threeLevelRate: null,
        twoLevelRate: null,
        ratio: null,
        type: null,
        gameType: null,
        agentId: null,
      },
      rules: {
        firstLevelRate: [{ required: true, message: "请输入一级反水率", trigger: "blur" }],
        threeLevelRate: [{ required: true, message: "请输入三级反水率", trigger: "blur" }],
        twoLevelRate: [{ required: true, message: "请输入二级反水率", trigger: "blur" }],
        rechargeRate: [{ required: true, message: "请输入充值反水率", trigger: "blur" }],
        ratio: [{ required: true, message: "请输入有效投注比例", trigger: "blur" }],
        type: [{ required: true, message: "请选择统计类型", trigger: "blur" }],
        gameType: [{ required: true, message: "请选择游戏类型", trigger: "blur" }],
        agentId: [{ required: true, message: "请选择代理", trigger: "blur" }],
      },
      typeArrList: [
        { title: '未分类', index: 0 },
        { title: '电子', index: 1 },
        { title: '棋牌', index: 2 },
        { title: '彩票', index: 3 },
        { title: '体育', index: 4 },
        { title: '真人', index: 5 },
        { title: '小游戏', index: 6 },
        { title: '热门', index: 7 },
        { title: "捕鱼", index: 8 },
        { title: "斗鸡", index: 9 },
      ],
      max: 100
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      this.ruleForm = {
        type: null,
        gameType: null,
        agentId: null,
        ratio: undefined,
        firstLevelRate: undefined,
        rechargeRate: undefined,
        threeLevelRate: undefined,
        twoLevelRate: undefined
      };
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.rechargeRate = this.ruleForm.rechargeRate / 100
          this.ruleForm.threeLevelRate = this.ruleForm.threeLevelRate / 100
          this.ruleForm.twoLevelRate = this.ruleForm.twoLevelRate / 100
          this.ruleForm.firstLevelRate = this.ruleForm.firstLevelRate / 100
          this.ruleForm.ratio = this.ruleForm.ratio / 100
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
