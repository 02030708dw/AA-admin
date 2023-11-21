import request from '@/utils/request'

export function getPower() {
  return request({
    url: '/getPower',
    method: 'get'
  })
}
