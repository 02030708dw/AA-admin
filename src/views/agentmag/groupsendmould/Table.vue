<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="name" label="模板名称" />
      <el-table-column prop="title" label="内容标题" />
      <el-table-column prop="subtitle" label="内容副标题" />
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          {{ typeMap[scope.row.type] || "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间">
        <template slot-scope="scope">
          {{ parseCronToText(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template #default="scope">
          <el-popover trigger="hover" placement="top" width="500">
            <div v-html="scope.row.content"></div>
            <template #reference>
              <div class="multi-line-ellipsis" v-html="scope.row.content"></div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="picture" label="资源">
        <template slot-scope="scope">
          <div class="image_box">
            <img
              v-if="isImage(scope.row.picture)"
              :src="toUrl(scope.row.picture)"
              alt=""
              style="width: 100px; height: auto"
            />
            <video
              v-else-if="isVideo(scope.row.picture)"
              :src="toUrl(scope.row.picture)"
              controls
              style="width: 160px; height: auto"
            ></video>
            <span v-else>未知类型</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转链接" show-overflow-tooltip />
      <el-table-column prop="" :label="$t('state')" width="140">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="0"
            :active-text="$t('Enable')"
            :inactive-text="$t('Deactivate')"
            @change="getUdateStatus($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e6a23c"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            style="color: red"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
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
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    parseCronToText(cronStr) {
      if (!cronStr) return "无";

      const cronArr = cronStr
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean);

      const result = cronArr.map((cron) => {
        const parts = cron.split(" ").filter(Boolean);
        if (parts.length < 6) return cron; // Quartz 至少6段：秒 分 时 日 月 周

        const second = parts[0];
        const minute = parts[1];
        const hour = parts[2];

        // 每天固定时间
        if (/^\d+$/.test(minute) && /^\d+$/.test(hour)) {
          return `每天 ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        }

        // 每 N 分钟，例如 0 0/3 * * * ?
        if (/^\d+\/\d+$/.test(minute)) {
          const interval = minute.split("/")[1];
          return `每 ${interval} 分钟`;
        }

        // 每 N 小时，例如 0 0 */3 * * ?
        if (/^\d+\/\d+$/.test(hour)) {
          const interval = hour.split("/")[1];
          return `每 ${interval} 小时`;
        }

        return cron; // 兜底返回原始
      });

      return result.join("，");
    },
    toUrl(url) {
      //保留语言判断
      if (url) {
        return "https://gwstatic.mvkbnb.com/" + url;
      }
    },
    isVideo(file) {
      return /\.(mp4|webm|ogg)$/i.test(file);
    },
    isImage(file) {
      return /\.(png|jpe?g|gif|webp|bmp)$/i.test(file);
    },
    HandelLoading(status) {
      this.loading = status;
    },
    handleEdit(item) {
      this.$emit("EditorShow", item);
    },
    handleDelete(item) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("Edl", item.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getUdateStatus(e, item) {
      item.status = e;
      this.$emit("UdateStatus", item);
    },
  },
  computed: {
    typeMap() {
      return {
        1: "红包",
        2: "刮刮乐",
        3: "免费彩票",
        4: "转盘",
        5: "宾果",
        6: "代金券",
        7: "预告",
      };
    },
  },
};
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

.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
