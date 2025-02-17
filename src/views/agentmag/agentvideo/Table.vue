<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="videoId" label="视频id" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="playCount" label="播放次数" />
      <el-table-column prop="" :label="$t('customertype')" width="100">
        <template slot-scope="scope">
          {{ scope.row.isAgent == 0 ? '普通用户' : '代理' }}
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间">
        <template slot-scope="scope">
          {{ $YMDHMS(scope.row.publishTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('icon')" width="120">
        <template slot-scope="scope">
          <div class="image_box">
            <img :src="toUrl(scope.row.image)" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
            :active-text="$t('Enable')" :inactive-text="$t('Deactivate')" @change="getUdateStatus($event, scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">{{
            $t("edit") }}</el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">{{ $t("delete")
          }}</el-button>
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
    getUdateStatus(e, item) {
      item.status = e
      this.$emit('UdateStatus', item)
    },
    toUrl(url) {
      //保留语言判断
      if (url) {
        return "https://gwstatic.mvkbnb.com/" + url
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
