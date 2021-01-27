<template>
  <div class="hotfif" v-if="songlist!=null">
    <div class="playall">
      <div class="playicon" @click="PlayMusic">
        <img src="~assets/img/icon/play/play.png" alt="">
      </div>
      <div class="playname">播放全部</div>
      <div class="totle">(共{{songlist.length}}首)</div>
    </div>
    <play-list :songlist="songlist"  @musicItemClick="PlayMusic"/>
  </div>
</template>


<script>
import PlayList from "views/musiclist/childComps/PlayList"

import {PlayMixin} from "common/PlayMixin"

import {_getTopsong} from "network/artist"
import {songDetail,_getSongDetail} from "network/musiclist"

  export default {
    name: "HotFif",
    components: {
PlayList
    },
    mixins:[PlayMixin],
    data () {
     return {
       id:0,
       songlist:[]
     }
    },
    created(){
    this.id = this.$route.params.key;
      _getTopsong(this.id).then(res=>{
        
        for(let i of res.data.songs){
        _getSongDetail(i.id).then(res=>{
          let song = new songDetail(res.data.songs);
          this.songlists=res.data;
          this.songlist.push(song)
        })
      }
      })
    },
    methods:{}
  }
</script>


<style scoped>
.hotfif{
  width: 100%;
  height: 100%;

}
.playall{
    display: flex;
    height: 40px;
    align-content: center;
    align-items: center;
  }
  .playicon{
    height: 100% ;
    padding-left: 10px;
    display: flex;
    align-items: center;

  }
  .playicon img{
    height: 60%;
  }
  .playname{
    padding: 0 5px 0 15px;
  }
  .totle{
    font-size: 10px;
    color: #b4b3b3;
  }
</style>