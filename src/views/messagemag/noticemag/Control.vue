<template>
  <el-row style="padding-bottom: 10px">
    <el-button type="primary" @click="getAdd()">{{ $t("increase") }}</el-button>
    <!-- <el-input v-model="noteTypeId" style="width: 200px;margin-left:10px;" :placeholder="$t('ChanneltypeID')" /> -->

    <el-select
      v-model="noteTypeId"
      placeholder="选择公告类型"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in NoticetypeData"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>

    <el-select
      v-model="status"
      :placeholder="$t('state')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in statusType"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">刷新</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>刷新</el-button>
  </el-row>
</template>

<script>
import { noticetypePage } from '@/api/message/noticetype'
export default {
  name: 'Control',
  data() {
    return {
      noteTypeId: '', // 公告类型id
      status: null, // 状态
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 }
      ],
      btnIcoType: true,
      NoticetypeData: []
    }
  },
  created() {
    this.GetNoticetypePage()
  },
  methods: {
    // 获取公告类型id
    GetNoticetypePage() {
      this.NoticetypeData = []
      noticetypePage({ pageNo: 1, pageSize: 1000000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.NoticetypeData.push({
            index: res.resultSet.data[i].id,
            title: res.resultSet.data[i].name
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getAdd() {
      this.$emit('NoticeAdd')
    },
    // 条件查询
    getquery() {
      this.$emit('query', { noteTypeId: this.noteTypeId, status: this.status })
    },
    // 重置查询
    getresetting() {
      this.noteTypeId = ''
      this.status = null
      this.$emit('resetting')
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    }
  }
}
</script>

      <style>
</style>
