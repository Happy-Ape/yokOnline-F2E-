import http from './public'
import qs from 'qs'
let config = require('~/config/sysConfig')
let apiURL = config.backApiURL
/*登陆*/
export const login = params => {
  //let loginRequest = querystring.stringify(params)
  let loginRequest = qs.stringify(params);
  return http.requestPostForm(apiURL+'/auth/userlogin',loginRequest);
}
/*注册*/
export const register = params => {
  //let loginRequest = querystring.stringify(params)
  let registerRequest = qs.stringify(params);
  return http.requestPostForm('/api/ucenter/register', registerRequest);
}
/*退出*/
export const logout = params => {
  sessionStorage.removeItem('activeUser');
  return http.requestPost('/api/auth/userlogout');
}
/*获取jwt令牌*/
export const getjwt= () => {
  return http.requestQuickGet(apiURL+'/auth/userjwt')
}



