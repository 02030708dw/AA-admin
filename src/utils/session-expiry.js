export function isLoginRequest(url = '') {
  return /\/sys\/admin\/login(?:[?#]|$)/.test(url)
}

export function isSessionExpiredResponse(payload, url = '', status) {
  if (isLoginRequest(url)) return false
  if (status === 401) return true
  if (!payload || typeof payload !== 'object') return false
  const code = String(payload.resCode || payload.code || '')
  if (['000105', '401', '50008', '50012', '50014'].includes(code)) return true
  // AUTH_ERROR also means permission denied. Only known login errors end a session.
  return code === '000104' && [
    'Notloggedin', '未登录', '请先登录', 'Please log in first.',
    'กรุณาเข้าสู่ระบบก่อน', 'Vui lòng đăng nhập trước.', 'Silakan masuk terlebih dahulu.'
  ].includes(payload.resDesc)
}
