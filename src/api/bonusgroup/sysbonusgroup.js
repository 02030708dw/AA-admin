import request from '@/utils/request'

//新增奖金组
export function bonusGroupAdd(data) {
    return request({
        url: `/bonusGroup/add`,
        method: 'post',
        data
    })
}

//奖金组绑定游戏
export function bonusGroupBind(data) {
    return request({
        url: `/bonusGroup/bind`,
        method: 'post',
        data
    })
}


// 删除奖金组
export function bonusGroupDel(id) {
    return request({
        url: `/bonusGroup/del/${id}`,
        method: 'post',
    })
}

//系统奖金组详情
export function bonusGroupInfo(data) {
    return request({
        url: `/bonusGroup/info`,
        method: 'post',
        data
    })
}

//系统奖金组分页查询
export function bonusGroupPage(data) {
    return request({
        url: `/bonusGroup/page`,
        method: 'post',
        data
    })
}

//编辑奖金组
export function bonusGroupEdit(data) {
    return request({
        url: `/bonusGroup/edit`,
        method: 'post',
        data
    })
}