<template>
  <el-dialog title="编辑配置" :visible.sync="visible" width="500px" @close="reset">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="权重分组" prop="bingoWeightGroupId">
        <el-select v-model="form.bingoWeightGroupId" placeholder="请选择权重分组" clearable>
          <el-option v-for="(label, key) in weightGroupOptions" :key="key" :label="label" :value="Number(key)" />
        </el-select>
      </el-form-item>

      <el-form-item label="连线数量" prop="lineNums">
        <el-input-number v-model="form.lineNums" :min="1" :max="100" controls-position="right" />
      </el-form-item>

      <el-form-item label="权重" prop="weight">
        <el-input-number v-model="form.weight" :min="0" :step="0.1" controls-position="right" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ComponentsEitor",
  props: {
    weightGroupOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visible: false,
      form: {
        id: null,
        bingoWeightGroupId: null,
        lineNums: null,
        weight: null
      },
      rules: {
        bingoWeightGroupId: [{ required: true, message: '请选择权重分组', trigger: 'change' }],
        lineNums: [{ required: true, message: '请输入连线数量', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入权重', trigger: 'blur' }]
      }
    };
  },
  methods: {
    open(data) {
      this.visible = true;
      this.form = { ...data };
    },
    reset() {
      this.$refs.formRef.resetFields();
    },
    onConfirm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.form);
          this.visible = false;
        }
      });
    }
  }
};
</script>
