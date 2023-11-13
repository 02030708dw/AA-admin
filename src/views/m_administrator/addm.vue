<template>
  <div class="main-container flex flex-direction">
    <el-card
      :body-style="{padding: '15px'}"
      shadow="hover"
    >
      <el-link :underline="false">新增管理员</el-link>
    </el-card>
    <el-card
      :body-style="{padding: '10px'}"
      shadow="nerve"
      class="margin-top-xs flex-sub"
    >
      <div class="form-wrapper padding-top">
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
          :config="formConfig"
        />
      </div>
      <div class="flex justify-center">
        <el-button type="success" @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import BaseForm from '@/components/common/BaseForm'
import {selectOptions} from "@/constants";
export default {
  name: 'addm',
  components: { BaseForm },
  data() {
    return {
      formConfig: {
        labelWidth: 120,
        size: 'default'
      },
      formItems: [
        {
          label: '管理员账号：',
          type: 'input',
          name: 's1',
          value: '',
          maxLength: 20,
          inputType: 'text',
          validator: ({value,label}) => {
            if (!value) {
              this.$errorMsg('请填写'+label)
              return false
            }
            return true
          },
          onChange:(value)=>{
            this.formItems.forEach(it=>{
              if (it.name==='s2') it.value=value.length?value+'123456':value
            })
          }
        },
        {
          label: '预设密码：',
          type: 'input',
          name: 's2',
          value: '',
          maxLength: 50,
          inputType: 'text',
          disabled:true
        },
        {
          label: '管理员名称：',
          type: 'input',
          name: 's3',
          value: '',
          maxLength: 50,
          inputType: 'text',
          validator: ({value,label}) => {
            if (!value) {
              this.$errorMsg('请填写'+label)
              return false
            }
            return true
          }
        },
        {
          label: '组别：',
          type: 'select',
          name: 's4',
          value: '',
          selectOptions,
          validator: ({value,label}) => {
            if (!value) {
              this.$errorMsg('请选择'+label)
              return false
            }
            return true
          },
        },
        {
          label: '语言：',
          type: 'select',
          name: 's5',
          value: '',
          selectOptions,
          validator: ({value,label}) => {
            if (!value) {
              this.$errorMsg('请选择'+label)
              return false
            }
            return true
          }
        },
        {
          label: '状态：',
          type: 'select',
          name: 's6',
          value: '',
          selectOptions,
          validator: ({value,label}) => {
            if (!value) {
              this.$errorMsg('请选择'+label)
              return false
            }
            return true
          }
        },
      ],
    }
  },
  methods: {
    submit(callback) {
      if (this.$refs.baseForm.checkParams()) {
        console.log(this.$refs.baseForm.generatorParams())
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$successMsg('保存成功')
            resolve()
          }, 1000)
        })
      }
      else {
        callback && callback instanceof Function && callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .form-wrapper {
    width: 100%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .form-wrapper {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
