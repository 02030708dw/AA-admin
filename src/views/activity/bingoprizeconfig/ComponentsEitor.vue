<template>
  <el-dialog title="编辑宾果奖金配置" :visible.sync="visible" width="500px">
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item label="权重分组" prop="bingoWeightGroupId">
        <el-select v-model="form.bingoWeightGroupId" placeholder="请选择权重分组">
          <el-option v-for="(label, key) in weightGroupOptions" :key="key" :label="label" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item label="连线数量" prop="lineNums">
        <el-input v-model.number="form.lineNums" placeholder="请输入连线数量" />
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input v-model.number="form.weight" placeholder="请输入权重" />
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
  name: 'ComponentsEitor',
  props: {
    weightGroupOptions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      form: {
        id: null,
        bingoWeightGroupId: null,
        lineNums: null,
        weight: null,
      },
      rules: {
        bingoWeightGroupId: [{ required: true, message: '请选择权重分组', trigger: 'change' }],
        lineNums: [{ required: true, message: '请输入连线数量', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入权重', trigger: 'blur' }],
      },
    };
  },
  methods: {
    getAddstatus(row) {
      console.log(row.bingoWeightGroupId, this.weightGroupOptions);

      this.form = {
        id: row.id,
        bingoWeightGroupId: row.bingoWeightGroupId,
        lineNums: row.lineNums,
        weight: row.weight,
      };
      this.visible = true;
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit('confirm', { ...this.form });
          this.visible = false;
        }
      });
    },
  },
};
</script>
