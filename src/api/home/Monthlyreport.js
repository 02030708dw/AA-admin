// 平台日报表
import request from '@/utils/request'

export function getMonthlyreport(data) {
  return request({
    url: '/report/platformReportMonth/reportMonth',
    method: 'post',
    data
  })
}
