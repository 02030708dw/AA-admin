import request from '@/utils/request'
import {
  listUsdtMerchants, listUsdtWallets, getUsdtWallet, createUsdtWallet, updateUsdtWalletRouting,
  refreshUsdtWallet, enableUsdtWallet, disableUsdtWallet, setUsdtWalletSigner,
  disableUsdtWalletSigner, deleteUsdtWalletSigner, findUsdtCollectionPlayers,
  listUsdtCollectionOrders, createUsdtCollectionOrder, queryUsdtCollectionOrder
} from '@/api/finance/usdtWallet'

jest.mock('@/utils/request', () => jest.fn(config => config))

describe('USDT wallet admin API routes', () => {
  beforeEach(() => request.mockClear())

  test('uses encoded string IDs and the documented wallet routes', () => {
    listUsdtMerchants()
    listUsdtWallets('merchant/a', 'TRC20')
    getUsdtWallet('merchant/a', 'wallet 1')
    createUsdtWallet('merchant/a', { network: 'TRC20', address: 'TAddress' })
    updateUsdtWalletRouting('merchant/a', 'wallet 1', { priority: 1, isAutoSelectEnabled: true })
    refreshUsdtWallet('merchant/a', 'wallet 1')
    enableUsdtWallet('merchant/a', 'wallet 1')
    disableUsdtWallet('merchant/a', 'wallet 1')
    expect(request.mock.calls.map(call => [call[0].method, call[0].url])).toEqual([
      ['get', '/finance/usdtWallet/merchants'],
      ['get', '/finance/usdtWallet/merchant%2Fa/wallets'],
      ['get', '/finance/usdtWallet/merchant%2Fa/wallets/wallet%201'],
      ['post', '/finance/usdtWallet/merchant%2Fa/wallets'],
      ['put', '/finance/usdtWallet/merchant%2Fa/wallets/wallet%201/routing'],
      ['post', '/finance/usdtWallet/merchant%2Fa/wallets/wallet%201/refresh'],
      ['post', '/finance/usdtWallet/merchant%2Fa/wallets/wallet%201/enable'],
      ['post', '/finance/usdtWallet/merchant%2Fa/wallets/wallet%201/disable']
    ])
    expect(request.mock.calls[1][0].params).toEqual({ network: 'TRC20' })
  })

  test('keeps the encrypted signer envelope only in the POST body', () => {
    const encryptedPrivateKey = 'opaque-encrypted-envelope'
    setUsdtWalletSigner('m', 'w', encryptedPrivateKey)
    disableUsdtWalletSigner('m', 'w')
    deleteUsdtWalletSigner('m', 'w')
    expect(request.mock.calls[0][0]).toEqual({ url: '/finance/usdtWallet/m/wallets/w/signer', method: 'post', data: { encryptedPrivateKey }, sensitiveRequest: true })
    expect(request.mock.calls[1][0]).toEqual({ url: '/finance/usdtWallet/m/wallets/w/signer/disable', method: 'post' })
    expect(request.mock.calls[2][0]).toEqual({ url: '/finance/usdtWallet/m/wallets/w/signer', method: 'delete' })
  })

  test('uses exact member query and documented collection routes', () => {
    const payload = { memberId: '1234567890123456789', walletId: 'wallet-1', amount: '15.625', requestId: 'stable-request' }
    findUsdtCollectionPlayers('m', payload.memberId)
    listUsdtCollectionOrders('m')
    createUsdtCollectionOrder('m', payload)
    queryUsdtCollectionOrder('m', 'order/1')
    expect(request.mock.calls[0][0].params.memberId).toBe('1234567890123456789')
    expect(request.mock.calls[1][0].url).toBe('/finance/usdtWallet/m/collection/orders')
    expect(request.mock.calls[2][0].data).toBe(payload)
    expect(request.mock.calls[3][0].url).toBe('/finance/usdtWallet/m/collection/orders/order%2F1/query')
  })
})
