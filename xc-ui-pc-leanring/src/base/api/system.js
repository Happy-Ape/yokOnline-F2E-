import http from './public'

/*数据字典 */
export const sys_getDictionary= dType => {
  return http.requestQuickGet('/sys/dictionary/get/'+dType)
}

/*存储文件元数据*/
export const sys_saveFileMetedata = params => {
  return http.requestPost('/filesystem/saveFileMetedata',params)
}

/*删除文件*/
export const sys_deleteFile = params => {
  return http.requestPost('/filesystem/delete',params)
}
/*课程查询*/
export const course_findByIds = ids => {
  return http.requestGet('/openapi/search/course/getbase/'+ids);
}
/*获取用户信息*/
export const get_user_message = userId => {
  let params={
    userId:userId
  }
  return http.requestPost('/api/ucenter/getUserMsg',params);
}
/*获取多个用户信息*/
export const user_findByIds = userIds => {
  let params={
    userId:userIds
  }
  return http.requestPost('/api/ucenter/findUserById',params);
}
/*修改用户信息*/
export const update_message = (value,userId,flag) => {
  let params={
    value:value,
    userId:userId,
    flag:flag
  }
  return http.requestPost('/api/ucenter/updateUserMsg',params);
}
/* 根据课程id查询出课程索引信息*/
export const course_view = id => {
  return http.requestGet('/openapi/search/course/getall/'+id);
}
/*获取jwt令牌*/
export const getjwt= () => {
  return http.requestQuickGet('/openapi/auth/userjwt')
}
