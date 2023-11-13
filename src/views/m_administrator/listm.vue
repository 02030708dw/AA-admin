<template>
  <div class="main-container">
    <TableHeader
      :can-collapsed="likeSearchModel.conditionItems && likeSearchModel.conditionItems.length !== 0"
      :search-model="likeSearchModel.conditionItems"
      :default-collapsed-state="true"
      title="管理员列表"
      @doSearch="doSearch"
      @resetSearch="resetSearch"
    />
    <TableBody ref="tableBody">
      <template #tableHeader>
       <div class="flex justify-between align-center">
         <div style="margin-bottom: 8px">
           <el-button type="success" size="mini" icon="PlusIcon" @click="$router.replace('/m_administrator/addm')"
           >添加管理员
           </el-button>
           <el-button type="danger" size="mini" icon="DeleteIcon" @click="onDelete" :disabled="delStatus"
           >删除
           </el-button>
         </div>
         <div class="flex justify-between padding">
           <el-link :underline="false">表格设置</el-link>
           <div class="margin-left">
            <span class="margin-right">
              <el-checkbox v-model="tableConfig.border">表格边框</el-checkbox>
            </span>
             <span class="margin-right">
              <el-checkbox v-model="tableConfig.stripe">斑马纹</el-checkbox>
            </span>
             <el-tooltip
               class="item"
               effect="dark"
               content="刷新页面"
               placement="top"
             >
             </el-tooltip>
             <SortableTable
               class="margin-left"
               :table-props="tableProps"
               @update="onUpdateTable"
             />
           </div>
         </div>
       </div>
      </template>
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="filterList || dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            align="center"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="item of tableProps"
            :key="item.props"
            align="center"
            :prop="item.prop"
            :label="item.title"
          >
            <template slot-scope="scope">
              <div
                v-if="item.prop === 'gender'"
                class="gender-container flex justify-center align-center"
              >
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
              </div>
              <div
                v-else-if="item.prop === 'vip'"
                class="avatar-container"
              >
                <el-image
                  :src="require('@/assets/img_avatar_default.png')"
                  class="avatar"
                  :class="{'avatar-vip' : scope.row.vip === 1}"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
              <div v-else-if="item.prop==='roleName'">{{ scope.row[item.prop] }}</div>
              <div v-else-if="item.prop==='address'">{{ scope.row[item.prop] }}</div>
              <div v-else-if="item.prop==='lastLoginTime'">{{ scope.row[item.prop] }}</div>
              <div v-else>{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
<!--          <el-table-column
            align="center"
            label="名称"
            prop="nickName"
          />
          <el-table-column
            align="center"
            label="头像"
          >
            <template slot-scope="scope">
              <div class="avatar-container">
                <el-image
                  :src="require('@/assets/img_avatar_default.png')"
                  class="avatar"
                  :class="{'avatar-vip' : scope.row.vip === 1}"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="性别"
            prop="gender"
          >
            <template slot-scope="scope">
              <div class="gender-container flex justify-center align-center">
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="地址"
            prop="address"
          />
          <el-table-column
            align="center"
            label="上次登录时间"
            prop="lastLoginTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="上次登录IP"
            prop="lastLoginIp"
            width="130px"
          />-->
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="340"
          >
            <template #default="scope">
              <el-button
                type="warning"
                size="small"
                plain
                @click="onUpdateItem(scope.row)"
              >修改</el-button>
              <el-button
                type="danger"
                size="small"
                plain
                @click="onLog(scope.row)"
              >日志</el-button>
              <el-button
                type="info"
                size="small"
                plain
                @click="onResetPass(scope.row)"
              >重置密码</el-button>
              <el-button
                :type="scope.row.status === 1 ? 'warning' : 'success'"
                size="small"
                plain
                @click="onEnableItem(scope.row)"
              >{{ scope.row.status === 1 ? "禁用" : "启用" }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <TableFooter
      :current-page="pageModel.currentPage"
      :page-size="pageModel.pageSize"
      :total-size="pageModel.totalSize"
      @pageSizeChanged="pageSizeChanged"
      @currentChanged="currentChanged"
      @onRefresh="doRefresh"
    />
    <popup-form ref="popupFormRef" tit="更新管理员" @onConfirm="onUpdateAdmin" :form-items="updateForms"/>
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import {
  LikeSearchMixin,
  GetDataMixin,
  RefreshActionMixin
} from '@/mixins/ActionMixin'
import {selectOptions} from "@/constants";
import MulSelector from "@/mixins/MulSelector";
import PopupForm from "@/components/custome/popupForm.vue";
export default {
  name: 'listm',
  components: {PopupForm},
  mixins: [
    TableMixin,
    LikeSearchMixin,
    GetDataMixin,
    PageModelMixin,
    RefreshActionMixin,
    MulSelector
  ],
  data() {
    return {
      filterList: null,
      popupFormRef:null,
      tableProps: [
        {
          title: '姓名',
          prop: 'nickName',
          checked: true
        },
        {
          title: '头像',
          prop: 'vip',
          checked: true
        },
        {
          title: '性别',
          prop: 'gender',
          checked: true
        },
        {
          title: '组别',
          prop: 'roleName',
          checked: true
        },
        {
          title: '地址',
          prop: 'address',
          checked: true
        },
        {
          title: '上次登录时间',
          prop: 'lastLoginTime',
          checked: true
        },
        {
          title: '上次登录ip',
          prop: 'lastLoginIp',
          checked: true
        }
      ],
      updateForms:[
        {
          label: "账号：",
          type: "input",
          name: "creator",
          value: "",
          maxLength: 50,
          inputType: "text",
          disabled:true
        },
        {
          label: "管理员名称：",
          type: "input",
          name: "nickName",
          value: "",
          maxLength: 50,
          inputType: "text",
        },
        {
          label: "语言：",
          type: "radio-group",
          name: "s4",
          associatedOption: "address",
          value: 0,
          radioOptions: [
            {
              label: "中文",
              value: 0,
            },
            {
              label: "英文",
              value: 1,
            },
          ],
        },
        {
          label: "组别：",
          type: "select",
          name: "roleName",
          value: "",
          selectOptions,
        },
      ],
    }
  },
  created() {
    this.initLikeSearch({
      url: this.$urlPath.getTableList,
      conditionItems: [
        {
          name: "s1",
          value: "",
          type: "select",
          selectOptions,
          span: 8,
        },
        {
          name: "s2",
          label: "账号",
          value: "",
          type: "input",
          span: 8,
        },
        {
          name: "s3",
          label: "创建人",
          value: "",
          type: "input",
          span: 8,
        },
      ],
      extraParams: () => this.withPageInfoData(),
      onResult: (res) => {
        this.handleSuccess(res)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getTableList,
      params: () => this.withPageInfoData(),
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then((_) => {
      this.getData()
    })
  },
  methods: {
    onUpdateTable(tableProps) {
      this.tableProps = tableProps.filter(it => it.checked)
    },
    // 查询方法及数据返回
    doSearch() {
      const { name, sex } = this.generatorSearchParams()
      console.log(this.generatorSearchParams())
    },
    // 查询重置
    resetSearch() {
      this.likeSearchModel.conditionItems && this.likeSearchModel.conditionItems.forEach(it => { it.value = '' })
      this.filterList = null
    },
    onDelete(){
      // this.deleteParams() 选中的id
      console.log(this.deleteParams())
    },
    onUpdateItem(r){
      // 更新表单事件回调及数据传递
      this.$refs.popupFormRef.open(()=>this.$nextTick(()=>this.updateForms.forEach(it=>it.value=r[it.name])))
    },
    onUpdateAdmin(s){
      // 更新模态框确认事件回调数据
      console.log(s)
      this.$refs.popupFormRef.close()
    },
    // 路由跳转至管理员日志
    onLog(){

    },
    // 重置密码
    onResetPass(){
      console.log('密码已重置')
    },
    // 启用禁用用户
    onEnableItem(item){
      this.$confirm("确定要" + (item.status === 1 ? "禁用" : "启用") + "此用户吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .avatar-vip {
    border: 2px solid #cece1e;
  }
  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}
.gender-container {
  .gender-icon {
    width: 20px;
  }
}
</style>
