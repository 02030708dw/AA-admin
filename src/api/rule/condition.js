// 第三方充值配置管利
import request from "@/utils/request";

// 分页数据
export function conditionPage({ pageNo, pageSize, name, type }) {
  return request({
    url: "/sys/rulecondition/page",
    method: "get",
    params: { pageNo, pageSize, name, type },
  });
}

// 新增
export function conditionAdd(data) {
  return request({
    url: "/sys/rulecondition/add",
    method: "post",
    data,
  });
}


//删除
export function conditionDel(id) {
    return request({
      url: `/sys/rulecondition/del/${id}`,
      method: "get",
    });
}

//修改
export function conditionEdit(data) {
    return request({
      url: "/sys/rulecondition/edit",
      method: "post",
      data,
    });
}
