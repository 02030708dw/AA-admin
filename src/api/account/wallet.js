import request from "@/utils/request";

// 分页数据
export function walletPage({ pageNo, pageSize, userName }) {
  return request({
    url: "/gamerUser/page",
    method: "get",
    params: { pageNo, pageSize, userName },
  });
}


//手动创建游戏商账号
export function createGameUser(data) {
  return request({
    url: "/gamerUser/create",
    method: "post",
    data,
  });
}