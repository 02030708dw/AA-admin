jest.mock('element-ui', () => ({ Message: jest.fn() }))
jest.mock('@/utils/domain', () => ({ domain: {} }))
jest.mock('@/store', () => ({ __esModule: true, default: { dispatch: jest.fn() } }))
jest.mock('@/router/index', () => ({
  __esModule: true,
  default: {
    currentRoute: { path: '/games/game', fullPath: '/games/game?name=test' },
    replace: jest.fn((target, done) => done())
  }
}))

describe('AA-admin authentication recovery', () => {
  let request, auth, store, router, Message

  beforeEach(() => {
    jest.resetModules()
    localStorage.clear()
    auth = require('@/utils/auth')
    auth.setToken({ accessToken: 'aa-old', tokenHeader: 'Authorization', tokenPrefix: 'Bearer_' })
    localStorage.setItem('dy-admin-token', 'dy-current')
    store = require('@/store').default
    store.dispatch.mockImplementation(() => { auth.removeToken(); return Promise.resolve() })
    router = require('@/router/index').default
    Message = require('element-ui').Message
    request = require('@/utils/request').default
  })

  const success = config => ({ data: { resCode: '000000', resultSet: {} }, status: 200, config, headers: {} })
  const unauthorized = config => ({ config, response: { status: 401, data: { resCode: '000105' } }, message: '401' })

  it('does not attach a replaced bearer when submitting login credentials', async () => {
    request.defaults.adapter = jest.fn(config => Promise.resolve(success(config)))
    await request.post('/sys/admin/login', { userName: 'operator', password: 'fixture-only' })
    expect(request.defaults.adapter.mock.calls[0][0].headers.Authorization).toBeUndefined()
    expect(auth.getToken()).toBe('aa-old')
    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('keeps custom token prefixes and supports the standard Bearer separator', async () => {
    request.defaults.adapter = jest.fn(config => Promise.resolve(success(config)))
    await request.get('/game/page')
    expect(request.defaults.adapter.mock.calls[0][0].headers.Authorization).toBe('Bearer_aa-old')
    auth.setToken({ accessToken: 'aa-new', tokenHeader: 'Authorization', tokenPrefix: 'Bearer' })
    await request.get('/game/page')
    expect(request.defaults.adapter.mock.calls[1][0].headers.Authorization).toBe('Bearer aa-new')
  })

  it('recovers from concurrent HTTP 401s once, without calling logout or clearing DY storage', async () => {
    request.defaults.adapter = jest.fn(config => Promise.reject(unauthorized(config)))
    await Promise.all([request.get('/game/page'), request.get('/sys/role/allByUser')].map(call => call.catch(error => error)))
    expect(auth.getToken()).toBeNull()
    expect(auth.getTokenHeader()).toBeNull()
    expect(auth.getTokenPrefix()).toBeNull()
    expect(localStorage.getItem('dy-admin-token')).toBe('dy-current')
    expect(store.dispatch.mock.calls).toEqual([['user/resetToken']])
    expect(router.replace).toHaveBeenCalledWith({ path: '/login', query: { redirect: '/games/game?name=test' } }, expect.any(Function), expect.any(Function))
    expect(Message).toHaveBeenCalledTimes(1)
  })

  it('does not let a late 401 from the old session clear a new login', async () => {
    let rejectOld
    request.defaults.adapter = jest.fn(config => new Promise((resolve, reject) => {
      rejectOld = () => reject(unauthorized(config))
    }))
    const pending = request.get('/game/page').catch(error => error)
    await new Promise(resolve => setTimeout(resolve, 0))
    auth.setToken({ accessToken: 'aa-new', tokenHeader: 'Authorization', tokenPrefix: 'Bearer_' })
    rejectOld()
    await pending
    expect(auth.getToken()).toBe('aa-new')
    expect(store.dispatch).not.toHaveBeenCalled()
    expect(router.replace).not.toHaveBeenCalled()
    expect(Message).not.toHaveBeenCalled()
  })

  it('treats an invalid-password login response as a login failure, not an expired session', async () => {
    request.defaults.adapter = jest.fn(config => Promise.reject(unauthorized(config)))
    await expect(request.post('/sys/admin/login')).rejects.toBeDefined()
    expect(store.dispatch).not.toHaveBeenCalled()
    expect(router.replace).not.toHaveBeenCalled()
    expect(auth.getToken()).toBe('aa-old')
  })

  it.each([
    { resCode: '000104', resDesc: 'permission denied' },
    { resCode: '000107', resDesc: 'business rule failed' }
  ])('does not log out a valid account for a business/permission error: %s', async payload => {
    request.defaults.adapter = jest.fn(config => Promise.resolve({ ...success(config), data: payload }))
    await expect(request.get('/game/page')).rejects.toBeDefined()
    expect(store.dispatch).not.toHaveBeenCalled()
    expect(auth.getToken()).toBe('aa-old')
  })

  it('also recovers when an expired session is returned in an HTTP 200 envelope', async () => {
    request.defaults.adapter = jest.fn(config => Promise.resolve({ ...success(config), data: { resCode: '000104', resDesc: 'Notloggedin' } }))
    await expect(request.get('/game/page')).rejects.toThrow('登录状态已失效')
    expect(auth.getToken()).toBeNull()
    expect(store.dispatch.mock.calls).toEqual([['user/resetToken']])
  })
})
