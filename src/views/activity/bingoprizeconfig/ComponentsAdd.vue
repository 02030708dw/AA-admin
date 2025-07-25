<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ComponentsAdd',
  props: {
    weightGroupOptions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        bingoWeightGroupId: null,
        lineNums: null,
        weight: null
      },
      rules: {
        bingoWeightGroupId: [{ required: true, message: '请选择权重分组ID', trigger: 'blur' }],
        lineNums: [{ required: true, message: '请输入连线数量', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入权重', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 打开弹窗并初始化 bingoWeightGroupId
    getAddstatus() {
      this.dialogVisible = true
      this.form = {
        bingoWeightGroupId: null,
        lineNums: null,
        weight: null
      }
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        this.$emit('confirm', this.form)
        this.dialogVisible = false
      })
    }
  }
}
</script>
