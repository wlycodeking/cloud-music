<template>
  <div class="recommend">
    <scroll class="recommend-scroll">
      <!-- 轮播图 -->
      <div class="swiperComp">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in swiper" :key="index">
            <img
              class="medium swiperImg"
              :src="item.imageUrl"
              alt=""
              @click="PlaySwiper(index)"
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 推荐歌单 -->
      <recommend-list :musiclist="musiclist" />
      <private-content :privatelist="privatelist" />
      <new-song :newSong="newSong" @playMusic="playMusic" />
      <recommend-mv :recommendMv="recommendMv"/>
    </scroll>
  </div>
</template>


<script>
import RecommendList from "../childComps/recommend/RecommendList";
import PrivateContent from "../childComps/recommend/PrivateContent";
import NewSong from "../childComps/recommend/NewSong";
import RecommendMv from "../childComps/recommend/RecommendMv";

import Scroll from "components/common/scroll/Scroll";

import {
  _getBanner,//轮播图
  _getPersonalized,//推荐歌单
  _getPrivateContent,//独家放送
  _getNewSong,//最新歌曲
  _getRecommendMv,//推荐mv
} from "network/discover";
import { _getSongDetail, songDetail } from "network/musiclist";

import { PlayMixin } from "common/PlayMixin";

export default {
  name: "Recommend",
  components: {
    RecommendList,
    PrivateContent,
    NewSong,
    RecommendMv,

    Scroll,
  },
  mixins: [PlayMixin],
  data() {
    return {
      swiper: [],//轮播图
      musiclist: [],//推荐歌单
      privatelist: [],//独家放送
      newSong: [],//最新歌曲
      recommendMv:[],//推荐mv

      songlist: [],//播放列表

    };
  },
  created() {
    _getBanner().then((res) => {
      this.swiper = res.data.banners;
      // 过滤掉没有url的swiper

      // for (var i = 0; i < this.swiper.length; i++) {
      //   _getSongDetail(this.swiper[i].encodeId).then((res) => {
      //     let yy = res.data;
      //     if (yy.songs[0] == null) {
      //       yy.splice(i, 1);
      //     }

      //     console.log(res.data);
      //   });
      // }
    });
    _getPersonalized().then((res) => {
      this.musiclist = res.data.result;
    });
    _getPrivateContent().then((res) => {
      this.privatelist = res.data.result;
    });
    _getNewSong().then((res) => {
      this.newSong = res.data.result;
    });
    _getRecommendMv().then((res)=>{
      this.recommendMv=res.data.result;
    })
  },
  methods: {
    playMusic(index) {
      this.songlist = [];
      for (let i in this.newSong) {
        _getSongDetail(this.newSong[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.songlist.push(song);
          if (i == this.newSong.length - 1) {
            this.PlayMusic(index);
          }
        });
      }
    },
    PlaySwiper(index) {
      this.songlist = [];
      // console.log(index);
      // console.log(this.swiper);
      for (let i in this.swiper) {
        _getSongDetail(this.swiper[i].encodeId).then((res) => {
          // console.log(res.data);
          // let yy = res.data;
          // if (yy.songs[0] == null) 
          //   yy.splice(i, 1);
          // }
          let song = new songDetail(res.data.songs);
          // console.log(song);
          this.songlist.push(song);
          if (i == this.newSong.length - 1) {
            this.PlayMusic(index);
          }
        });
      }
    },
  },
};
</script>


<style scoped>
.recommend {
  width: 100%;
  height: 100%;
}
.recommend-scroll {
  width: 100%;
  height: 100%;
}
.swiperComp {
  padding-bottom: 20px;
  width: 100%;
}

.swiperImg {
  height: 100%;
  width: 100%;
}
.el-carousel {
  width: 100%;
}


</style>