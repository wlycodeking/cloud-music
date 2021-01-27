<template>
  <div class="desc" v-if="artdesc != null&&artist!=null">
    <div class="resume">
      <div class="title">
        <div class="icon"><img src="~assets/img/icon/artist/colum.png" alt=""></div>
        <div class="artname">{{ artist.name }}简介</div>
      </div>
      
      <div class="info" v-html="artdesc.briefDesc" ></div>
    </div>
    <div class="introduction" v-for="(item,index) in artdesc.introduction" :key="index">
      <div class="title">
        <div class="icon"><img src="~assets/img/icon/artist/colum.png" alt=""></div>
        <div class="artname">{{ item.ti }}</div>
      </div>
      <div class="info" v-html="item.txt" ></div>
    </div>
  </div>
</template>


<script>
import { _getArtdesc, _getArtists } from "network/artist";
export default {
  name: "Detail",
  components: {},
  data() {
    return {
      id: 0,
      artdesc: null,
      artist: null,
    };
  },
  created() {
    this.id = this.$route.params.key;
    _getArtdesc(this.id).then((res) => {
      console.log(res.data);
      this.artdesc = res.data;
    });
    _getArtists(this.id).then((res) => {
      this.artist = res.data.artist;
    });
  },
  methods: {},
};
</script>


<style scoped>
.desc {
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  font-size: 15px;
}
.artname {
  font-size: 18px;
  font-weight: 600;
}
.icon{
  width: 20px;
  height: 20px;
}
.icon img{
  height: 100%;
}
.title{
  display: flex;
  align-content: center;
  align-items: center;
  /* padding-bottom: 10px; */
}
.info{
white-space: pre-line;
padding: 10px 10px 30px 10px;
}
</style>