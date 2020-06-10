
/*创建订单*/
const createOrder = (courseId,userId) => {
     let params = {
         courseId:courseId,
         userId:userId
     }
    return requestPost('/order/create',params);
}

/*查询 选课信息*/
const queryChooseCourse = (courseId,userId) => {
    let params = {
        courseId:courseId,
        userId:userId
    }
    return requestPost('/api/learning/course/getchoosecourse/',params);
}
/*收藏*/
const collect = (courseId,userId) => {
    let params = {
        courseId:courseId,
        userId:userId
    }
    return requestPost('/api/learning/course/collection/',params);
}
/*取消收藏*/
const calcollect = (courseId,userId) => {
    let params = {
        courseId:courseId,
        userId:userId
    }
    return requestPost('/api/learning/course/cancelCollection', params);
}


/*查看收藏状态*/
const getCollection = (courseId,userId) => {
    let params = {
        courseId:courseId,
        userId:userId
    }
    return requestPost('/api/learning/course/getcollectstatus/',params);
}
/*免费课程报名*/
const addOpencourse =(courseId,userId) => {
    let params = {
        courseId:courseId,
        userId:userId
    }
    return requestPost('/api/learning/course/addopencourse/',params);
}
/*获取评分*/
const get_score = courseId => {
    let params = {
        courseId:courseId
    }
    return requestPost('/api/learning/course/getCourseScore',params);
}
