<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入描述" />
      </el-form-item>

      <el-form-item label="活动状态" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="返回卡片数量" prop="cardNums">
        <el-input-number v-model="ruleForm.cardNums" :min="0" />
      </el-form-item>
      <el-form-item label="卡片选择时间(秒)" prop="changCardTime">
        <el-input-number v-model="ruleForm.changCardTime" :min="0" />
      </el-form-item>
      <el-form-item label="每日刮刮卡初始数量" prop="dailyCardsLimit">
        <el-input-number v-model="ruleForm.dailyCardsLimit" :min="0" />
      </el-form-item>
      <el-form-item label="代理扣除金额" prop="deductAmount">
        <el-input-number v-model="ruleForm.deductAmount" :min="0" />
      </el-form-item>
      <el-form-item label="数字错误扣时(秒)" prop="errorTime">
        <el-input-number v-model="ruleForm.errorTime" :min="0" />
      </el-form-item>
      <el-form-item label="游戏结束时长(秒)" prop="overTime">
        <el-input-number v-model="ruleForm.overTime" :min="0" />
      </el-form-item>
      <el-form-item label="充值用户奖励奖金" prop="rechargeBonus">
        <el-input-number v-model="ruleForm.rechargeBonus" :min="0" />
      </el-form-item>
      <el-form-item label="充值用户奖励刮刮卡数量" prop="rechargeCards">
        <el-input-number v-model="ruleForm.rechargeCards" :min="0" />
      </el-form-item>
      <el-form-item label="注册用户奖励奖金" prop="registrationBonus">
        <el-input-number v-model="ruleForm.registrationBonus" :min="0" />
      </el-form-item>
      <el-form-item label="注册用户奖励刮刮卡数量" prop="registrationCards">
        <el-input-number v-model="ruleForm.registrationCards" :min="0" />
      </el-form-item>
      <!-- 奖金配置 awardConfigs -->
      <div>
        <div class="table-head">
          <div class="label">奖金配置列表</div> <el-button type="primary" size="small" @click="addAwardConfig">新增</el-button>
        </div>
        <div class="table-body">
          <div class="table-row table-header">
            <div class="table-cell">awardAmount</div>
            <div class="table-cell">lineNum</div>
            <div class="table-cell"></div>

          </div>
          <div class="table-row" v-for="(item, index) in ruleForm.awardConfigs" :key="index">
            <div class="table-cell">
              <el-input v-model="item.awardAmount" placeholder="请输入" size="small" />
            </div>
            <div class="table-cell">
              <el-input v-model="item.lineNum" placeholder="请输入" size="small" />
            </div>
            <div class="table-cell">
              <el-button type="danger" size="small" @click="ruleForm.awardConfigs.splice(index, 1)">
                删除
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 奖金等级配置 -->
      <div style="margin-top: 20px;">
        <div class="table-head">
          <div class="label">奖金等级配置列表</div> <el-button type="primary" size="small" @click="addAwardLevel">新增</el-button>
        </div>
        <div class="table-body">
          <div class="table-row table-header">
            <div class="table-cell">amount</div>
            <div class="table-cell">minTime</div>
            <div class="table-cell">maxTime</div>
            <div class="table-cell"></div>
          </div>
          <div class="table-row" v-for="(item, index) in ruleForm.awardLeves" :key="index">
            <div class="table-cell">
              <el-input v-model="item.amount" placeholder="请输入" size="small" />
            </div>
            <div class="table-cell">
              <el-input v-model="item.minTime" placeholder="请输入" size="small" />
            </div>
            <div class="table-cell">
              <el-input v-model="item.maxTime" placeholder="请输入" size="small" />
            </div>
            <div class="table-cell">
              <el-button type="danger" size="small" @click="ruleForm.awardLeves.splice(index, 1)">
                删除
              </el-button>
            </div>
          </div>
        </div>
      </div>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus">取消</el-button>
      <el-button type="primary" @click="getconfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ComponentsAdd',
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        description: '',
        status: 1,
        cardNums: 0,
        changCardTime: 0,
        dailyCardsLimit: 0,
        deductAmount: 0,
        errorTime: 0,
        overTime: 0,
        rechargeBonus: 0,
        rechargeCards: 0,
        registrationBonus: 0,
        registrationCards: 0,
        awardConfigs: [],
        awardLeves: [],
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        dailyCardsLimit: [{ required: true, message: '请输入初始数量', trigger: 'blur' }],
        deductAmount: [{ required: true, message: '请输入扣除金额', trigger: 'blur' }],
        rechargeBonus: [{ required: true, message: '请输入充值奖励', trigger: 'blur' }],
        registrationBonus: [{ required: true, message: '请输入注册奖励', trigger: 'blur' }],
      },
    }
  },
  methods: {
    getAddstatus() {
      if (!this.dialogVisible) {
        this.dialogVisible = true
        this.ruleForm = {
          name: '',
          description: '',
          status: 1,
          cardNums: 0,
          changCardTime: 0,
          dailyCardsLimit: 0,
          deductAmount: 0,
          errorTime: 0,
          overTime: 0,
          rechargeBonus: 0,
          rechargeCards: 0,
          registrationBonus: 0,
          registrationCards: 0,
          awardConfigs: [{
            awardAmount: '',
            lineNum: '',
          }],
          awardLeves: [{
            amount: '',
            minTime: '',
            maxTime: '',
          }],
        }
      } else {
        this.dialogVisible = false
      }
    },
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.ruleForm)
          this.dialogVisible = false
        } else {
          this.$message({ message: '请填写完整信息!', type: 'warning' })
        }
      })
    },
    open(data = {}) {

    },
    addAwardConfig() {
      this.ruleForm.awardConfigs.push({
        awardAmount: '',
        lineNum: '',
      });
    },
    removeAwardConfig(index) {
      this.ruleForm.awardConfigs.splice(index, 1);
    },
    addAwardLevel() {
      this.ruleForm.awardLeves.push({
        amount: '',
        minTime: '',
        maxTime: '',
      });
    },
    removeAwardLeve(index) {
      this.ruleForm.awardLeves.splice(index, 1);
    },
  },
}
</script>

<style scoped>
.table-body {
  width: 550px;
  margin-left: 170px;
}

.table-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.table-head {
  display: flex;
  align-items: center;
  margin-bottom: 8px
}

.table-cell {
  flex: 1;
  padding-right: 10px;
}

.table-header {
  font-weight: 700;
  color: #333;
  height: 30px;
  text-align: center;
}

.label {
  padding-right: 12px;
  text-align: right;
  width: 170px;
  font-size: 14px;
  font-weight: 700;
}
</style>
