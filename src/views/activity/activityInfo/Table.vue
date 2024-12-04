<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" :label="$t('SerialNumber')" width="80" />
      <el-table-column prop="title" :label="$t('title')" />
      <el-table-column prop="content" :label="$t('content')" width="100">
        <template slot-scope="scope">
          <div class="overflow-hidden">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="giftAmount" :label="$t('Giftamount')" width="120" />
      <el-table-column prop="rechargeAmount"  :label="$t('Needtorechargeamount')" width="120" />
      <el-table-column prop="flowRate" :label="$t('Flowrateratio')" width="120" />
      <el-table-column :label="$t('typesof')" width="120">
        <template slot-scope="scope">
          <span>{{ getTypeName(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" width="250" :label="$t('icon')">
        <template slot-scope="scope">
          <div class="image_box">
            <img :src="toUrl(scope.row.pictureUrl)" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" fixed="right" :label="$t('state')" width="140">
        <template slot-scope="scope">
          <div>
            <el-switch v-has="'activity:status'" v-model="scope.row.status" :active-value="1" :inactive-value="0"
              active-color="#13ce66" :active-text="$t('Enable')" :inactive-text="$t('Deactivate')"
              @change="getUdateStatus($event, scope.row.id)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="" :label="$t('operate')" width="120">
        <template slot-scope="scope">
          <el-button v-has="'activity:edit'" type="text" style="color: #e6a23c" @click="getEditor(scope.row)">{{
            $t("edit") }}</el-button>
          <el-button v-has="'activity:del'" type="text" style="color: red" @click="getEdl(scope.row.id)">{{ $t("delete")
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
    getTypeName(type) {
      const types = {
        1: '体育',
        2: '彩票',
        3: '兑换',
        4: '电子',
        5: '真人',
        6: '棋牌',
        10: '其他'
      }
      const typeArray = type.split(',');
      let result = '';
      typeArray.forEach(t => {
        result += types[t] + ',';
      });
      // 去掉最后一个逗号
      return result.slice(0, -1);
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
      this.$confirm('确定删除此活动类型吗?', '提示', {
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
      let url = list ? JSON.parse(list) : []

      //保留语言判断
      return "https://static.44dog.cc/" + url[0].pictureUrl
    },
  }
}
</script>

<style lang="scss" scoped>
.image_box {
  margin: auto;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
