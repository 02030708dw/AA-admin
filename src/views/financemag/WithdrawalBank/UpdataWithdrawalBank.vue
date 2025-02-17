<template>
  <!-- 新增 修改 -->
  <el-dialog :title="TypeIndex === 1 ? $t('Editwithdrawalbank') : $t('Addwithdrawalbank')
    " :visible.sync="dialogVisible" width="40%" @close="HandelClose">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('Bankcode')" prop="bankCode">
        <el-input v-model="ruleForm.bankCode" :placeholder="$t('Pleaseenterbankcode')" />
      </el-form-item>
      <el-form-item :label="$t('BankName')" prop="bankName">
        <el-input v-model="ruleForm.bankName" :placeholder="$t('Pleaseenterthebankname')" />
      </el-form-item>

      <el-form-item :label="$t('SelectCurrency')" prop="currency">
        <el-select v-model="ruleForm.currency" :placeholder="$t('SelectCurrency')" style="width: 200px">
          <el-option v-for="(item, index) in CurrencytPageData" :key="index" :value="item.index" :label="item.item" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('Threepartypayment')">
        <el-select @change="selectChange" multiple v-model="ruleForm.threePayIds" :placeholder="$t('Rechargetype')"
          style="width: 300px">
          <el-option v-for="(item, index) in threePayList" :key="index" :value="item.id" :label="item.threeName" />
        </el-select>
      </el-form-item>

      <el-form-item v-for="(v, i) in ruleForm.amountRange" :label="v.threeName" :key="i">
        <el-input :disabled="v.threeName == 'system'" style="margin-bottom: 10px" v-model="v.code"
          placeholder="请输入code"></el-input>
        <el-input-number v-model="v.min" placeholder="最小值"></el-input-number>
        --
        <el-input-number v-model="v.max" placeholder="最大值"></el-input-number>
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
      <el-button @click="HandelChange()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">{{
        $t("determine")
      }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { ThreePayList } from "@/api/finance/memberwithdrawal";
export default {
  props: {
    // 0 添加 1 修改
    TypeIndex: {
      type: Number,
      default: 0,
    },
    // 币种
    CurrencytPageData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        bankCode: "", // 银行编码
        bankName: "", // 银行名称
        icon: "", //图标
        status: 0, // 状态
        id: "", //ID
        currency: "",
        threePayIds: [],
        amountRange: [
          { id: 0, threeName: "system", min: 0, max: 0, code: "system" },
        ],
      },
      rules: {
        bankCode: [
          { required: true, message: "请输入银行编码", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
        ],
        icon: [{ required: true, message: "请上传银行图标", trigger: "blur" }],
        currency: [{ required: true, message: "请选择币种", trigger: "blur" }],
        // threePayIds: [{ required: true, message: '请选择三方支付', trigger: 'blur' }],
      },
      threePayList: [],
    };
  },
  created() {
    ThreePayList().then((res) => {
      this.threePayList = res.resultSet;
    });
  },
  methods: {
    selectChange(v) {
      const list = this.threePayList.filter((item) => v.includes(item.id));
      this.ruleForm.amountRange = [
        { id: 0, threeName: "system", min: 0, max: 0, code: "system" },
        ...list,
      ];
    },
    HandelClose() {
      this.dialogVisible = false;
      this.ruleForm = {
        bankCode: "", // 银行编码
        bankName: "", // 银行名称
        icon: "", //图标
        status: 0, // 状态
        id: "", //ID
        currency: "",
        threePayIds: [],
        amountRange: [
          { id: 0, threeName: "system", min: 0, max: 0, code: "system" },
        ],
      };
    },
    // 改变弹窗状态
    HandelChange(data = null) {
      this.dialogVisible = !this.dialogVisible;
      if (data != null) {
        const [amountRange, threePayIds] = this.getInitData(
          data.amountRange,
          data.threePayIds
        );
        // 填充数据
        this.ruleForm = {
          bankCode: data.bankCode,
          bankName: data.bankName,
          icon: data.icon,
          status: data.status,
          id: data.id,
          currency: data.currency,
          threePayIds,
          amountRange,
        };
      }
      // 关闭时清空数据
      if (!this.dialogVisible) {
        this.ruleForm = {
          bankCode: "", // 银行编码
          bankName: "", // 银行名称
          icon: "", //图标
          status: 0, // 状态
          id: "", //ID
          currency: "",
          threePayIds: "",
          amountRange: "",
        };
      }
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
    // 确定事件
    getconfirm() {
      // this.ruleForm.amountRange = JSON.stringify(this.ruleForm.amountRange)
      // this.ruleForm.threePayIds = this.ruleForm.threePayIds.toString()
      const [amountRange, threePayIds] = this.submitInitData(
        this.ruleForm.amountRange
      );
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("upta", { ...this.ruleForm, threePayIds, amountRange });
          // 关闭弹窗
          this.HandelChange();
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
    getInitData(Range, Ids) {
      function safeJsonParse(data, defaultValue) {
        try {
          return JSON.parse(data);
        } catch (e) {
          return defaultValue;
        }
      }
      Range =
        Range == null
          ? [{ id: 0, threeName: "system", min: 0, max: 0, code: "system" }]
          : JSON.parse(Range);
      Ids = Ids == false ? [] : safeJsonParse(Ids, []);
      let amountRange = [];
      let threePayIds = [];
      Range.map((v) => {
        if (v.id) {
          threePayIds.push(v.id);
        }
        Ids.length &&
          Ids.map((i) => {
            v.id == i.threeId ? amountRange.push({ ...v, code: i.code }) : "";
          });
      });

      return [amountRange, threePayIds];
    },
    submitInitData(data) {
      let amountRange = [];
      let threePayIds = [];
      data.map((v) => {
        // if (!v.id) return // 系统默认的id不处理
        console.log(v);
        const { code, ...rest } = v;
        amountRange.push(rest);
        threePayIds.push({ code: v.code, threeId: v.id });
      });
      return [JSON.stringify(amountRange), JSON.stringify(threePayIds)];
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
