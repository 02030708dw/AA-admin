<template>
  <el-dialog :title="$t('Trialgameaddition')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('Trialaddress')" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item :label="$t('GameMerchantName')" prop="gamerId">
        <el-select v-model="ruleForm.gamerId" filterable @change="GetGamePages" :placeholder="$t('SelectGameMerchant')"
          style="width: 200px">
          <el-option v-for="(item, index) in gamerIdData" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sort')" prop="sort">
        <el-input type='number' v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('gamename')" >
        <el-select v-model="ruleForm.gameId" :loading="loading" filterable :placeholder="$t('gamename')"
          style="width: 200px">
          <el-option v-for="(item, index) in gameIdData" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <UploadImage v-if="dialogVisible" @Upload="getImageURL" />
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
import { gamePage } from '@/api/game/game'
export default {
  props: {
    gamerIdData: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  components: {
    UploadImage
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        name: "",
        url: "",
        sort:0,
        gameId: "",
        gamerId: "",
        status: 0,
        posterImage: 0,
      },
      rules: {
        gamerId: [{ required: true, message: this.$t("GamerIDnotentered"), trigger: "blur" }],
        name: [{ required: true, message: this.$t("Namenotentered"), trigger: "blur" }],
        url: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        sort:[{ required: true, message: "排序不能为空", trigger: "blur" }],
      },
      gameIdData: [],
      loading: false
    };
  },
  methods: {
    // 获取游戏id
    async GetGamePages() {
      this.loading = true
      this.gameIdData = []
      let data = await gamePage({ pageNo: 1, pageSize: 1000000, gamerId: this.ruleForm.gamerId })
      let res = data.resultSet.data
      this.loading = false
      for (let i = 0; i < res.length; i++) {
        this.gameIdData.push({
          title: res[i].name,
          index: res[i].id
        })
      }
    },
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          url: "",
          gameId: "",
          gamerId: "",
          status: 0,
          posterImage: 0,
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
      this.ruleForm.posterImage = url
    },
  },
};
</script>