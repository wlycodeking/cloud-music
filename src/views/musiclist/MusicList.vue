<template>
  <div class="musiclist" v-if="musiclistdetail != null">
    <Dialog v-show="showDialog" @CloseDialog="CloseDialog"/>
    <div class="title_bar">
      <div class="back" @click="Back()">
        <img src="~assets/img/icon/back/back.png" alt="" />
      </div>
      歌单
    </div>
    <scroll class="musiclistScroll">
      <base-info
        :baseInfo="baseInfo"
        :playlist="musiclistdetail.playlist"
        @OpenDialog="OpenDialog"
        
      />
      <div class="playall">
        <div class="playicon" @click="PlayMusic">
          <img src="~assets/img/icon/play/play.png" alt="" />
        </div>
        <div class="playname">播放全部</div>
        <div class="totle">(共{{ this.songlist.length }}首)</div>
      </div>
      <play-list :songlist="songlist" @musicItemClick="PlayMusic" />
    </scroll>
  </div>
</template>


<script>
import Dialog from "./childComps/Dialog"
import BaseInfo from "./childComps/BaseInfo";
import PlayList from "./childComps/PlayList";

import Scroll from "components/common/scroll/Scroll";

import { _getMusicListDetail, _getSongDetail } from "network/musiclist";

import { baseInfo, songDetail } from "network/musiclist";

import { PlayMixin } from "common/PlayMixin";
export default {
  name: "MusicList",
  components: {
    BaseInfo,
    PlayList,
    Dialog,

    Scroll,
  },
  mixins: [PlayMixin],
  data() {
    return {
      id: 0,
      musiclistdetail: null,
      baseInfo: null,
      songlist: [],
      songlists: [],
      showDialog:false
    };
  },
  created() {
    this.id = this.$route.params.id;
    _getMusicListDetail(this.id).then((res) => {
      this.musiclistdetail = res.data;
      console.log(this.musiclistdetail);
      // this.musiclistdetail.playlist.trackIds=this.musiclistdetail.playlist.trackIds.slice(0,50);
      // console.log(this.musiclistdetail.playlist.trackIds);
      this.baseInfo = new baseInfo(this.musiclistdetail.playlist);
      for (let i of this.musiclistdetail.playlist.trackIds.slice(0, 50)) {
        _getSongDetail(i.id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.songlists = res.data;
          this.songlist.push(song);
          // this.songlist=this.songlist.slice(0,50);
        });
      }
    });

    // console.log(this.songlist);
    // // this.songId=
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    OpenDialog() {
      this.showDialog=true
    },
    CloseDialog() {
      this.showDialog=false
    },
  },
};
</script>


<style scoped>
.musiclist {
  width: 100%;
  height: 100%;
}
.title_bar {
  height: 50px;
  width: 100%;
  background-color: rgb(243, 132, 132);
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 30px;
}
.back {
  float: left;
  height: 50px;
  display: flex;
  align-items: center;
}
.back img {
  width: 25px;
}

.musiclistScroll {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
}

.playall {
  display: flex;
  height: 40px;
  align-content: center;
  align-items: center;
}
.playicon {
  height: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.playicon img {
  height: 60%;
}
.playname {
  padding: 0 5px 0 15px;
}
.totle {
  font-size: 10px;
  color: #b4b3b3;
}
</style>