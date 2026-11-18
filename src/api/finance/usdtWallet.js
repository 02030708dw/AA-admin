import request from '@/utils/request'

const segment = value => encodeURIComponent(String(value))
const base = '/finance/usdtWallet'

export const listUsdtMerchants = () => request({
  url: `${base}/merchants`,
  method: 'get'
})

export const listUsdtWallets = (merchantId, network) => request({
  url: `${base}/${segment(merchantId)}/wallets`,
  method: 'get',
  params: network ? { network } : undefined
})

export const getUsdtWallet = (merchantId, walletId) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}`,
  method: 'get'
})

export const createUsdtWallet = (merchantId, data) => request({
  url: `${base}/${segment(merchantId)}/wallets`,
  method: 'post',
  data
})

export const updateUsdtWalletRouting = (merchantId, walletId, data) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/routing`,
  method: 'put',
  data
})

export const refreshUsdtWallet = (merchantId, walletId) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/refresh`,
  method: 'post'
})

export const enableUsdtWallet = (merchantId, walletId) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/enable`,
  method: 'post'
})

export const disableUsdtWallet = (merchantId, walletId) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/disable`,
  method: 'post'
})

export const setUsdtWalletSigner = (merchantId, walletId, encryptedPrivateKey) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/signer`,
  method: 'post',
  data: { encryptedPrivateKey },
  sensitiveRequest: true
})

export const disableUsdtWalletSigner = (merchantId, walletId) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/signer/disable`,
  method: 'post'
})

export const deleteUsdtWalletSigner = (merchantId, walletId) => request({
  url: `${base}/${segment(merchantId)}/wallets/${segment(walletId)}/signer`,
  method: 'delete'
})

export const findUsdtCollectionPlayers = (merchantId, memberId) => request({
  url: `${base}/${segment(merchantId)}/collection/players`,
  method: 'get',
  params: { memberId }
})

export const listUsdtCollectionOrders = merchantId => request({
  url: `${base}/${segment(merchantId)}/collection/orders`,
  method: 'get'
})

export const createUsdtCollectionOrder = (merchantId, data) => request({
  url: `${base}/${segment(merchantId)}/collection/orders`,
  method: 'post',
  data
})

export const queryUsdtCollectionOrder = (merchantId, orderId) => request({
  url: `${base}/${segment(merchantId)}/collection/orders/${segment(orderId)}/query`,
  method: 'post'
})
