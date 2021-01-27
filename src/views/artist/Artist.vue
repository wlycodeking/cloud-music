<template>
  <div class="artist" v-if="artist != null&&id!=0">
    <!-- <div class="tabbar">{{ artist.name }}</div> -->
    <div class="title_bar">
      <div class="back" @click="Back()">
        <img src="~assets/img/icon/back/back.png" alt="" />
      </div>
      {{ artist.name }}
    </div>
    <scroll class="artist_scroll">
      <Face :artist="artist"/>
      <div class="router" >
        <router-view></router-view>
      </div>
    </scroll>
  </div>
  <div v-else style="display: flex">
    歌手未注册请
    <div @click="BackUp()" style="color: red">返回</div>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";
import Face from "./childComps/Face"

import { _getArtists } from "network/artist";
export default {
  name: "Artist",
  components: {
    Scroll,
    Face
  },
  data() {
    return {
      id: 0,
      artist: null,


    };
  },
  created() {
    this.id = this.$route.params.key;
    if(this.id!=0){
    _getArtists(this.id).then((res) => {
      // console.log(res);
      this.artist = res.data.artist;
    });
    }
  },
  methods: {
    Back() {
      this.$router.push('/discover/recommend')
    },
    BackUp(){
      this.$router.go(-1)
    }
  },
};
</script>


<style scoped>
 .artist {
  width: 100%;
  height: 100%;

}
.artist_scroll {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
}
.title_bar {
  height: 50px;
  width: 100%;
  background-color: rgb(243, 132, 132);
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 10px;
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

/*
.artist_img {
  width: 100%;
  height: 210px;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  background-color: rgb(170, 169, 169);
}
.artist_img img {
  width: 100%;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(60px);
  height: 100%;
}
.baseinfo {
  position: absolute;
  width: 100%;
  height: 160px;
  display: flex;
}
.base_img {
  width: 130px;
  height: 130px;
  margin: 20px 20px 0 35px;
}
.base_img img {
  width: 100%;
  height: 100%;
}
.artist_info {
  margin-top: 30px;
}
.artist_name {
  font-size: 20px;
  font-weight: 600;
}
.oper {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.oper_title {
  height: 47px;
  width: 100px;
  text-align: center;
  line-height: 47px;
}
.router {
  position: absolute;
  top: 250px;
  width: 100%;
  height: calc(100% - 250px);
}
.action {
  border-bottom: 3px solid #000;
} */
</style>