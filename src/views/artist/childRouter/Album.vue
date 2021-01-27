<template>
  <div class="album" v-if="albumlist!=null">
    <div class="album_list">
      <div class="album_item" v-for="(item,index) in albumlist" :key="index" @click="RouterAlbum(index)">
        <img :src="item.picUrl" alt="">
        <div class="album_name">{{item.name}}</div>
        <div class="album_time">{{format(item.publishTime)}}</div>
      </div>
    </div>
  </div>
</template>


<script>

import {_getArtAlbum} from "network/artist"

import {dateFormat} from "common/tool"
  export default {
    name: "Album",
    components: {

    },
    data () {
     return {
       albumlist:null,
       id:0,
     }
    },
    created(){
      this.id=this.$route.params.key;
      _getArtAlbum(this.id).then(res=>{
        this.albumlist=res.data.hotAlbums

      })
    },
   
    methods:{
      format(publishTime){
        return dateFormat ( "YYYY-mm-dd",new Date(publishTime));
      },
      RouterAlbum(index){
        this.$router.push('/albumDetail/'+this.albumlist[index].id)
      }
    }
  }
</script>


<style scoped>
.album{
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);

}
.album_list{
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content:space-between; */
  flex-wrap: wrap;
}
.album_item{
  padding: 10px;
  overflow: hidden;
}
.album_item img{
  width: 150px;
  height: 150px;
}
.album_name{
  font-size: 15px;
  text-align: center;
  width: 150px;
  overflow: hidden;
}
.album_time{
  font-size: 13px;
  text-align: center;
}
</style>