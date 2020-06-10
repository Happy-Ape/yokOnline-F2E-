import http from './../../../base/api/public'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
import querystring from 'querystring'
/*选课查询*/
export const course_list = (page, size, userId) => {
  let params = {
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/course_list/' + page + '/' + size, params);
}
/*收藏查询*/
export const collect_list = (page, size, userId) => {
  let params = {
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/collect_list/' + page + '/' + size, params);
}
/*删除选课*/
export const delete_course = (courseId, userId) => {
  let params = {
    courseId: courseId,
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/deleteCourse', params);
}
/*取消收藏*/
export const cancel_collect = (courseId, userId) => {
  let params = {
    courseId: courseId,
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/cancelCollection', params);
}

/*发布评论*/
export const publish_commment = (courseId, userId, score, comment) => {
  let params = {
    courseId: courseId,
    userId: userId,
    score: score,
    comment: comment
  }
  return http.requestPost(apiUrl + '/learning/course/comment/publishComment', params);
}

/*发布问题*/
export const publish_question = (courseId, teachPlanId, userId, title, content) => {
  let params = {
    courseId: courseId,
    teachPlanId: teachPlanId,
    userId: userId,
    title: title,
    content: content
  }
  return http.requestPost(apiUrl + '/learning/course/question/publishQuestion', params);
}

/*发布回答*/
export const publish_ask = (courseId, teachPlanId, userId, askId, content) => {
  let params = {
    courseId: courseId,
    teachPlanId: teachPlanId,
    userId: userId,
    askId: askId,
    content: content
  }
  return http.requestPost(apiUrl + '/learning/course/question/publishAnswer', params);
}
/*删除回答*/
export const delete_ask = (id, userId) => {
  let params = {
    userId: userId,
  }
  return http.requestPost(apiUrl + '/learning/course/question/deleteAnswer/' + id, params);
}
/*删除问题*/
export const delete_question = id => {

  return http.requestDelete(apiUrl + '/learning/course/question/deleteQuestion/' + id);
}
/*获取我的问题*/
export const get_my_question = (userId, courseId, teachPlanId) => {
  let params = {
    courseId: courseId,
    teachPlanId: teachPlanId,
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/question/getMyQuestion', params);
}

/*获取他人问题*/
export const get_other_question = (userId, courseId, teachPlanId) => {
  let params = {
    courseId: courseId,
    teachPlanId: teachPlanId,
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/question/getOtherQuestion', params);
}
/*获取评论*/
export const get_comment = courseId => {
  return http.requestPost(apiUrl + '/learning/course/comment/getComment/' + courseId);
}
/*删除我的评论*/
export const delete_comment = (userId, id) => {
  let params = {
    userId: userId
  }
  return http.requestPost(apiUrl + '/learning/course/comment/deleteComment/' + id, params);
}
/*添加笔记*/
export const publish_notes = (courseId, teachPlanId, userId, notes) => {
  let params = {
    courseId: courseId,
    userId: userId,
    teachPlanId: teachPlanId,
    notes: notes
  }
  return http.requestPost(apiUrl + '/learning/course/chapter/publishNotes', params);
}
/*获取我的笔记*/
export const get_my_notes = (userId, courseId, teachPlanId) => {
  let params = {
    courseId: courseId,
    userId: userId,
    teachPlanId: teachPlanId,
  }
  return http.requestPost(apiUrl + '/learning/course/chapter/getMyNotes', params);
}
/*获取他人笔记*/
export const get_other_notes = (userId, courseId, teachPlanId) => {
  let params = {
    courseId: courseId,
    userId: userId,
    teachPlanId: teachPlanId,
  }
  return http.requestPost(apiUrl + '/learning/course/chapter/getOtherNotes', params);
}
/*删除我的笔记*/
export const delete_notes = id => {
  return http.requestDelete(apiUrl + '/learning/course/chapter/deleteNotes/' + id);
}
/*删除我的笔记*/
export const thumbsUp = id => {
  return http.requestPost(apiUrl + '/learning/course/notes/praise/' + id);
}
/*查询选课状态*/
export const course_learnstatus = courseId => {
  return http.requestPost(apiUrl + '/learning/course/learnstatus/' + courseId);
}
/*获取播放地址*/
export const get_media = (courseId, chapter) => {
  return http.requestGet(apiUrl + '/learning/course/getmedia/' + courseId + '/' + chapter);
}
/*获取章节信息*/
export const get_chapter = chapter => {
  return http.requestGet(apiUrl + '/learning/course/getChapter/' + chapter);
}



