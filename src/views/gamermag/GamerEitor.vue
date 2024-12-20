<template>
  <el-dialog :title="$t('EditGameMerchant')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('GameMerchantName')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('code')" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <el-form-item :label="$t('SelectCurrency')" prop="currency">
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
      <el-form-item :label="$t('Indonesiangamedevelopersridethousands')">
        <el-radio-group v-model="ruleForm.idr">
          <el-radio :label="0" size="large">{{$t('correct')}}</el-radio>
          <el-radio :label="1" size="large">{{$t('deny')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('VietnameseDongGameMerchantRidingThousand')">
        <el-radio-group v-model="ruleForm.vnd">
          <el-radio :label="0" size="large">{{$t('correct')}}</el-radio>
          <el-radio :label="1" size="large">{{$t('deny')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('Gamedevelopersdrawapercentage')" prop="rate">
        <el-table :cell-class-name="tableCellClassName" @cell-click="cellClick" :data="ruleForm.rate" height="200"
          border style="width: 100%">
          <el-table-column prop="type" :label="$t('GameType')" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type"
                v-if="isdblclick && scope.row.index === rowIndex && scope.column.index === columnIndex"
                :placeholder="$t('Pleaseselect')">
                <el-option v-for="item in gamerRatetype" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="inputnum" @dblclick="isdblclick = true" v-else>{{ scope.row.type
                }} </div>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="$t('Drawproportion')" width="180">
            <template slot-scope="scope">
              <div @click.stop v-if="isdblclick && scope.row.index === rowIndex && scope.column.index === columnIndex">
                <el-input min="0" max="1" step="0.01" v-model="scope.row.value" type="number" size="mini" />
              </div>
              <div class="inputnum" @dblclick="isdblclick = true" v-else>{{ scope.row.value
                }} </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operate')" align="right">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" type="success" @click="handAdd(scope.$index, scope.row)">{{$t('increase')}}</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, ruleForm.rate)">{{$t('delete')}}</el-button>
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
export default {
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
        name: '',
        status: 0,
        typeList: [],
        incomeUrl: '',
        cashUrl: '',
        betUrl: '',
        rate: '',
        currency: [],
        sort: '',
        vnd: 1,
        idr: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入游戏商名称', trigger: 'blur' }
        ],
        incomeUrl: [
          { required: true, message: '请输入充值接口地址', trigger: 'blur' }
        ],
        cashUrl: [
          { required: true, message: '请输入积分接口地址', trigger: 'blur' }
        ],
        betUrl: [
          {
            required: true,
            message: '请输入投注信息接口地址',
            trigger: 'blur'
          }
        ],
        rate: [{
          required: true,
          message: '请输入游戏商抽成比例',
          trigger: 'blur'
        }],
        sort: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }]
      },
      rowIndex: -1,
      columnIndex: -1,
      isdblclick: false,
      gamerRatetype: [
        { label: 'all', value: 'all' },
        { label: '真人', value: '真人' },
        { label: '斗鸡', value: '斗鸡' },
      ],
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          name: '',
          status: 0,
          typeList: [],
          incomeUrl: '',
          cashUrl: '',
          betUrl: '',
          rate: '',
          currency: [],
          sort: '',
          vnd: 1,
          idr: 1
        }
      } else {
        this.ruleForm = { ...data }
        //回显
        this.ruleForm.currency = data.currency.split(',')
        try {
          this.ruleForm.rate = this.ruleForm.rate ? JSON.parse(this.ruleForm.rate) : []
          if (!Array.isArray(this.ruleForm.rate)) this.ruleForm.rate = []
        } catch (error) {
          this.ruleForm.rate = []
        }
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.currency = this.ruleForm.currency.join(',')
          this.$emit('confirm', this.ruleForm)
          // 关闭弹窗
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
          return false
        }
      })
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
    //
  }
}
</script>
<style></style>
