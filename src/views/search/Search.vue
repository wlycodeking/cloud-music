<template>
  <div class="search">
    <div class="search-bar">
      <div class="back-icon">
        <img
          src="~assets/img/icon/search/back.png"
          alt=""
          @click="RouterBack"
        />
      </div>
      <div class="search-input">
        <div class="icon_search">
          <img src="~assets/img/icon/search/search.png" alt="" />
        </div>
        <input
          class="search_input"
          type="text"
          @focus="suggestShow = true"
          @blur="suggestShow = false"
          v-model="keywords"
          placeholder="搜索音乐、歌词、歌手、用户"
          @keydown.enter="keyEnter()"
        />
      </div>
    </div>

    <search-hot
      :hotlist="hotlist"
      :keywords="keywords"
      :historylist="historylist"
      @clearHistory="clearHistory"
    />
    <search-suggest :keywords="keywords" v-show="suggestShow" @SongsInfo="SongsInfo" @ArtistInfo="ArtistInfo"/>
  </div>
</template>


<script>
import SearchHot from "./childComps/SearchHot";
import SearchSuggest from "./childComps/SearchSuggest";

import { _getHotSearch } from "network/search";

export default {
  name: "Search",
  components: { SearchHot, SearchSuggest },
  data() {
    return {
      keywords: null,
      hotlist: null,
      suggestShow: false,
      historylist: [
        { searchWord: "薛之谦" },
        { searchWord: "周杰伦" },
        { searchWord: "蔡徐坤" },
      ],
    };
  },
  created() {
    _getHotSearch().then((res) => {
      this.hotlist = res.data.data;
      this.hotlist = this.hotlist.slice(0, 10);
    });
  },
  methods: {
    SongsInfo(key){
      let keywordsL = {
          searchWord: key,
        };
        this.historylist.push(keywordsL);
    },
    ArtistInfo(name){
      let keywordsL = {
          searchWord: name,
        };
        this.historylist.push(keywordsL);
    },
    RouterBack() {
      this.$router.push("/discover/recommend");
    },
    keyEnter() {
      if (this.keywords != null) {
        this.$router.push("/searchInfo/" + this.keywords);
        let keywordsL = {
          searchWord: this.keywords,
        };
        this.historylist.push(keywordsL);
        console.log(this.historylist);
      }
    },
    clearHistory() {
      this.historylist = [];
    },
  },
};
</script>


<style scoped>
.search {
  width: calc(100% - 40px);
  height: calc(100% - 20px);
  padding: 20px 20px 0 20px;
  position: relative;
}
.search-bar {
  width: 100%;
  /* height: 100%; */
  display: flex;
}
.back-icon {
  width: 22px;
  height: 22px;
  padding-top: 3px;
}
.back-icon img {
  width: 22px;
}
.search-input {
  margin-left: 25px;
  width: calc(100% - 100px);
  background-color: rgb(231, 231, 231);
  display: flex;
  border-radius: 20px;
  /* align-items: center; */
}
.search-input input {
  width: 90%;
}
.search_input {
  background-color: transparent;
  outline-style: none;
  border: rgb(231, 231, 231);
}

.icon_search {
  width: 20px;
  padding: 0 10px;
}
.icon_search img {
  padding-top: 4px;
  width: 20px;
}
</style>