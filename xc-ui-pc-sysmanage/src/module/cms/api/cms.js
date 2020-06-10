import http from '@/base/api/public'
import querystring from 'querystring'
import * as qs from "autoprefixer";

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
//测试
export const page_test = id => {
  return http.requestQuickGet(apiUrl + '/cms/user/get/' + id)
}
/*页面列表*/
export const page_list = (page, size, params) => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size + '/?' + querys)
}
/*注册*/
export const register = params => {
  // let loginRequest = querystring.stringify(params)
  let registerRequest = "username=" + params.username + "&password=" + params.password + "&name=" + params.name + "&sex=" + params.sex + "&utype=" + params.utype + "&phone=" + params.phone + "&email=" + params.email + "&qq=" + params.qq;
  return http.requestPostForm('/api/ucenter/register', registerRequest);
}
export const site_list_params = (page, size, params) => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl + '/cms/site/list/' + page + '/' + size + '/?' + querys)
}
export const template_list_params = (page, size, params) => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl + '/cms/template/list/' + page + '/' + size + '/?' + querys)
}
/*站点列表*/
export const site_list = () => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  return http.requestQuickGet(apiUrl + '/cms/page/site_list')
}

/*模板列表*/
export const template_list = () => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  return http.requestQuickGet(apiUrl + '/cms/page/template_list')
}

/*页面添加*/
export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add', params)
}
/*站点添加*/
export const site_add = params => {
  return http.requestPost(apiUrl + '/cms/site/add', params)
}
/*模板添加*/
export const template_add = params => {
  return http.requestPost(apiUrl + '/cms/template/add', params)
}
/*页面修改*/
export const page_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/' + id, params)
}
/*站点修改*/
export const site_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/site/edit/' + id, params)
}
/*模板修改*/
export const template_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/template/edit/' + id, params)
}
/*页面查询*/
export const page_get = id => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + id)
}
/*站点查询*/
export const site_get = id => {
  return http.requestQuickGet(apiUrl + '/cms/site/get/' + id)
}
/*模板查询*/
export const template_get = id => {
  return http.requestQuickGet(apiUrl + '/cms/template/get/' + id)
}
/*页面删除*/
export const page_del = id => {
  return http.requestDelete(apiUrl + '/cms/page/del/' + id)
}
/*站点删除*/
export const site_del = id => {
  return http.requestDelete(apiUrl + '/cms/site/del/' + id)
}
/*模板删除*/
export const template_del = id => {
  return http.requestDelete(apiUrl + '/cms/template/del/' + id)
}
/*生成静态文件 */
export const page_generateHtml = (id, params) => {
  return http.requestPost(apiUrl + '/cms/page/generateHtml/' + id, params)
}
/*取出静态文件 */
export const page_getHtml = id => {
  return http.requestQuickGet(apiUrl + '/cms/page/getHtml/' + id)
}
/*发布页面*/
export const page_postPage = id => {
  return http.requestPost(apiUrl + '/cms/page/postPage/' + id)
}
