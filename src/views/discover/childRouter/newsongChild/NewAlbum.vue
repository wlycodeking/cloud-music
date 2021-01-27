<template>
  <div class="new_album">
    <scroll class="scroll">
      <div class="album_list">
    <div class="album_item" v-for="(item,index) in newalbum" :key="index" @click="AlbumDetail(index)">
      <img :src="item.picUrl" alt="">
      <div class="album_name">{{item.name}}</div>
      <div class="artist_name">{{item.artist.name}}</div>
      
    </div>
    </div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import {_getNewAlbum} from "network/discover"
  export default {
    name: "NewAlbum",
    components: {
Scroll
    },
    data () {
     return {
       newalbum:null,
     }
    },
    created(){
      _getNewAlbum().then(res=>{
        this.newalbum=res.data.albums;
        console.log(this.newalbum);
      })
    },
    methods:{
      AlbumDetail(index){
        this.$router.push('/albumDetail/'+this.newalbum[index].id)
      }
    }
  }
</script>


<style scoped>
.new_album{
  width: 100%;
  height: 100%;
overflow: hidden;
  
}.scroll{
  width: 100%;
  height: 100%;
}
.album_list{
width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.album_item{
  width: 150px;
  padding: 20px;
}
.album_item img{
  width: 100%;
}
.album_name{
  width: 100%;
  text-align: center;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artist_name{
    text-align: center;
  color: rgb(110, 109, 109);
  font-size: 13px;
}
</style>