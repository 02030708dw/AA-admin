<template>
  <el-dialog :title="$t('AddAnnouncementtype')" :before-close="handleClose" :visible.sync="dialogVisible" width="70%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('SelectGameMerchant')" prop="gamerId">
        <el-select v-model="ruleForm.gamerId" clearable filterable :placeholder="$t('SelectGameMerchant')"
          style="width: 200px">
          <el-option v-for="(item, index) in gamerIdData" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('title')" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item :label="$t('content')" prop="content">
        <Tinymce v-if="dialogVisible" v-model="ruleForm.content"></Tinymce>
      </el-form-item>
      <el-form-item :label="$t('Flowrateratio')">
        <el-input v-model="ruleForm.flowRate"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Activitytime')" prop="date">
        <el-date-picker v-model="timeArr" @change="changeTime" type="datetimerange" range-separator="至"
        :start-placeholder="$t('Startdate')" :end-placeholder="$t('EndDate')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox v-for="v in typeList" :key="v.value" :label="v.value">{{ v.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('Giftamount')" v-if="ruleForm.type.indexOf(3) != -1">
        <el-input v-model="ruleForm.giftAmount" />
      </el-form-item>
      <el-form-item  :label="$t('Needtorechargeamount')" v-if="ruleForm.type.indexOf(3) != -1">
        <el-input v-model="ruleForm.rechargeAmount" />
      </el-form-item>
      <el-form-item  :label="$t('Isitarotatingdisplay')">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.isShow"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('picture')" prop="icon">
        <UploadImage v-if="dialogVisible" :img="ruleForm.pictureUrl" fn="activity" @Upload="getImageURL" />
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
import UploadImage from '@/components/Upload/image.vue'
import Tinymce from '@/components/Editor/index.vue'
export default {
  props: {
    gamerIdData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    UploadImage,
    Tinymce
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        content: "",
        pictureUrl: null,
        title: "",
        type: [],
        isShow: 0,
        gamerId: null,
        giftAmount: null,
        rechargeAmount: null,
        flowRate: '',
        startTime: '',
        endTime: '',
      },
      typeList: [
        { value: '1', name: '体育' },
        { value: '2', name: '彩票' },
        { value: '3', name: '兑换' },
        { value: '4', name: '电子' },
        { value: '5', name: '真人' },
        { value: '6', name: '棋牌' },
        { value: '10', name: '其他' },
      ],
      timeArr: null,
      editorInstance: '',
      rules: {
        note: [{ required: true, message: "请输入注释", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        date: [{ validator: this.checkFinalPayTime, required: true, trigger: 'change' }],
      },
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          content: "",
          pictureUrl: null,
          title: "",
          type: [],
          isShow: 0,
          gamerId: null,
          giftAmount: null,
          rechargeAmount: null,
          flowRate: '',
          startTime: '',
          endTime: '',
        }
      } else {

        this.timeArr = [data.startTime, data.endTime]
        this.ruleForm = { ...data }
        this.ruleForm.type = this.ruleForm.typeList
        console.log(this.ruleForm.type);

      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.ruleForm)
          // 关闭弹窗
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
          return false
        }
      })
    },
    getImageURL(url) {
      this.ruleForm.pictureUrl = url
    },
    changeTime() {
      this.ruleForm.startTime = this.$YMDHMS(this.timeArr[0])
      this.ruleForm.endTime = this.$YMDHMS(this.timeArr[1])
    },
    checkFinalPayTime(rule, value, callback) {
      if (this.ruleForm.startTime) {
        callback();
      } else {
        return callback(new Error('请选择活动日期'));
      }
    }
  }
}
</script>
