<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="sort" :label="$t('sort')" width="150" />
      <el-table-column prop="name" :label="$t('Channelname')" width="" />
      <el-table-column prop="" :label="$t('Channeltype')" width="">
        <template slot-scope="scope">
          <div>
            {{ scope.row.type | TypeF }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" width="200" :label="$t('icon')">
        <template slot-scope="scope">
          <div class="image_box">
            <img :src="toUrl(scope.row.pictureUrl)" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch v-has="'rechargechannel:status'" v-model="scope.row.status" active-color="#13ce66"
              :active-value="1" :inactive-value="0" :active-text="$t('Enable')" :inactive-text="$t('Deactivate')"
              @change="getupdateStatus($event, scope.row.id)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-has="'rechargechannel:edit'" type="text" @click="geteroleEitor(scope.row)">{{ $t("edit")
          }}</el-button>

          <el-button v-has="'rechargechannel:del'" slot="reference" type="text" style="color: red"
            @click="getroledel(scope.row.id)">{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status;
    },
    // 删除事件
    getroledel(Id) {
      this.$confirm("确定删除此渠道?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("delete", Id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit("eitor", item);
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit("updateStatus", { status: e, id: Id });
    },
    toUrl(v) {
      return "https://static.44dog.cc/" + v;
    },
  },
  filters: {
    TypeF(value) {
      switch (value) {
        case 0:
          return "银行卡";
        case 1:
          return "支付宝";
        case 2:
          return "微信";
        case 3:
          return "虚拟币";
      }
    },
  },
};
</script>

<style scoped>
.image_box {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 0 auto;
}

.image_box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
