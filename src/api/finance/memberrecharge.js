// 会员充值管理
import request from "@/utils/request";
import axios from "axios";
// 分页列表
export function MemberrechargelPage(params) {
  console.log(params);
  return request({
    url: "/finance/incomeRecord/page",
    method: "get",
    params,
  });
}

// 会员充值审核
export function MemberrechargelToexamine(data) {
  return request({
    url: "/finance/incomeRecord/audit",
    method: "post",
    data,
  });
}

// 导出excel
export function incomeRecordOutput(params) {
  return axios({
    url: process.env.VUE_APP_BASE_API + "/finance/incomeRecord/output",
    method: "GET",
    params,
    responseType: "blob",
  });
}
