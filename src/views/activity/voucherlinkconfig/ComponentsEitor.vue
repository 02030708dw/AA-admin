<template>
  <el-dialog title="编辑" :visible.sync="visible" width="40%" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" label-width="170px">
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="每日赠送代金券初始数量">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </span>
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
        status: 1,
      },
      rules: {} // 非必填，暂时不需要校验规则
    }
  },
  methods: {
    getAddstatus(row) {
      this.form = {
        id: row.id,
        name: row.name || '',
        description: row.description || '',
        dailyCardsLimit: row.dailyCardsLimit || null,
        deductAmount: row.deductAmount || null,
        rechargeBonus: row.rechargeBonus || null,
        registrationBonus: row.registrationBonus || null,
        status: typeof row.status === 'number' ? row.status : 1,
      }
      this.visible = true
    },
    submitForm() {
      // 直接发出更新事件，不校验
      this.$emit('confirm', { ...this.form })
      this.visible = false
    },
  },
}
</script>
