<template>
  <el-dialog :title="$t('AddGameMerchant')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('GameMerchantName')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <el-form-item label="选择币种" prop="currency">
        <el-checkbox-group v-model="ruleForm.currency">
          <el-checkbox v-for="v in CurrencytPageData" :label="v.item" :key="v.index">{{ v.item }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('MemberRebateRatio')" prop="memberRate">
        <el-input v-model="ruleForm.memberRate" />
      </el-form-item>
      <el-form-item :label="$t('sort')" prop="sort">
        <el-input type='number' v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('typesof')" prop="types">
        <el-checkbox-group v-model="ruleForm.types">
          <el-checkbox v-for="(item, index) in gamertype" :key="index" :label="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
        <!-- <el-select
          v-model="ruleForm.type"
          :placeholder="$t('Pleaseselectagametype')"
        >
          <el-option
            v-for="(item, index) in gamertype"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="印尼游戏商乘千">
        <el-radio-group v-model="ruleForm.idr">
          <el-radio :label="0" size="large">是</el-radio>
          <el-radio :label="1" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="越南盾游戏商乘千">
        <el-radio-group v-model="ruleForm.vnd">
          <el-radio :label="0" size="large">是</el-radio>
          <el-radio :label="1" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="游戏商抽成比例" prop="rate">
        <el-table :cell-class-name="tableCellClassName" @cell-click="cellClick" :data="ruleForm.rate" height="200"
          border style="width: 100%">
          <el-table-column prop="type" label="游戏类型" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type"
                v-if="isdblclick && scope.row.index === rowIndex && scope.column.index === columnIndex"
                placeholder="请选择">
                <el-option v-for="item in gamerRatetype" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="inputnum" @dblclick="isdblclick = true" v-else>{{ scope.row.type
                }} </div>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="抽成比例" width="180">
            <template slot-scope="scope">
              <div @click.stop v-if="isdblclick && scope.row.index === rowIndex && scope.column.index === columnIndex">
                <el-input min="0" max="1" step="0.01" v-model="scope.row.value" type="number" size="mini" />
              </div>
              <div class="inputnum" @dblclick="isdblclick = true" v-else>{{ scope.row.value
                }} </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" type="success" @click="handAdd(scope.$index, scope.row)">添加</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, ruleForm.rate)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- <el-form-item label="游戏商图片" prop="pictureInfos">
          <UploadImage v-if="dialogVisible" fn="gamer" @Upload="getImageURL" />
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">
        {{ $t("determine") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import UploadImage from '@/components/Upload/imageGamer.vue'
export default {
  components: {
    UploadImage
  },
  props: {
    CurrencytPageData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 表单数据
      ruleForm: {
        name: "",
        status: 0,
        types: [],
        memberRate: "",
        currency: [],
        code: "",
        rate: [],
        sort: '',
        vnd: 1,
        idr: 1
      },
      // 游戏类型选项
      gamertype: [
        { label: "未分类", value: 0 },
        { label: "电子", value: 1 },
        { label: "棋牌", value: 2 },
        { label: "彩票", value: 3 },
        { label: "体育", value: 4 },
        { label: "真人", value: 5 },
        { label: "小游戏", value: 6 },
        { label: "热门", value: 7 },
        { label: "捕鱼", value: 8 },
      ],
      rules: {
        name: [
          { required: true, message: "请输入游戏商名称", trigger: "blur" },
        ],
        types: [{ required: true, message: "请选择游戏类型", trigger: "blur" }],
        memberRate: [
          { required: true, message: "请输入会员返点比例", trigger: "blur" },
        ],
        currency: [
          { required: true, message: "请选择支持币种", trigger: "blur" },
        ],
        code: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur",
          },
        ],
        rate: [
          {
            required: true,
            message: "请输入游戏商抽成比例",
            trigger: "blur",
          },
        ],
        sort: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }]
      },
      // 游戏商抽成比例
      rowIndex: -1,
      columnIndex: -1,
      isdblclick: false,
      gamerRatetype: [
        { label: 'all', value: 'all' },
        { label: '真人', value: '真人' },
      ],
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: "",
          status: 0,
          types: [],
          memberRate: "",
          currency: [],
          code: "",
          sort: '',
          rate:[],
          vnd: 1,
          idr: 1
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.currency = this.ruleForm.currency.join(',')
          this.$emit("confirm", this.ruleForm);
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
    getImageURL(urlList) {
      this.ruleForm.pictureInfos = urlList
    },
    // 游戏商抽成比例
    tableCellClassName({ row, column, rowIndex, columnIndex }) {//注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex;
      column.index = columnIndex;
    },
    //单元格被点击时会触发该事件
    cellClick(row, column) {
      this.rowIndex = row.index
      this.columnIndex = column.index
      this.isdblclick = false
    },
    inputBlur(scope) {
      this.rowIndex = -1
      this.columnIndex = -1
      this.isdblclick = false
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    handAdd(index, rows) {
      this.ruleForm.rate.push({
        type: 'all',
        value: '0.0'
      })
    }
  },
};
</script>
<style></style>
