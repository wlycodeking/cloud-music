import {request} from "./request"

// 歌手
export function _getArtists(id) {
  return request({
    url:'/artists',
    params:{
      id:id
    }
  })
}

// 歌手单曲
export function _getTopsong(id) {
  return request({
    url:'/artist/top/song',
    params:{
      id:id
    }
  })
}

// 歌手专辑
export function _getArtAlbum(id) {
  return request({
    url:'/artist/album',
    params:{
      id:id
    }
  })
}
// 歌手MV
export function _getArtMv(id) {
  return request({
    url:'/artist/mv',
    params:{
      id:id
    }
  })
}
// 歌手详情
export function _getArtdesc(id) {
  return request({
    url:'/artist/desc',
    params:{
      id:id
    }
  })
}