<template>
  <el-dialog :title="$t('Addrechargeconfiguration')" :visible.sync="dialogVisible" width="40%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm" :inline="true">
      <el-form-item :label="$t('ChannelID')" prop="channelId">
        <el-select v-model="ruleForm.channelId" placeholder="选择渠道" style="width: 200px">
          <el-option v-for="(item, index) in channelidList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Maximumrechargeamount')" prop="maxMoney">
        <el-input v-model="ruleForm.maxMoney" />
      </el-form-item>
      <el-form-item :label="$t('Minimumrechargeamount')" prop="minMoney">
        <el-input v-model="ruleForm.minMoney" />
      </el-form-item>
      <el-form-item style="width: 350px" :label="$t('state')" prop="status">
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <!-- <el-form-item :label="$t('Channeltype')" prop="type">
        <el-select v-model="ruleForm.type" :placeholder="$t('typesof')" style="width: 200px">
          <el-option v-for="(item, index) in TypeList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item> -->

      <el-form-item v-if="ruleForm.type === 0" :label="$t('AccountName')" prop="account">
        <el-input v-model="ruleForm.account" style="width: 200px" />
      </el-form-item>

      <el-form-item v-if="ruleForm.type === 1" :label="$t('Alipayaccount')" prop="alipay">
        <el-input v-model="ruleForm.alipay" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('Bankaccount')" prop="bankCardNo">
        <el-input v-model="ruleForm.bankCardNo" />
      </el-form-item>
      <el-form-item v-if="Channeltype > 3" label="三方充值" placeholder="请选择三方充值" prop="threePayId">
        <el-select v-model="ruleForm.threePayId" :placeholder="$t('typesof')" style="width: 200px"
          @change="threePayIdChange">
          <el-option v-for="(item, index) in thirdDropDownList" :key="index" :value="item.id" :label="item.threeName" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="Channeltype > 3" label="银行编号" placeholder="请选择银行编号" prop="bankCode">
        <el-autocomplete @select="handleSelect" class="inline-input" v-model="ruleForm.bankCode"
          :fetch-suggestions="querySearch" placeholder="请输入内容">
          <template slot-scope="{ item }">
            <div class="name">{{ item.bankCode }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('BankName')" prop="bankName">
        <el-select v-model="ruleForm.bankName" :placeholder="$t('typesof')" style="width: 200px"
          @change="bankNameChange">
          <el-option v-for="(item, index) in bankCodeList" :key="index" :value="item.bankCode" :label="item.bankCode" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type > 3" :label="$t('BankName')" prop="bankName">
        <el-input v-model="ruleForm.bankName" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type > 3" :label="$t('SelectCurrency')" prop="currency">
        <el-radio-group v-model="ruleForm.currency">
          <el-radio v-for="v in CurrencytPageData" :label="v.item" :key="v.index">{{ v.item }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 0" :label="$t('SelectCurrency')">
        <el-input v-model="ruleForm.currency" disabled />
        <!-- <el-select v-model="ruleForm.currency" placeholder="选择币种" style="width: 200px">
          <el-option v-for="(item, index) in CurrencytPageData" :key="index" :value="item.index" :label="item.item" />
        </el-select> -->
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" :label="$t('WeChataccount')" prop="wechat">
        <el-input v-model="ruleForm.wechat" />
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 3" :label="$t('Virtualcoinaddress')" prop="coin">
        <el-input v-model="ruleForm.coin" />
      </el-form-item>

      <el-form-item :label="$t('icon')" prop="icon">
        <el-upload action="#" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
          :on-error="uploadonerror">
          <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar" />
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
import { cashBankList } from "@/api/finance/WithdrawalBank";
export default {
  props: {
    channelidList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    CurrencytPageData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    thirdDropDownList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    Channeltype() {
      let type = null;
      this.channelidList.forEach((v) => {
        if (this.ruleForm.channelId == v.index) {
          type = v.type;
          this.ruleForm.type = v.type;
        }
      });
      if (type === 0) {
        cashBankList(0).then((res) => {
          this.bankCodeList = res.resultSet;
        });
      }
      return type;
    },
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 渠道类型
      TypeList: [
        { title: "银行卡", index: 0 },
        { title: "支付宝", index: 1 },
        { title: "微信", index: 2 },
        { title: "虚拟币", index: 3 },
        { title: "QR支付", index: 4 },
        { title: "gcash充值", index: 5 },
        { title: "PMP充值", index: 6 },
        { title: "UBP充值", index: 7 },
        { title: "usdt充值", index: 8 },
        { title: "MAYA充值", index: 9 },
        { title: "网银", index: 10 },
      ],
      // 表单数据
      ruleForm: {
        account: "",
        alipay: "",
        bankCardNo: "",
        bankName: "",
        channelId: null,
        coin: "",
        status: 0,
        type: null,
        wechat: "",
        icon: "", //图标
        currency: "",
        bankCode: "",
        threePayId: "",
        maxMoney: '',
        minMoney: ''
      },
      rules: {
        account: [{ required: true, message: "请输入户名", trigger: "blur" }],
        alipay: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" },
        ],
        bankCardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
        ],
        channelId: [
          { required: true, message: "请输入渠道ID", trigger: "blur" },
        ],
        coin: [
          { required: true, message: "请输入虚拟币地址", trigger: "blur" },
        ],
        wechat: [
          { required: true, message: "请输入微信账号", trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入渠道类型", trigger: "blur" }],
        icon: [{ required: true, message: "请上传图标", trigger: "blur" }],
        currency: [{ required: true, message: "请选择币种", trigger: "blur" }],
        threePayId: [
          { required: true, message: "请选择充值类型", trigger: "blur" },
        ],
        bankCode: [
          { required: true, message: "请选择银行编号", trigger: "blur" },
        ],
        maxMoney: [
          { required: true, message: "请输入最大金额", trigger: "blur" },
        ],
        minMoney: [
          { required: true, message: "请输入最小金额", trigger: "blur" },
        ],
      },
      loading: false,
      bankCodeList: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.bankCodeList;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.bankCode.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(v) {
      this.ruleForm.bankCode = v.bankCode;
    },
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.bankCodeList = []
        this.ruleForm = {
          account: "",
          alipay: "",
          bankCardNo: "",
          bankName: "",
          channelId: null,
          coin: "",
          status: 0,
          type: null,
          wechat: "",
          icon: "",
          bankCode: "",
          threePayId: "",
          maxMoney: '',
          minMoney: '',
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.ruleForm);
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
    threePayIdChange() {
      this.loading = true
      cashBankList(this.ruleForm.threePayId).then((res) => {
        this.bankCodeList = res.resultSet;
        this.loading = false
      });
    },
    bankNameChange() {
      this.ruleForm.currency = this.bankCodeList.find(
        (item) => item.bankName === this.ruleForm.bankName
      ).currency;
    },
    uploadonerror(err, file, fileList) {
      this.getBase64(file.raw).then((res) => {
        this.ruleForm.icon = res;
      });
    },
    // 上传图片
    handleAvatarSuccess(response, file, fileList) {
      console.log(file);
      this.getBase64(file.raw).then((res) => {
        this.ruleForm.icon = res;
      });
    },
    // 图片转base64
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
  },
};
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
  border-color: #409eff;
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
