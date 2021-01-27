<template>
  <div class="searchinfo" v-if="songs!=null">
    <div class="title_bar">
      <div class="back" @click="Back()">
        <img src="~assets/img/icon/back/back.png" alt="" />
      </div>
      {{ keywords }}
    </div>
    <scroll class="search_scroll">
     <div class="best">最佳匹配：</div>
      <play-list :songlist="songlist" @musicItemClick="PlayMusic" />
    </scroll>
  </div>
  <div v-else class="else">
    很抱歉，未能找到与“{{keywords}}”匹配的内容,请点击<a href="/Search">返回</a>回到搜索界面
  </div>
</template>


<script>
import PlayList from "views/musiclist/childComps/PlayList";

import Scroll from "components/common/scroll/Scroll";

import { PlayMixin } from "common/PlayMixin";

import { _getSearch } from "network/search";
import { _getSongDetail } from "network/musiclist";
import { songDetail } from "network/musiclist";
export default {
  name: "SearchInfo",
  components: {
    Scroll,
    PlayList,
  },
  mixins: [PlayMixin],
  data() {
    return {
      keywords: "",
      songs: null,
      songlist: [],
    };
  },
  created() {
    this.keywords = this.$route.params.key;
    _getSearch(this.keywords).then((res) => {
      this.songs = res.data.result.songs;
      for (let i of this.songs) {
        _getSongDetail(i.id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.songlists = res.data;
          this.songlist.push(song);
          this.songlist = this.songlist.slice(0, 50);
        });
      }
    });
  },
  methods: {Back(){
        this.$router.go(-1)
      },},
};
</script>


<style scoped>
.searchinfo {
  width: 100%;
  height: 100%;
 
}
.search_scroll {
  width: 100%;
  height: calc(100% - 50px); overflow: hidden;
}
.title_bar{
    height: 50px;
    width: 100%;
    background-color: rgb(243, 132, 132);
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    /* letter-spacing: px; */

  }
  .back{
    float: left;
    height: 50px;
    display: flex;
    align-items: center;
  }
  .back img{
    width: 25px;
  }
  .best{
    height: 40px;
    line-height: 40px;
    background-color: rgba(196, 197, 199, 0.726);
    padding-left: 20px;
    font-size: 16px;
  }
</style>