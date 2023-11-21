<template>
  <div>
    <el-card>
      <!-- 新增按钮 -->
      <el-row>
        <el-button type="primary" @click="getaddroute">新增</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" row-key="id">
        <!-- 标题 -->
        <el-table-column prop="name" label="名称" width="200" />
        <!-- 状态 -->
        <el-table-column label="状态" width="200">
          <template slot-scope="scope">
            <div>
              <el-switch v-model="scope.row.statu" active-color="#13ce66">
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div
              style="width: 100%; display: flex; justify-content: space-around"
            >
              <!-- 添加 -->
              <el-button
                v-if="scope.row.children"
                type="primary"
                circle
                icon="el-icon-plus"
                style="font-size: 12px"
                size="mini"
                @click="getadditem(scope.row)"
              ></el-button>
              <!-- 编辑 -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                circle
                style="font-size: 12px; margin-left: 0px"
                size="mini"
                @click="getedititem()"
              ></el-button>
              <!-- 删除 -->
              <el-popconfirm title="确定要删除此菜单吗？">
                <el-button
                  slot="reference"
                  type="danger"
                  style="font-size: 12px"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
    </el-card>
    <!-- 新增弹窗 -->
    <AddRoute :show="show" @cancel="getcancel"></AddRoute>
  </div>
</template>

<script>
import { getPower } from "@/api/power";
//新增路由弹窗
import AddRoute from "./addroute.vue";
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      //新增弹窗状态
      show: false,
    };
  },
  created() {
    this.getpowerData();
  },
  methods: {
    //请求数据
    getpowerData() {
      getPower()
        .then((res) => {
          this.tableData = [...this.tableData, ...res.data];
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加二级菜单
    getadditem(item) {
      this.tableData.forEach((it, index) => {
        if (it.id === item.id) {
          console.log(index);
        }
      });
    },
    // 删除菜单
    getdelitem(item) {},
    // 编辑菜单
    getedititem(item) {},
    // 添加一级菜单
    getaddroute() {
      this.show = true;
    },
    // 取消添加事件
    getcancel() {
      this.show = false;
    },
  },
  components: {
    AddRoute,
  },
};
</script>

<style lang="scss">
</style>