<template>
  <el-dialog :title="$t('Addgame')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('gamename')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <!-- <el-form-item :label="$t('GamemerchantsID')" prop="gamerId">
        <el-input v-model="ruleForm.gamerId" />
      </el-form-item> -->

      <el-form-item label="选择游戏商" prop="gamerId">
        <el-select v-model="ruleForm.gamerId" filterable placeholder="选择游戏商" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in gameriddata" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('ThirdpartyID')" prop="threeId">
        <el-input v-model="ruleForm.threeId" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="type">
        <el-select v-model="ruleForm.type" :placeholder="$t('typesof')" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in typeArrList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sort')" prop="sort">
        <el-input type='number' v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-select v-model="ruleForm.status" :placeholder="$t('state')" style="width: 200px;margin-left: 10px">
          <el-option v-for="(item, index) in statusType" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="游戏商图片" prop="pictureInfos">
          <UploadImage v-if="dialogVisible" fn="gamer" @Upload="getImageURL" />
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
export default {
  components: {
    UploadImage
  },
  props: {
    gameriddata: {
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
      // 表单数据
      ruleForm: {
        gamerId: null,
        name: '',
        status: 0,
        threeId: '',
        type: null,
        sort: 0,
        pictureInfos: []
      },
      // 状态
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 },
        { title: '游戏商维护中', index: 2 }
      ],
      // 类型
      typeArrList: [
        { title: '未分类', index: 0 },
        { title: '电子', index: 1 },
        { title: '棋牌', index: 2 },
        { title: '彩票', index: 3 },
        { title: '体育', index: 4 },
        { title: '真人', index: 5 },
        { title: '小游戏', index: 6 },
        { title: '热门', index: 7 },
      ],
      rules: {
        name: [{ required: true, message: '请输入游戏名称', trigger: 'blur' }],
        threeId: [
          { required: true, message: '请输入第三方id', trigger: 'blur' }
        ],
        gamerId: [{ required: true, message: '请输游戏商id', trigger: 'blur' }],
        type: [{ required: true, message: '请输游戏类型', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          gamerId: null,
          name: '',
          status: 0,
          threeId: '',
          type: null,
          pictureInfos: []
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
    getImageURL(urlList) {
      this.ruleForm.pictureInfos = urlList
    },
  }
}
</script>
<style></style>
