import {request} from "./request"


// 获取歌单
export function _getMusicListDetail(id){
  return request({
    url:'/playlist/detail',
    params:{
      id:id
    }
  })
}



// 歌曲基础信息
export class baseInfo{
  constructor(playlist){
    this.img=playlist.coverImgUrl;
    this.title=playlist.description;
    this.name=playlist.name;
    this.shareCount=playlist.shareCount;
    this.subscribedCount=playlist.subscribedCount;
    this.playCount=playlist.playCount;
    this.trackCount=playlist.trackCount;
    this.tags=playlist.tags;
    this.creatorName=playlist.creator.nickname;
    this.commentCount=playlist.commentCount;
    this.singerImg=playlist.creator.avatarUrl;
    this.trackIds=playlist.trackIds;
  }
}


// 根据歌单id获取歌曲id
// 根据歌曲id获取歌曲信息
export function _getSongDetail(id){
  return request({
    url:'/song/detail',
    params:{
      ids:id
    }
  })
}

/**对歌曲数据进行封装 */
export class songDetail{
  constructor(songs){
    this.id=songs[0].id;
    this.name=songs[0].name;
    this.album=songs[0].al.name;
    this.singer=songs[0].ar[0].name;
    this.pic=songs[0].al.picUrl;
    this.alia=songs[0].alia;
    this.singerId=songs[0].ar[0].id;
    this.albumId=songs[0].al.id
    // this.time=dateFormat('MM:SS',new Date(songs[0].dt))
    
  }
}

// 获取音乐url
export function _getMusicUrl(id){
  return request({
    url:'/song/url',
    params:{
      id:id
    }
  })
}

// 获取歌曲歌词
export function _getLyric(id){
  return request({
    url:'/lyric',
    params:{
      id:id
    }
  })
}
