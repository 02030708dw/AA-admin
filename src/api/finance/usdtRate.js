import request from '@/utils/request'

export const listUsdtRates = () => request({ url: '/finance/usdtRate/list', method: 'get' })
export const saveUsdtRate = data => request({ url: '/finance/usdtRate/save', method: 'post', data })
export const previewUsdtRate = data => request({ url: '/finance/usdtRate/preview', method: 'post', data })
export const usdtRateHistory = currency => request({ url: `/finance/usdtRate/history/${encodeURIComponent(currency)}`, method: 'get' })
