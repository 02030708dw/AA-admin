import request from "@/utils/request";

//代理奖金组奖金设定分页查询
export function ServicePage(data) {
  return request({
    url: `/agentGameInfo/page`,
    method: "post",
    data,
  });
}

//代理奖金组奖金设定编辑
export function ServiceEdit(data) {
  return request({
    url: `/agentGameInfo/edit`,
    method: "post",
    data,
  });
}
