import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

const userId = "adminUserId"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUserId() {
  return Cookies.get(userId)
}

export function setUserId(uId) {
  return Cookies.set(userId,uId)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
