// 第三方充值配置管利
import request from "@/utils/request";

// 分页数据
export function bussinesPage({ pageNo, pageSize, status, type }) {
  return request({
    url: "/sys/bussinesrule/page",
    method: "get",
    params: { pageNo, pageSize, status, type },
  });
}

// 新增
export function bussinesAdd(data) {
  return request({
    url: "/sys/bussinesrule/add",
    method: "post",
    data,
  });
}


//删除
export function bussinesDel(id) {
    return request({
      url: `/sys/bussinesrule/del/${id}`,
      method: "get",
    });
}

//修改
export function bussinesEdit(data) {
    return request({
      url: "/sys/bussinesrule/edit",
      method: "post",
      data,
    });
}

// 停启用
export function bussinesStatus(data) {
    return request({
        url: `/sys/bussinesrule/updateStatus`,
        method: 'post',
        data
    })
}