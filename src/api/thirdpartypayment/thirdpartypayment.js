// 第三方充值配置管利
import request from "@/utils/request";

// 分页数据
export function thirdPage({ pageNo, pageSize, currency, threeName }) {
  return request({
    url: "/threePaySet/page",
    method: "get",
    params: { pageNo, pageSize, currency, threeName },
  });
}

// 新增
export function thirdAdd(data) {
  return request({
    url: "/threePaySet/add",
    method: "post",
    data,
  });
}


//删除
export function thirdDel(id) {
    return request({
      url: `/threePaySet/del/${id}`,
      method: "get",
    });
}

//修改
export function thirdEdit(data) {
    return request({
      url: "/threePaySet/edit",
      method: "post",
      data,
    });
}