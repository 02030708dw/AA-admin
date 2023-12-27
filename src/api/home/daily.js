// 平台日报表
import request from '@/utils/request'

export function getdaily(data) {
  return request({
    url: '/report/platformReportDay/reportDay',
    method: 'post',
    data
  })
}
