// 币种管理
import request from '@/utils/request'

// 分页数据
export function CurrencytPage({ pageNo, pageSize, currency, status }) {
  return request({
    url: '/system/sysCurrency/page',
    method: 'get',
    params: { pageNo, pageSize, currency, status }
  })
}

// 添加币种
export function CurrencyAdd(data) {
  return request({
    url: '/system/sysCurrency/add',
    method: 'post',
    data
  })
}

// 删除币种
export function CurrencyDel(id) {
  return request({
    url: `/system/sysCurrency/del/${id}`,
    method: 'post'
  })
}

// 编辑币种
export function CurrencyEdit(data) {
  return request({
    url: '/system/sysCurrency/edit',
    method: 'post',
    data
  })
}
