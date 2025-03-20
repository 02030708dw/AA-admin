import request from '@/utils/request'
// 分页数据
export function ServicePage(data) {
  return request({
    url: '/agentRebate/record/page',
    method: 'POST',
    data
  })
}
