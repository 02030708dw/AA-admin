import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getLange() {
  return Cookies.get('language')
}
export function setToken(resultSet) {
  try {
    // 计算两小时后的时间
    const twoHoursLater = new Date()
    twoHoursLater.setTime(twoHoursLater.getTime() + 2 * 60 * 60 * 1000) // 2 小时后的时间
    Cookies.set(TokenKey, resultSet.accessToken, { expires: twoHoursLater })
    Cookies.set('tokenHeader', resultSet.tokenHeader, { expires: twoHoursLater })
    Cookies.set('tokenPrefix', resultSet.tokenPrefix, { expires: twoHoursLater })
    return true
  } catch (e) {
    return false
  }
}
export function getTokenHeader() {
  return Cookies.get('tokenHeader')
}
export function getTokenPrefix() {
  return Cookies.get('tokenPrefix')
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
