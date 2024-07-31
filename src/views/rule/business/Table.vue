<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="creator" label="创建人" />
      <el-table-column prop="ruleName" label="规则名称" />
      <el-table-column prop="msg" label="提示消息" />
      <el-table-column prop="requirement" label="条件" />
      <el-table-column :label="$t('typesof')">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? '充值' : '' }}
          {{ scope.row.type == 2 ? '提现' : '' }}
          {{ scope.row.type == 3 ? '进入游戏' : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="url" label="跳转地址" />
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" :label="$t('Updatetime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="#13ce66"
              active-text="启用" inactive-text="停用" @change="getUdateStatus($event, scope.row.id)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">{{ $t("edit") }}</el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 编辑
    getEditor(item) {
      this.$emit('EditorShow', item)
    },
    // 删除
    getEdl(Id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('Edl', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改状态
    getUdateStatus(e, id) {
      this.$emit('UdateStatus', { status: e, id: id })
    },
    toUrl(list) {
      let url = list ? JSON.parse(list) : ''
      //保留语言判断
      if (url) {
        return url[0].pictureUrl
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.image_box {
  margin: auto;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
