<template>
  <div class="albumlist" v-if="album != null && songlist != null">
    <div class="title_bar">
      <div class="back" @click="Back()">
        <img src="~assets/img/icon/back/back.png" alt="" />
      </div>
      {{ album.name }}
    </div>
    <scroll class="albumScroll">
      <album-info :album="album" />
      <div class="playall">
        <div class="playicon" @click="PlayMusic">
          <img src="~assets/img/icon/play/play.png" alt="" />
        </div>
        <div class="playname">播放全部</div>
        <div class="totle">(共{{ album.size }}首)</div>
      </div>
      <play-list :songlist="songlist" @musicItemClick="PlayMusic" />
     
    </scroll>
  </div>
</template>


<script>
import PlayList from "views/musiclist/childComps/PlayList";

import AlbumInfo from "./childComps/AlbumInfo";
import Scroll from "components/common/scroll/Scroll";

import { PlayMixin } from "common/PlayMixin";

import { _getAlbum } from "network/album";
import { songDetail, _getSongDetail } from "network/musiclist";

export default {
  name: "AlbumDetail",
  components: { AlbumInfo, PlayList, Scroll },
  mixins: [PlayMixin],
  data() {
    return {
      id: 0,
      album: null,
      songlist: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    _getAlbum(this.id).then((res) => {
      this.album = res.data.album;
      for (let i of res.data.songs) {
        _getSongDetail(i.id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.songlist.push(song);
        });
      }
    });
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>


<style scoped>
.albumlist {
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
  letter-spacing: 0px;
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
.albumScroll {
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