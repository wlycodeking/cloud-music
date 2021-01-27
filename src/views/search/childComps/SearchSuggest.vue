<template>
  <div class="suggest" v-if="keywords != null">
    <scroll class="suggest_scroll">
      <div class="title">搜索"{{ keywords }}"</div>
      <div class="title" v-if="sugSongs != null">歌曲：</div>
      <div
        class="suggest_item"
        v-for="(item, index) in sugSongs"
        :key="'song-' + index"
        @click="SongsInfo(item.name)"
      >
        <img
          src="~assets/img/icon/search/search.png"
          alt=""
          class="searchicon"
        />
        {{ item.name }}
      </div>
      <div class="title" v-if="sugArtist != null">歌手：</div>
      <div
        class="suggest_item"
        v-for="(item, index) in sugArtist"
        :key="'artist-' + index"
        @click="ArtistInfo(item.id,item.name)"
      >
        <img
          src="~assets/img/icon/search/search.png"
          alt=""
          class="searchicon"
        />
        {{ item.name }}
      </div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import { _getSuggestSearch } from "network/search";
export default {
  name: "SearchSuggest",
  components: {
    Scroll,
  },
  props: {
    keywords: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      sugSongs: null,
      sugArtist: null,
      sugAlbum: "",
    };
  },

  watch: {
    keywords() {
      if (this.keywords != "") {
        this.suggest();
      }
    },
  },
  methods: {
    suggest() {
      _getSuggestSearch(this.keywords).then((res) => {
        this.sugSongs = res.data.result.songs;
        this.sugArtist = res.data.result.artists;
      });
    },
    SongsInfo(key) {
      this.$router.push("/searchInfo/" + key);
      this.$emit('SongsInfo',key);
    },
    ArtistInfo(id,name) {
      this.$router.push("/artist/" + id);
      this.$emit('ArtistInfo',name);
    },
  },
};
</script>


<style scoped>
.suggest {
  position: absolute;
  top: 50px;
  left: 70px;
  width: calc(100% - 150px);
  /* background-color: rgb(187, 59, 59); */
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #d6d6d6;
}

.suggest_scroll {
  width: 100%;
  height: 100%;
}
.title {
  /* width: calc(100% - 9px); */
  height: 35px;
  background-color: rgb(226, 226, 226);
  /* border-bottom: 1px solid #000; */
  line-height: 35px;
  padding-left: 10px;
}
.suggest_item {
  width: calc(100% - 10px);
  height: 35px;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid #d6d6d6;
  line-height: 35px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.searchicon {
  width: 20px;
  /* padding: 10px 5px 0 0 ; */
  padding-right: 10px;
}
</style>