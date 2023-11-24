<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="name" label="游戏商名称" width="200" />
      <el-table-column prop="betUrl" label="投注信息接口地址" width="250" />
      <el-table-column prop="cashUrl" label="积分接口地址" width="250" />
      <el-table-column prop="incomeUrl" label="充值接口地址" width="250" />
      <el-table-column prop="type" label="类型" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态" width="150">
        <template slot-scope="scope">
          <div>
            <el-switch
              @change="getupdateStatus($event, scope.row.id)"
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)"
            >编辑</el-button
          >

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
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
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style>
</style>