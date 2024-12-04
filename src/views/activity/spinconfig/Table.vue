<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">

      <el-table-column prop="weight" :label="$t('权重')" />
      <el-table-column prop="segmentIndex" :label="$t('转盘格子索引')" />
      <el-table-column prop="amount" :label="$t('奖励金额')" />
      <el-table-column prop="" :label="$t('icon')">
        <template slot-scope="scope" >
          <div class="image_box">
            <img :src="toUrl(scope.row.pictureUrl)" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="$t('奖励类型')">
        <template slot-scope="scope">
          {{ tpye(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" :label="$t('创建时间')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('更新人')" />
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
    tpye(v) {
      switch (v) {
        case 1:
          return '金额'
        case 2:
          return '谢谢惠顾'
        case 3:
          return '再转一次'
      }
    },
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
    toUrl(url) {
      //保留语言判断
      if (url) {
        return "https://static.44dog.cc/" + url
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
