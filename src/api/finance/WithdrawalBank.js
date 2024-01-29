// 提现银行管理
import request from '@/utils/request'

// 请求分页列表
export function PageData ({pageNo,pageSize,bankCode,bankName,status}) {
    return request({
        url:'/finance/cashBank/page',
        method:'get',
        params:{pageNo,pageSize,bankCode,bankName,status}
    })
}

// 新增
export function Add (data) {
    return request({
        url:'/finance/cashBank/add',
        method:'post',
        data
    })
}

// 删除
export function Del ({id}) {
    return request({
        url:`/finance/cashBank/del/${id}`,
        method:'get',
    })
}

// 编辑
export function Edit (data) {
    return request({
        url:'/finance/cashBank/edit',
        method:'post',
        data
    })
}

// 修改状态
export function UpdateStatus (data) {
    return request({
        url:'/finance/cashBank/updateStatus',
        method:'post',
        data
    })
}