import http from './../../../base/api/public'
import querystring from 'querystring'
import qs from 'qs'

/*订单列表*/
export const order_list = (page,size,params) => {
  return http.requestPost('/api/order/list/'+page+'/'+size,params);
}
/*根据id查询订单*/
export const order_findById = id => {
  return http.requestGet('/api/order/get/'+id);
}
/*根据id查询订单状态*/
export const getOrderStatus= id => {
  return http.requestGet('/api/order/getStatus/'+id);
}
/*创建订单*/
export const createOrder = (courseId,userId) => {
  let params = {
    courseId:courseId,
    userId:userId
  }
  return http.requestPost('/api/order/create',params);
}
/*删除订单*/
export const delete_order = id => {

  return http.requestPost('/api/order/delete/'+id);
}

/*单个课程查询*/
export const course_view = id => {
  return http.requestQuickGet(  '/api/course/courseview/' + id)
}
/*支付宝*/
export const goAlipay = params => {
  let requestString = qs.stringify(params);
  return http.requestPostForm('/api/order/pay/aliPay',requestString);
}
/*创建 支付 二维码*/
export const pay_createWeixinQrcode = params => {
  let requestString = qs.stringify(params);
  return http.requestPostForm('/api/order/pay/createWeixinQrcode',requestString);
}
/*查询支付结果*/
export const pay_queryWeixinPayStatus = params => {
  return http.requestGet('/api/order/pay/queryWeixinPayStatus',params);
}

/*取消订单*/
export const cancel = id => {
  return http.requestPost('/api/order/cancel/'+id);
}


