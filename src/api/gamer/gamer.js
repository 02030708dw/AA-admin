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
        method: "post",
        data,
    })
}
// 删除
export function gamerDel({ id }) {
    return request({
        url: `/game/gamer/del/${id}`,
        method: "get",

    })
}
// 编辑
export function gamerEdit(data) {
    return request({
        url: "/game/gamer/edit",
        method: "post",
        data,
    })
}
// 状态修改
export function gamerupdateStatus(data) {
    return request({
        url: "/game/gamer/updateStatus",
        method: "post",
        data,
    })
}

