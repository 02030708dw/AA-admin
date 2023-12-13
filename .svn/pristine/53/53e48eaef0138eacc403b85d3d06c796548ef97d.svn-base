<template>
  <el-card>
    <el-table
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="userName" :label="$t('username')" width="280" />
      <el-table-column prop="password" :label="$t('password')" width="280" />
      <el-table-column prop="realName" :label="$t('name')" width="280" />
      <el-table-column prop="telPhone" :label="$t('phone')" width="280" />

      <el-table-column
        prop="assiRate"
        :label="$t('Matchablerebate')"
        width="280"
      />
      <el-table-column prop="parentId" :label="$t('parentId')" width="280" />
      <el-table-column
        prop="parentRate"
        :label="$t('Superiorrebate')"
        width="280"
      />
      <el-table-column
        prop="memberPlugUrl"
        :label="$t('Memberregistrationpromotionaddress')"
        width="280"
      />

      <el-table-column prop="" :label="$t('state')" width="150">
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

      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("Transfersubordinateagents")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="$t('Selectthawingtype')"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-row>
        <label>冻结/解冻类型:</label>
        <el-select
          style="margin-left: 10px"
          v-model="item.type"
          placeholder="请选择类型"
        >
          <el-option value="1" label="只冻结/解冻代理"></el-option>
          <el-option
            value="2"
            label="冻结/解冻代理以及代理下的所有会员"
          ></el-option>
        </el-select>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancellation()">{{ $t("cancellation") }}</el-button>
        <el-button type="primary" @click="getconfirm()">{{
          $t("determine")
        }}</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      item: {
        status: null,
        id: "",
        type: null,
      },
    };
  },
  methods: {
    // 状态修改
    getupdateStatus(e, Id) {
      this.dialogVisible = true;
      this.item.status = e;
      this.item.id = Id;
    },
    getconfirm() {
      this.$emit("updateStatus", this.item);
      this.item = {
        status: null,
        id: "",
        type: null,
      };
      this.dialogVisible = false;
    },
    // 取消

    cancellation() {
      if (this.item.status == 0) {
        this.item.status = 1;
      } else {
        this.item.status = 0;
      }
      this.$emit("updateStatus", this.item);
      this.item = {
        status: null,
        id: "",
        type: null,
      };
      this.dialogVisible = false;
    },
    geteroleEitor(item) {
      this.$emit("transfer", item);
    },
  },
};
</script>
    
    <style>
</style>