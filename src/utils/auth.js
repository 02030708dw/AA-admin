import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}
export function getLange() {
  return Cookies.get('language')
}
export function setToken(resultSet) {
  try {
    // 计算两小时后的时间
    // const twoHoursLater = new Date()
    // twoHoursLater.setTime(twoHoursLater.getTime() + 2 * 60 * 60 * 1000) // 2 小时后的时间
    // Cookies.set(TokenKey, resultSet.accessToken, { expires: twoHoursLater })
    // Cookies.set('tokenHeader', resultSet.tokenHeader, { expires: twoHoursLater })
    // Cookies.set('tokenPrefix', resultSet.tokenPrefix, { expires: twoHoursLater })
    localStorage.setItem('token', resultSet.accessToken)
    localStorage.setItem('tokenHeader', resultSet.tokenHeader)
    localStorage.setItem('tokenPrefix', resultSet.tokenPrefix)
    return true
  } catch (e) {
    return false
  }
}
export function getTokenHeader() {
  // return Cookies.get('tokenHeader')
  return localStorage.getItem('tokenHeader')
}
export function getTokenPrefix() {
  // return Cookies.get('tokenPrefix')
  return localStorage.getItem('tokenPrefix')
}
export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem('token')
}
