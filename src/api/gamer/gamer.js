import request from '@/utils/request'
// 游戏商信息

// 分页数据
export function gamerPage({ pageNo, pageSize }) {
    return request({
        url: '/game/gamer/page',
        method: 'get',
        params: { pageNo, pageSize },

    })
}
// 添加
export function gamerAdd(data) {
    return request({
        url: "/game/gamer/add",
        method: "get",
        data,
    })
}