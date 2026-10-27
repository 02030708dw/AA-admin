jest.mock('@/router', () => ({
  __esModule: true,
  default: { beforeEach: jest.fn(), afterEach: jest.fn() },
  newRouter: jest.fn(), constantRoutes: []
}))
jest.mock('@/store', () => ({ __esModule: true, default: { getters: { roles: [] }, dispatch: jest.fn(), commit: jest.fn() } }))
jest.mock('element-ui', () => ({ Message: { error: jest.fn() } }))
jest.mock('nprogress', () => ({ configure: jest.fn(), start: jest.fn(), done: jest.fn() }))
jest.mock('nprogress/nprogress.css', () => ({}))
jest.mock('@/utils/get-page-title', () => () => 'Admin')

describe('AA-admin route session recovery', () => {
  let auth, router, store, guard
  beforeEach(() => {
    jest.resetModules()
    localStorage.clear()
    auth = require('@/utils/auth')
    auth.setToken({ accessToken: 'old', tokenHeader: 'Authorization', tokenPrefix: 'Bearer_' })
    store = require('@/store').default
    router = require('@/router').default
    require('@/permission')
    guard = router.beforeEach.mock.calls[0][0]
  })

  it('clears local credentials when the menu cannot load, without an authenticated logout request', async () => {
    store.dispatch.mockImplementation(action => {
      if (action === 'permission/getRouter') return Promise.reject(new Error('401'))
      if (action === 'user/resetToken') { auth.removeToken(); return Promise.resolve() }
      throw new Error('Unexpected action ' + action)
    })
    const next = jest.fn()
    await guard({ path: '/games/game', meta: {} }, {}, next)
    expect(auth.getToken()).toBeNull()
    expect(store.dispatch.mock.calls.map(call => call[0])).toEqual(['permission/getRouter', 'user/resetToken'])
    expect(next).toHaveBeenCalledWith('/login?redirect=/games/game')
  })

  it('does not clear a new session when an older pending menu request fails', async () => {
    let rejectMenu
    store.dispatch.mockImplementation(() => new Promise((resolve, reject) => { rejectMenu = reject }))
    const next = jest.fn()
    const pending = guard({ path: '/games/game', meta: {} }, {}, next)
    auth.setToken({ accessToken: 'new', tokenHeader: 'Authorization', tokenPrefix: 'Bearer_' })
    rejectMenu(new Error('old request failed'))
    await pending
    expect(auth.getToken()).toBe('new')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(false)
  })
})
