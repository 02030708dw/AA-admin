<template>
  <el-dialog :title="$t('EditCurrency')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('一级日盈利率')" prop="firstLevelDailyRate">
        <el-input v-model="ruleForm.firstLevelDailyRate" placeholder="请输入一级日盈利率" />
      </el-form-item>
      <el-form-item :label="$t('二级日盈利率')" prop="secondLevelDailyRate">
        <el-input v-model="ruleForm.secondLevelDailyRate" placeholder="请输入二级日盈利率" />
      </el-form-item>
      <el-form-item :label="$t('邮箱')" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="社交媒体渠道">
        <el-select v-model="selectedPlatforms" multiple collapse-tags placeholder="请选择社交媒体渠道" style="width: 100%"
          @change="handlePlatformChange">
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 动态渲染平台输入 -->
      <el-form-item v-for="platform in selectedPlatforms" :key="platform" :label="getLabel(platform)" required>
        <div style="display: flex; gap: 10px; width: 100%">
          <el-input v-model="getSoftwareObj(platform).transferTitle" placeholder="请输入账号" style="flex: 1" />
          <!-- <el-input v-model="getSoftwareObj(platform).link" placeholder="请输入链接" style="flex: 2" /> -->
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getEditstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">{{ $t("determine") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        email: '',
        firstLevelDailyRate: '',
        secondLevelDailyRate: '',
        socialSoftware: [] // 提交时赋值
      },
      selectedPlatforms: [], // 仅用于 select 绑定
      socialSoftwareData: [], // 存完整结构
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        firstLevelDailyRate: [
          { required: true, message: '请输入一级日盈利率', trigger: 'blur' }
        ],
        secondLevelDailyRate: [
          { required: true, message: '请输入二级日盈利率', trigger: 'blur' }
        ]
      },
      options: [
        { text: 'Facebook', value: 'facebook' },
        { text: 'Telegram', value: 'telegram' },
        { text: 'LINE', value: 'line' },
        { text: 'Instagram', value: 'instagram' },
        { text: 'YouTube', value: 'youtube' },
        { text: 'TikTok', value: 'tiktok' }
      ]
    }
  },
  methods: {
    getEditstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          id: '',
          email: '',
          firstLevelDailyRate: '',
          secondLevelDailyRate: '',
          socialSoftware: []
        }
        this.selectedPlatforms = []
        this.socialSoftwareData = []
      } else {
        this.ruleForm = {
          id: data.id,
          email: data.email || '',
          firstLevelDailyRate: data.firstLevelDailyRate || '',
          secondLevelDailyRate: data.secondLevelDailyRate || '',
          socialSoftware: []
        }

        try {
          const parsed = typeof data.socialSoftware === 'string'
            ? JSON.parse(data.socialSoftware)
            : Array.isArray(data.socialSoftware)
              ? data.socialSoftware
              : [];

          this.socialSoftwareData = parsed;
          this.selectedPlatforms = parsed.map(item => item.name);
        } catch (e) {
          this.socialSoftwareData = [];
          this.selectedPlatforms = [];
        }
        console.log(data, this.selectedPlatforms);
      }
    },
    handlePlatformChange(newList) {
      this.socialSoftwareData = newList.map(name => {
        const exist = this.socialSoftwareData.find(i => i.name === name)
        return exist || { name, transferTitle: '', link: '' }
      })
    },
    getconfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.socialSoftware = this.socialSoftwareData
          this.dialogVisible = false
          this.$emit('confirm', this.ruleForm)
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
        }
      })
    },
    getLabel(val) {
      const item = this.options.find(opt => opt.value === val);
      return item ? item.text : val;
    },
    getSoftwareObj(name) {
      const found = this.socialSoftwareData?.find(i => i.name === name);
      if (!found) {
        const obj = { name, transferTitle: '', link: '' };
        this.socialSoftwareData.push(obj);
        return obj;
      }
      return found;
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
