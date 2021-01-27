import {request} from "./request"

// 轮播图
export function _getBanner() {
  return request({
    url:'/banner'
  })
}

// 推荐歌单
export function _getPersonalized() {
  return request({
    url:'/personalized'
  })
}

// 独家放送
export function _getPrivateContent() {
  return request({
    url:'/personalized/privatecontent'
  })
}

// 推荐最新音乐
export function _getNewSong() {
  return request({
    url:'/personalized/newsong'
  })
}

// 推荐最新音乐
export function _getRecommendMv() {
  return request({
    url:'/personalized/mv'
  })
}

// 歌单分类标签
export function _getCatlistTag() {
  return request({
    url:'/playlist/catlist'
  })
}

// 根据标签获取歌单
export function _getTopPlayList(cat) {
  return request({
    url:'/top/playlist',
    params:{
      cat:cat
    }
  })
}

// 获取所有榜单
export function _getTopList() {
  return request({
    url:'/toplist'
  })
}

// 根据类型获取新歌
export function _getTopSong(type) {
  return request({
    url:'/top/song',
    params:{
      type:type
    }
  })
}

// 获取新专辑
export function _getNewAlbum() {
  return request({
    url:'/album/newest',
  })
}