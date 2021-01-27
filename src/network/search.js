import {request} from "./request"


// 获取热搜
export function _getHotSearch(){
  return request({
    url:'/search/hot/detail',
    
  })
}

// 获取搜索建议
export function _getSuggestSearch(keywords){
  return request({
    url:'/search/suggest',
    params:{
      keywords:keywords
    }
    
  })
}

//获取搜索详情
export function _getSearch(keywords){
  return request({
    url:'/search',
    params:{
      keywords:keywords,
      limit:30
    }
    
  })
}
