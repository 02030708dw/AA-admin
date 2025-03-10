<template>
  <el-dialog :title="$t('审核')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('Reviewstatus')" prop="status">
        <el-select v-model="ruleForm.status" :placeholder="$t('state')" style="width: 200px">
          <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('notes')">
        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="ruleForm.remarks" />
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
      <el-form-item label="代理返点设定">
        <div class="flex" v-for="v in ruleForm.settingData">
          <div class="type">{{ gamertype[v.gameType] }} :</div>
          <el-input-number :controls="false" style="width: 150px;" :min="0" :max="100" v-model="v.ratio"
            placeholder="有效投注比例" /> %
          <el-select clearable v-model="v.type" :placeholder="$t('Typeofclaim')" style="width: 200px;margin:0 5px">
            <el-option v-for="(item, index) in [{ index: 1, title: '正常统计' }, { index: 2, title: '有效算法' }]" :key="index"
              :value="item.index" :label="item.title" />
          </el-select>
        </div>
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
import UploadImage from '@/components/Upload/imageDemo.vue'
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        id: 0,
        remarks: "",
        status: "",
        firstLevelRate: null,
        settingData: [
          {
            gameType: 0,
            ratio: undefined,
            type: 1
          },
          {
            gameType: 1,
            ratio: null,
            type: 1
          },
          {
            gameType: 2,
            ratio: null,
            type: 1
          },
          {
            gameType: 3,
            ratio: null,
            type: 1
          },
          {
            gameType: 4,
            ratio: null,
            type: 1
          },
          {
            gameType: 5,
            ratio: null,
            type: 1
          },
          {
            gameType: 6,
            ratio: null,
            type: 1
          },
          {
            gameType: 7,
            ratio: null,
            type: 1
          },
          {
            gameType: 8,
            ratio: null,
            type: 1
          },
          {
            gameType: 9,
            ratio: null,
            type: 1
          },
        ],
        rechargeRate: null,
        threeLevelRate: null,
        twoLevelRate: null
      },
      rules: {
        status: [
          { required: true, message: "审核状态不能为空", trigger: "blur" },
        ],
        firstLevelRate: [{ required: true, message: "请输入一级反水率", trigger: "blur" }],
        threeLevelRate: [{ required: true, message: "请输入三级反水率", trigger: "blur" }],
        twoLevelRate: [{ required: true, message: "请输入二级反水率", trigger: "blur" }],
        rechargeRate: [{ required: true, message: "请输入充值反水率", trigger: "blur" }],
      },
      settingData: [
        {
          gameType: 0,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 1,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 2,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 3,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 4,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 5,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 6,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 7,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 8,
          ratio: undefined,
          type: 1
        },
        {
          gameType: 9,
          ratio: undefined,
          type: 1
        },
      ],
      gamertype: ["未分类", "电子", "棋牌", "彩票", "体育", "真人", "小游戏", "热门", "捕鱼", "斗鸡",],
      statusType: [
        { title: '通过', index: 2 },
        { title: '拒绝', index: 3 }
      ],
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      const settingData = this.settingData.map(item => ({ ...item }));
      this.ruleForm = {
        id: 0,
        remarks: "",
        status: "",
        firstLevelRate: undefined,
        settingData,
        rechargeRate: undefined,
        threeLevelRate: undefined,
        twoLevelRate: undefined
      };
      this.ruleForm.id = data.id
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        const isValid = this.ruleForm.settingData.every(item => item.ratio !== null);
        if (valid & isValid) {
          this.ruleForm.settingData.forEach(item => {
            item.ratio /= 100;
          });
          this.ruleForm.rechargeRate = this.ruleForm.rechargeRate / 100
          this.ruleForm.threeLevelRate = this.ruleForm.threeLevelRate / 100
          this.ruleForm.twoLevelRate = this.ruleForm.twoLevelRate / 100
          this.ruleForm.firstLevelRate = this.ruleForm.firstLevelRate / 100
          this.$emit("confirm", this.ruleForm);
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
          return false
        }
      })
    },
  }
}
</script>
<style lang="scss">
.flex {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;

  .type {
    width: 60px;
    text-align: right;
  }
}
</style>