jest.mock('element-ui', () => ({ Message: jest.fn() }))
jest.mock('@/utils/domain', () => ({ domain: {}}))
jest.mock('@/store', () => ({ __esModule: true, default: { dispatch: jest.fn() }}))
jest.mock('@/router/index', () => ({
  __esModule: true,
  default: { currentRoute: { path: '/finance/usdtWallet', fullPath: '/finance/usdtWallet' }, replace: jest.fn() }
}))

describe('sensitive Axios request redaction', () => {
  let request, Message

  beforeEach(() => {
    jest.resetModules()
    request = require('@/utils/request').default
    Message = require('element-ui').Message
    Message.mockClear()
  })

  it('does not log or reject with a raw Axios error containing the encrypted envelope', async() => {
    const encryptedPrivateKey = 'fixture-encrypted-envelope-never-log'
    let originalError
    request.defaults.adapter = jest.fn(config => {
      const responseConfig = { ...config, sensitiveRequest: undefined }
      originalError = { config, response: { status: 503, data: { resDesc: encryptedPrivateKey }, config: responseConfig }, message: encryptedPrivateKey }
      return Promise.reject(originalError)
    })
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const result = await request({
      url: '/finance/usdtWallet/m/wallets/w/signer', method: 'post',
      data: { encryptedPrivateKey }, sensitiveRequest: true
    }).catch(error => error)

    expect(result).toBeInstanceOf(Error)
    expect(result).not.toBe(originalError)
    expect(result.message).not.toContain(encryptedPrivateKey)
    expect(originalError.config.data).toBeUndefined()
    expect(originalError.response.config.data).toBeUndefined()
    expect(log).not.toHaveBeenCalled()
    expect(Message).toHaveBeenCalledWith(expect.objectContaining({ message: expect.not.stringContaining(encryptedPrivateKey) }))
    log.mockRestore()
  })

  it('clears the sensitive request body from retained config after success', async() => {
    let retainedConfig
    request.defaults.adapter = jest.fn(config => {
      retainedConfig = config
      return Promise.resolve({ data: { resCode: '000000', resultSet: {}}, status: 200, config, headers: {}})
    })
    await request({ url: '/finance/usdtWallet/m/wallets/w/signer', method: 'post', data: { encryptedPrivateKey: 'fixture' }, sensitiveRequest: true })
    expect(retainedConfig.data).toBeUndefined()
  })
})
