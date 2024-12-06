<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('weight')">
        <el-input v-model="ruleForm.weight" />
      </el-form-item>
      <el-form-item :label="$t('Rewardamount')">
        <el-input v-model="ruleForm.amount" />
      </el-form-item>
      <el-form-item :label="$t('RewardType')">
        <el-select v-model="ruleForm.type" :placeholder="$t('RewardType')" style="width: 200px">
          <el-option v-for="(item, index) in typeData" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Rotarygridindex')">
        <el-input v-model="ruleForm.segmentIndex" />
      </el-form-item>
      <el-form-item :label="$t('icon')" >
        <UploadImage v-if="dialogVisible" :Fn="'spin'" @Upload="getImageURL" />
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
import UploadImage from '@/components/Upload/imageDemo.vue'
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "amount": null,
        "segmentIndex": null,
        "type": null,
        "weight": null
      },
      typeData: [{
        index: 1,
        title: '金额'
      }, {
        index: 2,
        title: '谢谢惠顾'
      }, {
        index: 3,
        title: '再转一次'
      }],
      rules: {

      },
      loading: false
    };
  },
  components: {
    UploadImage
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "amount": null,
          "segmentIndex": null,
          "type": null,
          "weight": null
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'this.ruleForm');
          this.$emit("confirm", this.ruleForm);
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
    getImageURL(url) {
      this.ruleForm.pictureUrl = url
    },
  },
};
</script>