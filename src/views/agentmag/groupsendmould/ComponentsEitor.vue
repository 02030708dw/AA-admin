<template>
  <el-dialog title="编辑" :visible.sync="dialogVisible" width="70%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="副标题" prop="subtitle">
        <el-input v-model="ruleForm.subtitle" placeholder="请输入副标题" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型" style="width: 200px">
          <el-option v-for="item in typeData" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-radio-group v-model="timeType">
          <el-radio :label="1">每天</el-radio>
          <el-radio :label="2">每N小时</el-radio>
          <el-radio :label="3">每N分钟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="timeType == 2 || timeType == 3" label="时间间隔">
        <el-input-number v-if="timeType == 2" :max="24" v-model="timeScale" placeholder="时间间隔" />
        <el-input-number v-else :max="60" v-model="timeScale" placeholder="时间间隔" />
      </el-form-item>
      <el-form-item label="时间点" v-else>
        <template>
          <el-input v-model="timeScale" placeholder="请输入时间点，如 07:00,09:00" :style="{ width: '250px' }" />
        </template>
      </el-form-item>
      <el-form-item :label="$t('content')" prop="content">
        <Tinymce v-model="ruleForm.content"></Tinymce>
      </el-form-item>

      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="ruleForm.link" placeholder="请输入跳转链接" />
      </el-form-item>
      <el-form-item label="图片">
        <UploadImage v-if="dialogVisible" :img="ruleForm.picture" Fn="groupsendmould" @Upload="getImageURL" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">取消</el-button>
      <el-button type="primary" @click="getconfirm()">确定</el-button>
    </span>
  </el-dialog>
</template>


<script>
import UploadImage from '@/components/Upload/imageDemo.vue'
import Tinymce from '@/components/Editor/index.vue'
export default {
  components: { UploadImage, Tinymce },
  watch: {
    timeType(newVal) {
      this.timeScale = null
    }
  },
  data() {
    return {
      dialogVisible: false,
      timeType: 1,
      timeScale: '',
      ruleForm: {
        id: null,
        title: '',
        subtitle: '',
        type: null,
        time: '',
        content: '',
        link: '',
        picture: '',
        status: null
      },
      typeData: [
        { value: 1, label: '红包' },
        { value: 2, label: '刮刮乐' },
        { value: 3, label: '免费彩票' },
        { value: 4, label: '转盘' },
        { value: 5, label: '宾果' },
        { value: 6, label: '代金券' },
        { value: 7, label: '预告' }
      ],
      rules: {}
    }
  },
  methods: {
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          id: null,
          title: '',
          subtitle: '',
          type: null,
          time: '',
          content: '',
          link: '',
          picture: '',
          status: null
        }
        this.timeScale = ''
        this.timeType = null
      } else if (data) {
        this.ruleForm = { ...data }
        this.parseCronToTime(data.time)

      }
    },
    getconfirm() {
      this.updateCron()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('confirm', this.ruleForm)
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
        }
      })
    },
    getImageURL(url) {
      this.ruleForm.picture = url
    },
    updateCron() {
      let cron = ''
      if (this.timeType === 1) {
        // 每天多个时间点，如 07:00,09:00
        if (!this.timeScale || typeof this.timeScale !== 'string') {
          this.$message.warning('请输入时间点，格式如 07:00,09:00')
          return false
        }

        const times = this.timeScale.split(',').map(t => t.trim())
        const validTimes = times.filter(t => /^\d{1,2}:\d{2}$/.test(t))

        if (validTimes.length !== times.length) {
          this.$message.warning('时间点格式错误，请使用 07:00 格式并用英文逗号分隔')
          return false
        }

        cron = validTimes
          .map(t => {
            const [hour, minute] = t.split(':')
            const h = parseInt(hour)
            const m = parseInt(minute)
            if (h < 0 || h > 23 || m < 0 || m > 59) {
              return null
            }
            return `${m} ${h} * * *`
          })
          .filter(Boolean)
          .join(';')

        if (!cron) {
          this.$message.warning('请确保时间点在合法范围内（小时0-23，分钟0-59）')
          return false
        }

      } else if (this.timeType === 2) {
        // 每 N 小时
        const n = parseInt(this.timeScale)
        if (isNaN(n) || n <= 0 || n > 24) {
          this.$message.warning('请输入合法的小时间隔（1-24）')
          return false
        }
        cron = `0 */${n} * * *`

      } else if (this.timeType === 3) {
        // 每 N 分钟
        const n = parseInt(this.timeScale)
        if (isNaN(n) || n <= 0 || n > 60) {
          this.$message.warning('请输入合法的分钟间隔（1-60）')
          return false
        }
        cron = `*/${n} * * * *`
      }

      this.ruleForm.time = cron
      return true
    },
    parseCronToTime(cron) {
      if (!cron) return

      if (cron.includes(';')) {
        // 每天多个时间点
        const times = cron.split(';').map(c => {
          const [min, hour] = c.split(' ')
          return `${hour.padStart(2, '0')}:${min.padStart(2, '0')}`
        })
        this.timeType = 1
        this.$nextTick(() => {
          this.timeScale = times.join(',')
        })

      } else if (/^\d+ \d+ \* \* \*$/.test(cron)) {
        // 每天单个时间点
        const [min, hour] = cron.split(' ')
        this.timeType = 1
        this.$nextTick(() => {
          this.timeScale = `${hour.padStart(2, '0')}:${min.padStart(2, '0')}`
        })
      } else if (/^\d+ \*\/(\d+)/.test(cron)) {
        // 每N小时
        const match = cron.match(/^\d+ \*\/(\d+)/)
        if (match) {
          this.timeType = 2
          this.$nextTick(() => {
            this.timeScale = parseInt(match[1])
          })
        }

      } else if (/^\*\/(\d+) /.test(cron)) {
        // 每N分钟
        const match = cron.match(/^\*\/(\d+)/)
        if (match) {
          this.timeType = 3
          this.$nextTick(() => {
            this.timeScale = parseInt(match[1])
          })
        }
      } else {
        this.timeType = 1
        this.timeScale = ''
      }
    }

  }
}
</script>
