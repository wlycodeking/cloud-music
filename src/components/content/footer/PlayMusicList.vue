<template>
  <div class="play_music_list">
    
    <div class="title">
      <div class="play_list_title">
        播放列表
      </div>
      <div class="play_list_num">
({{musicList.length}})
      </div>
    </div>
    <scroll class="play_list_scroll">
    <play-list :songlist="musicList"/>
    </scroll>
  </div>
</template>


<script>
import PlayList from "views/musiclist/childComps/PlayList"
import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "PlayMusicList",
    components: {
PlayList,
Scroll
    },
    props: {
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
    data () {
     return {

     }
    },
    methods:{}
  }
</script>


<style scoped>
.play_music_list{
  width: 100%;
  height: 100%;
}
.play_list_scroll{
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
}
.title{
  height: 50px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  border-bottom: 1px solid rgb(173, 172, 172);
}
.play_list_num{
  padding-left: 5px;
}
</style>