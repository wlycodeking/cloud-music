<template>
  <div>
    <div class="bgcimg">
      <img :src="album.picUrl" alt="" />
    </div>
    <div class="baseinfo">
      <div class="base_img" @click="www()">
        <img :src="album.picUrl" alt="" />
      </div>
      <div class="artist_info">
        <div class="artist_name">
<img class="albumicon" src="~assets/img/icon/album/album.png" alt="">
          {{ album.name }}</div>
      <div class="artistname">
        歌手：{{album.artist.name}}
      </div>
      <div class="artistname">
        发行时间：{{format(album.publishTime)}}
      </div>
      </div>
      <div class="description">
        
      </div>
    </div>
  </div>
</template>


<script>
import {dateFormat} from "common/tool"
  export default {
    name: "AlbumInfo",
    components: {

    },
    props: {
    album: {
      type: Object,
      default() {
        return null;
      },
    },
  },
    data () {
     return {}
    },
    methods:{
      format(publishTime){
        return dateFormat ("YYYY-mm-dd",new Date(publishTime) );
      },
    }
  }
</script>


<style scoped>
.bgcimg {
  width: 100%;
  height: 170px;
  position: absolute;
  left: 0;
  z-index: -1;
  overflow: hidden;
  background-color: rgb(170, 169, 169);
}
.bgcimg img {
  width: 100%;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(60px);
}
.baseinfo {
  /* position: absolute; */
  width: 100%;
  height: 170px;
  display: flex;
}

.base_img {
  width: 130px;
  height: 130px;
  margin: 20px 20px 0 35px;
}
.base_img img {
  width: 100%;
  height: 100%;
}
.artist_info {
  margin-top: 30px;
}
.artist_name {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  align-content: center;
}

.albumicon{
  height: 25px;
  margin-right: 10px;
}
.artistname{
  margin-left: 30px;
  margin-top: 10px;
  font-size: 15px;
}
</style>