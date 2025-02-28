import request from "@/utils/request";

//代理平台游戏信息分页查询
export function gameInfoPage(data) {
  return request({
    url: `/gameInfo/page`,
    method: "post",
    data,
  });
}

//修改代理平台游戏信息
export function agameInfoEdit(data) {
  return request({
    url: `/gameInfo/edit`,
    method: "post",
    data,
  });
}

//游戏信息分组列表
export function gameInfoGroup() {
  return request({
    url: `/gameInfo/group`,
    method: "get",
  });
}

//新增代理平台游戏信息
export function gameInfoDel(id) {
  return request({
    url: `/gameInfo/del/${id}`,
    method: 'post',
  })
}

