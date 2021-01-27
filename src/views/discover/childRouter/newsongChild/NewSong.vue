<template>
  <div class="newsong">
    <div class="area_nav">
      <div
        class="area_item"
        v-for="(item, index) in area"
        :key="index"
        :class="{ action: currentIndex == index }"
        @click="areaClick(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <scroll class="scroll">
      <div class="muisclist">
        <div class="play_all">
          <div class="playicon" @click="PlayMusic(0)">
            <img src="~assets/img/icon/play/play.png" alt="" />
          </div>
          <div class="playname">播放全部</div>
          <div class="totle">(共{{ this.songlist.length }}首)</div>
        </div>
        <div class="musiclist_table">
          <div
            class="musiclist_item"
            v-for="(item, index) in songlist"
            :key="index"
            :class="{ active: index % 2 != 0 }"
            
          >
            <div class="num">{{ index + 1 }}</div>
            <div class="songInfo" @click="PlayMusic(index)">
              <div class="songname">{{ item.name }}</div>
              <div class="artname">{{ item.singer }}-{{ item.album }}</div>
            </div>
            <div class="moreicon">
          <el-popover placement="left" width="150px" trigger="click">
            <div class="popover_content card1" @click="RouterComment(index)">
              <img src="~assets/img/icon/more/comment.png" alt="" />
              评论
            </div>
            <div class="popover_content card2" @click="RouterSinger(index)">
              <img src="~assets/img/icon/more/singer.png" alt="" />
              歌手
            </div>
            <div class="popover_content card3" @click="RouterAlbum(index)">
              <img src="~assets/img/icon/more/album.png" alt="" />
              专辑
            </div>
            <button slot="reference">
              <img src="~assets/img/icon/more/more.png" alt="" />
            </button>
          </el-popover>
        </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import {PlayMixin} from "common/PlayMixin"
import { _getTopSong } from "network/discover";
import { _getSongDetail, songDetail } from "network/musiclist";
export default {
  name: "NewSong",
  components: { Scroll },
  mixins:[PlayMixin],
  data() {
    return {
      currentIndex: 0,
      area: [
        { value: 0, name: "全部" },
        { value: 7, name: "华语" },
        { value: 96, name: "欧美" },
        { value: 16, name: "韩国" },
        { value: 8, name: "日本" },
      ],
      songlist: [],
    };
  },
  created() {
    this.getTopSong();
  },
  methods: {
    areaClick(index) {
      this.currentIndex = index;
      this.getTopSong(true);
    },
    // PlayMusic(index){
    //   this.PlayMusic(index);
    // },
    RouterComment(index) {
      console.log("歌曲评论路由");
      console.log(this.songlist[index]);
    },
    RouterSinger(index) {
      console.log("歌曲歌手路由");
      this.$router.push('/artist/'+this.songlist[index].singerId)
    },
    RouterAlbum(index) {
      console.log("歌曲专辑路由");
      this.$router.push('/albumDetail/'+this.songlist[index].albumId)

    },
    getTopSong(clear = false) {
      if (clear) this.songlist = [];
      _getTopSong(this.area[this.currentIndex].value).then((res) => {
        this.list = res.data.data;
        for (let i of this.list.slice(0,100)) {
          _getSongDetail(i.id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.songlist.push(song);
          });
        }
        console.log(this.songlist);
      });
    },
  },
};
</script>


<style scoped>
.newsong {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.area_nav {
  width: 80%;
  height: 25px;
  margin-top: 10px;
  border-bottom: 1px solid rgb(161, 161, 161);
  display: flex;
  justify-content: center;
  font-size: 13px;
  line-height: 25px;
  margin-bottom: 20px;
}
.area_item {
  padding: 0 20px;
  width: 40px;
  height: calc(100% - 2px);
  text-align: center;
  /* padding-bottom: 4px; */
}
.action {
  font-size: 16px;
  border-bottom: 3px solid rgb(170, 168, 168);
}
.scroll {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
}
.muisclist {
  /* margin-top: 10px; */
  width: calc(100% - 10px);
  height: 2500px;
  /* border: 1px solid rgb(197, 195, 195); */
  border-right: none;
  overflow: hidden;
  /* height: calc(100% - 25px); */
}
.play_all {
  width: 100%;
  height: 40px;
  background-color: #ecebeb;
  border-right: 1px solid rgb(197, 195, 195);

  display: flex;
  align-items: center;
}
.playicon {
  height: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.playicon img {
  height: 20px;
}
.playname {
  padding: 0 5px 0 10px;
}
.totle {
  font-size: 10px;
  color: #b4b3b3;
}
.musiclist_table {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.musiclist_item {
  width: calc((100% - 1px) / 2);
  height: 2%;
  display: flex;
  border-right: 1px solid rgb(197, 195, 195);
  align-items: center;
}
.active {
  background-color: #ecebeb;
}
.num {
  width: 30px;
  text-align: center;
  height: 100%;
  line-height: 50px;
}
.songInfo {
  width: 80%;
  padding: 5px 0;
  /* height: calc(100% - 10px); */
}
.songname {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
}
.artname {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 11px;
  color: rgb(142, 143, 143);
}
button {
  background: transparent;
  border: none !important;
  font-size: 0;
}
.moreicon img {
  height: 18px;
  padding: 10px 0;
}
.moreicon {

   float: right;
  padding: 0 20px;
}
.popover_content {
  height: 40px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  /* align-content: center; */
  /* text-align: center; */
  justify-items: center;
  justify-content: center;
}
.card1 {
  height: 26px;
  padding-bottom: 2px;
  border-bottom: 1px solid rgb(112, 110, 110);
}
.card2 {
  height: 40px;
  border-bottom: 1px solid rgb(112, 110, 110);
}
.card3 {
  padding-top: 5px;
  height: 23px;
}
.popover_content img {
  height: 20px;
  padding-right: 10px;
}
</style>