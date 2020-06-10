/* 是否手机号码*/
export function validatePhone(rule, value, callback) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  }
}

/* 是否邮箱*/
export function validateEmail(rule, value, callback) {
  const reg1 = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确的邮箱地址'));
  } else {
    callback();
  }
}
  /* 是否邮箱*/
  export function validateEmailLogin(rule, value, callback) {
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (value == '' || value == undefined || value == null) {
      callback();
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱地址'));
      } else {
        callback();
      }
    }
  }

  /*验证内容是否英文数字以及下划线*/
  export function isPassword(rule, value, callback) {
    const reg = /^[_a-zA-Z0-9]+$/;
    if (value == '' || value == undefined || value == null) {
      callback();
    } else {
      if (!reg.test(value)) {
        callback(new Error('密码仅由英文字母，数字以及下划线组成'));
      } else {
        callback();
      }
    }
  }

  /*验证内容是否英文数字以及下划线*/
  export function isUserName(rule, value, callback) {
    const reg = /^[_\-a-zA-Z0-9]+$/;
    if (value == '' || value == undefined || value == null) {
      callback();
    } else {
      if (!reg.test(value)) {
        callback(new Error('账号仅由英文字母，数字、-以及下划线组成'));
      } else {
        callback();
      }
    }
  }

//计算字符串长度包含中文
  export function validateLen(rule, val, callback) {
    var len = val.length;
    var reg = /^[0-9]+.?[0-9]*$/
    if (reg.test(val) && len < 8) {
      callback(new Error("密码不能为8位以下的纯数字"));
    } else {
      callback();
    }
  }

  export function validateQQ(rule, val, callback) {
    var len = val.length;
    var reg = /^[0-9]*$/
    if (reg.test(val) && len >= 6 && len <= 11) {
      callback();
    } else if (!reg.test(val)) {
      callback(new Error("QQ不是纯数字"));
    } else {
      callback(new Error("QQ由5位数以上、11位数以下的纯数字组成"));
    }
  }

  export function validateQQLogin(rule, val, callback) {
    var len = val.length;
    var reg = /^[0-9]*$/
    if (val == '' || val == undefined || val == null) {
      callback();
    } else {
      if (reg.test(val) && len >= 6 && len <= 11) {
        callback();
      } else if (!reg.test(val)) {
        callback(new Error("QQ不是纯数字"));
      } else {
        callback(new Error("QQ由6-11位(包含）的纯数字组成"));
      }
    }
}


