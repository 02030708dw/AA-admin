<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('My') }}</span>
    </div>
    <el-row>
      <el-col
        :span="6"
        style="display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;"
      >
        <!-- 用户头像 -->
        <div class="avatar ">
          <el-avatar :size="80" :src="circleUrl" />
        </div>
        <!-- 用户名 -->
        <div class="name">{{ UserInfo.userName }}</div>
        <!-- 修改密码按钮 -->
        <el-button plain @click="HandelShow">{{ $t('Changepassword') }}</el-button>
      </el-col>
      <el-col :span="12">
        <!-- 用户信息 -->
        <!-- 用户名 -->
        <el-form
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item :label="$t('username')">
            <el-input v-model="UserInfo.userName" :disabled="editStatus" :placeholder="$t('username')" />
          </el-form-item>
          <el-form-item :label="$t('customertype')">
            <el-input v-model="UserInfo.isAdmin" style="margin-top: 10px;" :disabled="true" :placeholder="$t('customertype')" />
          </el-form-item>
          <el-form-item :label="$t('role.permission')">
            <el-input v-model="UserInfo.authCods" style="margin-top: 10px;" :disabled="true" :placeholder="$t('role.permission')" />
          </el-form-item>
          <el-form-item :label="$t('RoleCode')">
            <el-input v-model="UserInfo.roleIdS" style="margin-top: 10px;" :disabled="editStatus" :placeholder="$t('RoleCode')" />
          </el-form-item>
          <el-form-item v-if="!editStatus" :label="$t('phone')">
            <el-input v-model="UserInfo.telPhone" style="margin-top: 10px;" :placeholder="$t('phone')" />
          </el-form-item>
          <el-form-item v-if="!editStatus" :label="$t('state')">
            <el-switch
              v-model="UserInfo.status"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-row
          style="margin-top: 10px;display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;width:100%;"
        >
          <el-button :type="editStatus ? 'primary' : 'info'" style="width: 150px;" @click="editStatus = !editStatus">{{ editStatus ? $t('edit') : $t('cancellation') }}</el-button>
          <el-button type="success" style="width: 150px;" @click="getedit">{{ $t('save') }}</el-button>
        </el-row>
      </el-col>
    </el-row>
    <ModifyPwd ref="ModifyPwd"></ModifyPwd>
  </el-card>
</template>
<script>
import { UserEdit } from '../../api/account/user'
import ModifyPwd from './ModifyPwd.vue'
export default {
  components: { ModifyPwd },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      editStatus: true,
      // 用户信息
      UserInfo: {
        userName: '', // 用户名
        roleIdS: '', // 角色编码列表
        status: 0, // 用户状态
        telPhone: '', // 电话号码
        authCods: '', // 权限编码
        isAdmin: '', // 用户类型
        userId: '' // 用户id
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    HandelShow() {
      this.$refs.ModifyPwd.HandelShow()
    },
    // 获取用户信息
    getUserInfo() {
      this.$store.dispatch('user/getInfo').then(res => {
        this.UserInfo.isAdmin = res.resultSet.isAdmin === 1 ? '超级管理员' : '普通管理员'
        this.UserInfo.userName = res.resultSet.userName
        this.UserInfo.userId = res.resultSet.userId
        this.UserInfo.roleCodes = res.resultSet.roleCodes
        this.UserInfo.authCods = res.resultSet.authCods
      })
    },
    // 编辑
    getedit() {
      UserEdit({ id: this.UserInfo.userId, status: this.UserInfo.status, telPhone: this.UserInfo.telPhone, userName: this.UserInfo.userName, roleIdS: this.UserInfo.roleIdS }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar{
    width: 80px;
    height: 80px;
}
.name{
    margin-top: 8px;
}
</style>
