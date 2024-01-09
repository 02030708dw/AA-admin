<template>
  <div v-show="show" class="conent">
    <div class="container">
      <el-card class="box-card">
        <!-- title -->
        <div slot="header" class="clearfix">
          <span>新增</span>
        </div>
        <!-- 一级菜单输入框 -->
        <el-form ref="form" :model="additem" label-width="80px">
          <el-row>
            <el-col
              :span="6"
            ><el-form-item label="权限名称:">
              <el-input
                v-model="additem.name"
                placeholder="清输入权限名称"
              /> </el-form-item></el-col>
            <el-col
              :span="6"
            ><el-form-item label="状态:">
              <el-switch v-model="additem.statu" active-color="#13ce66" /> </el-form-item></el-col>
          </el-row>
        </el-form>
        <!-- 二级菜单输入框 -->
        <el-table
          stripe
          style="width: 100%"
          height="280"
          :data="additem.children"
        >
          <el-table-column prop="name" label="" width="80">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="getdelitem(scope.row)"
              />
            </template>
          </el-table-column>
          <!-- 二级名称 -->
          <el-table-column prop="name" label="名称" width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入权限名称"
              />
            </template>
          </el-table-column>
          <!-- 二级状态 -->
          <el-table-column prop="" label="状态" width="180">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.statu" active-color="#13ce66" />
            </template>
          </el-table-column>
        </el-table>
        <el-row style="margin-top: 12px">
          <!-- 添加行 -->
          <el-col :span="12">
            <el-button
              type="warning"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="getadditem"
            />
          </el-col>
          <!-- 取消 确定 -->
          <el-col :span="5" :offset="7">
            <el-button
              type="primary"
              size="small"
              @click="getdetermine"
            >确定</el-button>
            <el-button
              type="info"
              size="small"
              @click="getcancel"
            >取消</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddRoute',
  props: {
    // 弹窗状态
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      additem: {
        name: '',
        statu: false,
        children: [{ name: '', statu: false, id: 0 }]
      }
    }
  },
  methods: {
    // 取消事件
    getcancel() {
      this.$emit('cancel')
      this.additem = {
        name: '',
        statu: false,
        children: [{ name: '', statu: false, id: 0 }]
      }
    },
    // 新增一行
    getadditem() {
      const index = this.additem.children.length
      this.additem.children.push({
        id: index,
        name: '',
        statu: false
      })
    },
    // 删除一行
    getdelitem(item) {
      const newArray = this.additem.children.filter((it) => it.id !== item.id)
      this.additem.children = newArray
    },
    // 确定事件
    getdetermine() {
      // 校验数据是否填写完整
      if (this.additem.name === '') {
        this.$message({
          showClose: true,
          message: '请填写权限名称',
          type: 'warning'
        })
        return
      }
      // 检查children是否为空
      if (this.additem.children.length === 0) {
        this.$message({
          showClose: true,
          message: '请填写至少一条二级权限',
          type: 'warning'
        })
        return
      }
      for (const child of this.additem.children) {
        // 检查name是否为空
        if (child.name === '') {
          this.$message({
            showClose: true,
            message: '信息不能为空',
            type: 'warning'
          })
          return
        }
      }
      this.$message({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
      this.$emit('confirm', this.additem)
    }
  }
}
</script>

<style lang="scss">
.conent {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0px;
  top: 0;
  z-index: 888;
}
.container {
  width: 60vw;
  height: 50vh;
  //   background: white;
  //   border: 1px solid #dcdfe6;
  //   border-radius: 10px;
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .box-card {
    width: 100%;
    height: 100%;
  }
}
</style>
