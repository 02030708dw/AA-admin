<template>
  <el-dialog title="编辑" :visible.sync="visible" width="40%">
    <el-form :model="form" label-width="160px" ref="formRef">
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="每日赠送转盘初始数量">
        <el-input v-model.number="form.dailyCardsLimit" placeholder="请输入每日初始数量" />
      </el-form-item>
      <el-form-item label="代理创建扣除金额">
        <el-input v-model.number="form.deductAmount" placeholder="请输入代理扣除金额" />
      </el-form-item>
      <el-form-item label="充值用户奖励奖金">
        <el-input v-model.number="form.rechargeBonus" placeholder="请输入充值用户奖金" />
      </el-form-item>
      <el-form-item label="注册用户奖励奖金">
        <el-input v-model.number="form.registrationBonus" placeholder="请输入注册用户奖金" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" active-color="#13ce66" :active-value="1" :inactive-value="0" active-text="启用"
          inactive-text="停用" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ComponentsEditor',
  data() {
    return {
      visible: false,
      form: {
        id: null,
        name: '',
        description: '',
        dailyCardsLimit: null,
        deductAmount: null,
        rechargeBonus: null,
        registrationBonus: null,
        status: null,
      }
    };
  },
  methods: {
    getAddstatus(row) {
      this.form = {
        id: row.id,
        name: row.name,
        description: row.description,
        dailyCardsLimit: row.dailyCardsLimit,
        deductAmount: row.deductAmount,
        rechargeBonus: row.rechargeBonus,
        registrationBonus: row.registrationBonus,
        status: row.status,
      };
      this.visible = true;
    },
    submitForm() {
      this.$emit('confirm', { ...this.form });
      this.visible = false;
    },
  },
};
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
  margin-bottom: 8px;
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
