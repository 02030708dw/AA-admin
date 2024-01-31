<template>
  <el-dialog :title="$t('Addrechargeconfiguration')" :visible.sync="dialogVisible" width="40%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm" :inline="true">
      <el-form-item :label="$t('AccountName')" prop="account">
        <el-input v-model="ruleForm.account" style="width: 200px" />
      </el-form-item>
      <el-form-item :label="$t('ChannelID')" prop="channelId">
        <el-select v-model="ruleForm.channelId" placeholder="选择渠道" style="width: 200px">
          <el-option v-for="(item, index) in channelidList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Channeltype')" prop="type">
        <el-select v-model="ruleForm.type" :placeholder="$t('typesof')" style="width: 200px" @change="HandelChange">
          <el-option v-for="(item, index) in TypeList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 1" :label="$t('Alipayaccount')" prop="alipay">
        <el-input v-model="ruleForm.alipay" />
      </el-form-item>
      
      <el-form-item v-if="ruleForm.type === 0" label="选择币种" prop="bankCardNo">
        <el-select v-model="ruleForm.currency" placeholder="选择币种" style="width: 200px">
          <el-option v-for="(item, index) in CurrencytPageData" :key="index" :value="item.index" :label="item.item" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('Bankaccount')" prop="bankCardNo">
        <el-input v-model="ruleForm.bankCardNo" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('BankName')" prop="bankName">
        <el-input v-model="ruleForm.bankName" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" :label="$t('WeChataccount')" prop="wechat">
        <el-input v-model="ruleForm.wechat" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 3" :label="$t('Virtualcoinaddress')" prop="coin">
        <el-input v-model="ruleForm.coin" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload 
        action="#"
        class="avatar-uploader" 
        :show-file-list="false" 
        :on-success="handleAvatarSuccess" :on-error="uploadonerror">
            <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
export default {
  props: {
    channelidList: {
      type: Array,
      default: () => {
        return []
      }
    },
    CurrencytPageData:{
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 渠道类型
      TypeList: [
        { title: '银行卡', index: 0 },
        { title: '支付宝', index: 1 },
        { title: '微信', index: 2 },
        { title: '虚拟币', index: 3 }
      ],
      // 表单数据
      ruleForm: {
        account: '',
        alipay: '',
        bankCardNo: '',
        bankName: '',
        channelId: null,
        coin: '',
        status: 0,
        type: null,
        wechat: '',
        icon: '', //图标
        currency:''
      },
      rules: {
        account: [{ required: true, message: '请输入户名', trigger: 'blur' }],
        alipay: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' }
        ],
        bankCardNo: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '请输入渠道ID', trigger: 'blur' }
        ],
        coin: [
          { required: true, message: '请输入虚拟币地址', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入微信账号', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请输入渠道类型', trigger: 'blur' }],
        icon: [{ required: true, message: '请上传图标', trigger: 'blur' }],
        currency:[{ required: true, message: '请选择币种', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          account: '',
          alipay: '',
          bankCardNo: '',
          bankName: '',
          channelId: null,
          coin: '',
          status: 0,
          type: null,
          wechat: '',
          icon: ''
        }
      }
      this.dialogVisible = !this.dialogVisible
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
    HandelChange() {
      console.log(this.ruleForm.type)
    },
    uploadonerror(err, file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.ruleForm.icon = res
      })
    },
    // 上传图片
    handleAvatarSuccess(response, file, fileList) {
      console.log(file)
      this.getBase64(file.raw).then(res => {
        this.ruleForm.icon = res
      })
    },
    // 图片转base64
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #494b4b3d;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
