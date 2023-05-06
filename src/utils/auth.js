const TokenKey = 'token'
const QiniuToken = 'qntoken'

// token
export function getToken() {
  return localStorage.getItem(TokenKey)
}
export function setToken(token) {
	localStorage.setItem(TokenKey, token);
}
export function removeToken() {
	localStorage.remove(TokenKey);
}