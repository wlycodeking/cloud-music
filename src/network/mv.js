import {request} from "./request"

// 获取全部Mv
export function _AllMv(area='全部',type='全部',order='最新'){
  return request({
    url:'/mv/all',
    params:{
      area:area,
      type:type,
      order:order,
    }
  })
}

// 获取最新 mv
export function _NewMv(limit=5){
  return request({
    url:'/mv/first',
    params:{
      limit:limit
    }
  })
}

// 获取独家Mv
export function _ExclusiveMv(limit=30){
  return request({
    url:'/mv/exclusive/rcmd',
    params:{
      limit:limit
    }
  })
}

// 获取推荐Mv
export function _PersonalizedMv(){
  return request({
    url:'/personalized/mv',

  })
}

// 获取Mv排行榜
export function _TopMv(limit=10){
  return request({
    url:'/top/mv',
    params:{
      limit:limit
    }
  })
}

// 获取 mv 数据
export function _MvDetail(mvid){
  return request({
    url:'/mv/detail',
    params:{
      mvid:mvid
    }
  })
}

// 获取 mv 地址
export function _MvUrl(id){
  return request({
    url:'/mv/url',
    params:{
      id:id
    }
  })
}

// 获取 mv 评论
export function _MvComment(id){
  return request({
    url:'/comment/mv',
    params:{
      id:id
    }
  })
}