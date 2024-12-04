<template>
  <el-dialog :title="$t('EditAnnouncement')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="权重">
        <el-input v-model="ruleForm.weight" />
      </el-form-item>
      <el-form-item label="奖励金额">
        <el-input v-model="ruleForm.amount" />
      </el-form-item>
      <el-form-item label="奖励类型">
        <el-select v-model="ruleForm.type" placeholder="奖励类型" style="width: 200px">
          <el-option v-for="(item, index) in typeData" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="转盘格子索引">
        <el-input v-model="ruleForm.segmentIndex" />
      </el-form-item>
      <el-form-item :label="$t('icon')" >
        <UploadImage v-if="dialogVisible" :img="ruleForm.pictureUrl" :Fn="'spin'" @Upload="getImageURL" />
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

      }
    }
  },
  components: {
    UploadImage
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "amount": null,
          "segmentIndex": null,
          "type": null,
          "weight": null
        }
      } else {
        this.ruleForm = { ...data }
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
  }
}
</script>
