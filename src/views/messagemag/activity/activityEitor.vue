<template>
  <el-dialog :title="$t('AddAnnouncementtype')" :visible.sync="dialogVisible" width="70%">
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
        <vue-ueditor-wrap class="ueditor"  v-model="ruleForm.content"  :config="config" @ready="ready" />
        <!-- <el-input v-model="ruleForm.content"></el-input> -->
      </el-form-item>
      <el-form-item label="流水倍率" >
        <el-input v-model="ruleForm.flowRate"></el-input>
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-radio v-model="ruleForm.type" :label="1">体育</el-radio>
        <el-radio v-model="ruleForm.type" :label="2">彩票</el-radio> 
        <el-radio v-model="ruleForm.type" :label="3">兑换</el-radio>
      </el-form-item>
      <el-form-item label="赠送金额" v-if="ruleForm.type == 3">
        <el-input v-model="ruleForm.giftAmount" />
      </el-form-item>
      <el-form-item label="需要充值金额" v-if="ruleForm.type == 3">
        <el-input v-model="ruleForm.rechargeAmount" />
      </el-form-item>
      <el-form-item label="是否轮播展示" >
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.isShow"></el-switch>
      </el-form-item>
      <el-form-item label="图片" prop="icon">
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
import VueUeditorWrap from 'vue-ueditor-wrap';
import { ueditorConfig } from '@/components/UEditor.js';
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
    VueUeditorWrap
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      config:ueditorConfig,
      ruleForm: {
        content: "",
        pictureInfos: "",
        title: "",
        type: 0,
        isShow: 0,
        gamerId: null,
        giftAmount: null,
        rechargeAmount: null,
        flowRate:''
      },
      rules: {
        note: [{ required: true, message: "请输入注释", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          content: "",
          pictureInfos: "",
          title: "",
          type: 0,
          isShow: 0,
          gamerId: null,
          giftAmount: null,
          rechargeAmount: null,
          flowRate:''
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
      this.ruleForm.pictureInfos = url
    },
    ready(editorInstance) {
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance);
    },
  }
}
</script>
