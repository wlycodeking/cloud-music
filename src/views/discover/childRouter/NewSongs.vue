<template>
  <div class="newsong">
    <!-- <scroll class="scroll"> -->
    <div class="top">
      <div class="top_control">
        <div class="newsongtitle" :class="{action:redShow}" @click="SongRouter">新歌速递</div>
        <div class="newalbum" :class="{action:!redShow}" @click="AlbumRouter">新碟上架</div>
      </div>
    </div>
    <div class="route">
      <keep-alive>
      <router-view></router-view></keep-alive>
    </div>
    <!-- </scroll> -->
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "NewSongs",
    components: {
Scroll
    },
    data () {
     return {
       redShow:true,
     }
    },
    methods:{
      SongRouter(){
        this.redShow=true;
        this.$router.push('newsong');
      },
      AlbumRouter(){
        this.redShow=false;
        this.$router.push('newalbum');
      }
    }
  }
</script>


<style scoped>
.newsong{
  width: 100%;
  height: 100%;
}
.scroll{
  width: 100%;
  height: 100%;
}
.top{
  width: 100%;
  height: 30px;
  /* background-color: rgb(189, 181, 181); */
  display: flex;
  /* justify-items: center; */
  justify-content: center;
  overflow: hidden;
}
.top_control{
  width: 200px;
  height: 27px;
  /* border-radius: 15px; */
  background-color: #fff;
  /* border: 1px solid rgb(214, 214, 214); */
  display: flex;
  overflow: hidden;
  font-size: 13px;
}
.newsongtitle{
  width: 48%;
  height: 25px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border: 1px solid rgb(214, 214, 214);
  border-right: none;
  flex-shrink:0;
  text-align: center;
      line-height: 25px;

}
.newalbum{
  flex-shrink:0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid rgb(214, 214, 214);
  border-left: none;
  width: 48%;
  height: 25px;
    text-align: center;
    line-height: 25px;

}
.action{
  background-color: red;
  /* border: none; */
}
.route{
  width: 100%;
  height: calc(100% - 30px);
}
</style>