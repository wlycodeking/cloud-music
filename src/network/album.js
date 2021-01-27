import {request} from "./request"

// 专辑详情
export function _getAlbum(id) {
  return request({
    url:'/album',
    params:{
      id:id
    }
  })
}