<template>
  <div class="main-container">
    <div class="box-wrapper">
      <el-row :gutter="10">
       <el-col :xs="24" :md="8">
         <el-card
           class="box-card personal-box margin-bottom"
           :body-style="{ padding: '10px' }"
         >
           <div class="info-wrapper">
             <div class="avatar-wrapper">
               <div
                 class="avatar"
                 :class="{ 'avatar-touch': touched, 'avatar-end': uploaded }"
                 @mouseenter="avatarTouchStart"
               >
                 <img :src="avatar" />
               </div>
               <div
                 class="camera-layer flex justify-center align-center"
                 @click="uploadAvatar"
               >
                 <i class="el-icon-camera-solid text-white text-sl"></i>
               </div>
             </div>
             <div class="text-xl">
               {{ nickName }}
             </div>
             <div class="des-wrapper">
               <i class="el-icon-edit"></i>
               冰冻三尺，非一日之寒，成大事者不拘小节。
             </div>
             <div class="text-wrapper">
               <div class="label">
                 昵称：
               </div>
               <div class="value">
                 蝴蝶飞呀飞
               </div>
             </div>
             <div class="text-wrapper">
               <div class="label">
                 性别：
               </div>
               <div class="value">
                 男
               </div>
             </div>
             <div class="text-wrapper">
               <div class="label">
                 生日：
               </div>
               <div class="value">
                 2021-1-1
               </div>
             </div>
             <div class="text-wrapper">
               <div class="label">
                 部门：
               </div>
               <div class="value">
                 研发部
               </div>
             </div>
             <div style="padding-bottom: 48px">
               <el-tag
                 effect="dark"
                 size="mini"
               >技术控</el-tag>
               <el-tag
                 effect="dark"
                 size="mini"
               >爱学习</el-tag>
               <el-tag
                 effect="dark"
                 size="mini"
               >大嘴巴</el-tag>
               <el-tag
                 effect="dark"
                 size="mini"
               >宅男</el-tag>
               <el-tag
                 type="info"
                 effect="dark"
                 size="mini"
               >嘚嘚没完</el-tag>
               <el-tag
                 type="info"
                 effect="dark"
                 size="mini"
               >UP主</el-tag>
               <el-tag
                 type="info"
                 effect="dark"
                 size="mini"
               >手机控</el-tag>
             </div>
           </div>
         </el-card>
       </el-col>
       <el-col :xs="24" :md="16">
         <el-card
           class="box-card wating-box"
           :body-style="{ padding: '10px' }"
         >
           <div
             slot="header"
             class="flex justify-between align-center"
           >
             <span class="text-sm">账号信息</span>
           </div>
           <div>
             <BaseForm
               ref="baseForm"
               :form-items="formItems"
               :config="formConfigF()"
             >
               <div slot="extra">
                 <el-form-item
                   label="修改密码："
                 >
                   <el-button @click="modifyPass">修改</el-button>
                 </el-form-item>
               </div>
             </BaseForm>
             <div class="flex justify-center">
               <el-button type="success" @click="submit">提交</el-button>
             </div>
           </div>
         </el-card>
       </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseForm from "@/components/common/BaseForm.vue";
import {formConfigF, selectOptions} from "@/constants";
export default {
  name: 'Personal',
  components: {BaseForm},
  data() {
    let obj = {s1: "admin", s2: "111", s3: 1, s4: "wsx"}
    return {
      obj,
      touched: false,
      uploaded: false,
      formItems: [
        {
          label: "账号：",
          type: "input",
          name: "s1",
          value: "",
          maxLength: 50,
          inputType: "text",
          disabled: true,
        },
        {
          label: "组别：",
          type: "input",
          name: "s2",
          value: "",
          maxLength: 50,
          inputType: "text",
          disabled: true,
        },
        {
          label: "语言：",
          type: "radio-group",
          name: "s3",
          associatedOption: "address",
          value: 0,
          radioOptions: [
            {
              label: "中文",
              value: 0,
            },
            {
              label: "英文",
              value: 1,
            },
          ],
        },
        {
          label: "名称：",
          type: "input",
          name: "s4",
          value: "",
          maxLength: 50,
          inputType: "text",
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      avatar: 'user/getAvatar',
      nickName: 'user/getNickName'
    })
  },
  methods: {
    formConfigF,
    formConfig() {
      return formConfig
    },
    uploadAvatar() {
      this.uploaded = true
      setTimeout(() => {
        this.touched = false
        this.uploaded = false
      }, 1000)
    },
    avatarTouchStart() {
      this.touched = true
    },
    modifyPass(){

    },
    submit(){

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.formItems.forEach(it => {
        it.value = this.obj[it.name]
      })
    });
  }
}
</script>
<style lang="scss" scoped>
.el-tag--dark + .el-tag--dark {
  margin-left: 10px;
  margin-top: 10px;
}
.box-wrapper {
  .personal-box {
    width: 100%;
    .info-wrapper {
      text-align: center;
      .avatar-wrapper {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        margin-top: 20px;
        position: relative;
        .avatar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform-origin: bottom;
          transform: rotate(0deg);
          z-index: 1;
          transition: all 0.5s ease-in-out;
          & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgb(245, 241, 7);
          }
        }
        .avatar-touch {
          transform: rotate(180deg);
        }
        .avatar-end {
          transform: rotate(0deg);
        }
        .camera-layer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
        }
      }
      .des-wrapper {
        width: 70%;
        margin: 0 auto;
        font-size: 14px;
        padding: 15px;
      }
      .text-wrapper {
        font-size: 0.8rem;
        margin-top: 10px;
        width: 50%;
        margin: 0 auto;
        .label {
          display: inline-block;
          width: 40%;
          text-align: right;
        }
        .value {
          display: inline-block;
          width: 60%;
          text-align: left;
        }
      }
      .text-wrapper + .text-wrapper {
        margin-top: 15px;
      }
    }
  }
  .message-wrapper {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    .notify {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .message-title {
      font-size: 1rem;
    }
    .content {
      font-size: 0.8rem;
      margin-top: 10px;
      line-height: 1rem;
    }
  }
  .message-wrapper + .message-wrapper {
    margin-top: 10px;
  }
  .wating-box {
    width: 100%;
    .wating-item {
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>
