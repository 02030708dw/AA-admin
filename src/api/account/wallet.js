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
  const { id: errorId, gamerCode, userName } = data;
  const payload = {
    errorId, // 确保这里传递的是有效且需要的数据
    gamerCode,
    userName,
  };
  return request({
    url: "/gamerUser/create",
    method: "post",
    data: payload,
  });
}
