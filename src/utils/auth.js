import Cookies from 'js-cookie'
const TokenKey = 'zy_token'

function fakeCsrfToken() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export function getCsrfToken() {
  return Cookies.get('csrfToken') || fakeCsrfToken()
}

export function setCookie(key, val) {
  Cookies.set(key, val)
}

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function setLoginInfo(loginInfo = {}) {
  for (const key in loginInfo) {
    window.sessionStorage.setItem(key, loginInfo[key])
  }
}
export function setParentUrl(url) {
  return sessionStorage.setItem('parentUrl', url)
}

export function getParentUrl() {
  return sessionStorage.getItem('parentUrl')
}

export function getLoginInfo(key) {
  if (key) {
    return window.sessionStorage.getItem(key) || ''
  }
}

