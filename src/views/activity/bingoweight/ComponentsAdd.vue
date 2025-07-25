<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">

      <!-- 权重分组选择 -->
      <el-form-item label="权重分组" prop="bingoWeightGroupId">
        <el-select v-model="ruleForm.bingoWeightGroupId" placeholder="请选择权重分组" clearable style="width: 200px">
          <el-option v-for="(label, key) in weightGroupOptions" :key="key" :label="label" :value="Number(key)" />
        </el-select>
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入描述" />
      </el-form-item>

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
  props: {
    weightGroupOptions: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        bingoWeightGroupId: null,
        name: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
      },
    }
  },
  methods: {
    getAddstatus() {
      if (!this.dialogVisible) {
        this.dialogVisible = true
        this.ruleForm = {
          bingoWeightGroupId: null,
          name: '',
          description: '',
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
  },
}
</script>
