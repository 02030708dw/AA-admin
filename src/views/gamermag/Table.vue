<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
     <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column
        prop="name"
        :label="$t('GameMerchantName')"
        width=""
      />
      <!-- <el-table-column
        prop="betUrl"
        :label="$t('Bettinginformationinterfaceaddress')"
        width=""
      />
      <el-table-column
        prop="cashUrl"
        :label="$t('Integralinterfaceaddress')"
        width=""
      />
      <el-table-column
        prop="incomeUrl"
        :label="$t('Rechargeinterfaceaddress')"
        width=""
      /> -->
      <el-table-column
        prop="clientSecret"
        :label="$t('clientSecret')"
        width=""
      />
      <el-table-column
        prop="apiBaseUrl"
        :label="$t('GameproviderAPIbasicaddress')"
        width=""
      />
      <el-table-column
        prop="playBaseUrl"
        :label="$t('GameMerchantGameConnectionBasicAddress')"
        width=""
      />
      <el-table-column
        prop="rate"
        :label="$t('Gamemerchantsdrawapercentage')"
        width=""
      />
      <el-table-column prop="type" :label="$t('typesof')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.typeList | GamerType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-select
              v-model="scope.row.status"
              :placeholder="$t('state')"
              style="width: 150px;margin-left: 10px"
              @change="getupdateStatus($event, scope.row.id)"
            >
              <el-option
                v-for="(item, index) in statusType"
                :key="index"
                :value="item.index"
                :label="item.title"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="" >
        <template slot-scope="scope">
            {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" style="color: #85ce61" @click="geteroleAdd(scope.row.name,scope.row.id)">{{
            $t("increase")
          }}</el-button>
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>
          <el-button
            slot="reference"
            type="text"
            style="color: #4c8e75"
            @click="getbind(scope.row.id,scope.row.typeList)"
          >{{ $t("Bindgametypes") }}</el-button>
          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>为{{ name }}添加游戏商用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="gamerCreateUser">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { gamerCreateUser } from '@/api/gamer/gamer'
export default {
  name: 'Table',
  filters: {
    GamerType(value) {
      const TypeArrList = []
      for (let i = 0; i < value.length; i++) {
        switch (value[i]) {
          case 0:
            TypeArrList.push('未分类')
            break
          case 1:
            TypeArrList.push('电子（捕鱼+slot）')
            break
          case 2:
            TypeArrList.push('棋牌')
            break
          case 3:
            TypeArrList.push('彩票')
            break
          case 4:
            TypeArrList.push('体育')
            break
          case 5:
            TypeArrList.push('真人')
            break
          case 6:
            TypeArrList.push('小游戏')
            break
          case 7:
            TypeArrList.push('热门')
            break
        }
      }
      return TypeArrList.join(',')
    }
  },
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
      statusType: [
        { title: '停用', index: 0 },
        { title: '启用', index: 1 },
        { title: '游戏商维护中', index: 2 }
      ],
      loading: false,
      dialogVisible: false,
      name:'',
      gamerId:'',
    }
  },
  methods: {
    // 删除事件
    getroledel(Id) {
      this.$confirm('确定删除此游戏商?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit('eitor', item)
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, id: Id })
    },
    // 绑定游戏类型
    getbind(id, data) {
      console.log('绑定游戏类型', data)
      this.$emit('bind', { id: id, data: data })
    },
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    //添加游戏商
    geteroleAdd(name,id){
      this.dialogVisible = true
      this.name = name
      this.gamerId = id
    },
    gamerCreateUser(){
      gamerCreateUser({ gamerId: this.gamerId }).then(res => {
          this.$message.success('添加成功')
          this.dialogVisible = false
      })
    }
  }
}
</script>

<style>
</style>
