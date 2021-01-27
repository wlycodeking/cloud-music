import { request } from "./request"


//注册
export function _Register(phone,password,captcha,nickname) {
  return request({
    url: '/register/cellphone',
    params: {
      captcha: captcha,
      phone: phone,
      password: password,
      nickname: nickname,
    }
  })
}

//验证验证码
export function _VerifyCaptcha(phone,captcha) {
  return request({
    url: '/captcha/verify',
    params: {

      phone: phone,
      captcha:captcha

    }
  })
}
//获得验证码
export function _getCaptcha(phone) {
  return request({
    url: '/captcha/sent',
    params: {

      phone: phone,

    }
  })
}
//检测手机号码是否已注册
export function _PhoneVerify(phone) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone: phone
    }
  })
}

//登录
export function _Login(phone, password) {
  return request({
    url: '/login/cellphone',
    params: {
      phone: phone,
      password: password
    }
  })
}

//用户歌单
export function _getUserMusic(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid: uid
    }
  })
}

//新建用户歌单
export function _createList(name) {

  return request({
    url: '/playlist/create',
    params: {
      name: name
    }
  })
}
//删除用户歌单
export function _deleteList(id) {

  return request({
    url: '/playlist/delete',
    params: {
      id: id
    }
  })
}

//刷新用户登录状态
export function _loginRefresh() {

  return request({
    url: '/login/refresh',

  })
}

// 对用户歌单添加音乐
export function _addMusic(op, pid, tracks) {
  return request({
    url: '/playlist/tracks',
    params: {
      op: op,
      pid: pid,
      tracks: tracks
    }
  })
}


// 喜欢音乐
export function _like(id) {
  return request({
    url: '/like',
    params: {
      id:id
    }
  })
}

// 收藏歌单
export function _subscribeList(t,id) {
  return request({
    url: '/playlist/subscribe',
    params: {
      t:t,
      id:id
    }
  })
}
