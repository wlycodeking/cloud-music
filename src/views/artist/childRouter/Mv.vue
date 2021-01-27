<template>
  <div class="mv" v-if="artmv!=null">
    <div class="mv_list">
      <div class="mv_item" v-for="(item, index) in artmv" :key="index" @click="MvDetailRouter(index)">
        <img :src="item.imgurl" alt="" />
        <div class="mv_name">{{ item.name }}</div>
        <div class="mv-num">
          <div class="num-icon">
            <img src="~assets/img/icon/more/video.png" alt="" />
          </div>
          <div class="num">{{ item.playCount }}</div>
        </div>
        <!-- <div class="album_time">{{format(item.publishTime)}}</div> -->
      </div>
    </div>
  </div>
</template>


<script>
import { _getArtMv } from "network/artist";
export default {
  name: "Mv",
  components: {},
  data() {
    return {
      id: 0,
      artmv: null,
    };
  },
  created() {
    this.id = this.$route.params.key;
    _getArtMv(this.id).then((res) => {
      console.log(res.data.mvs);
      this.artmv = res.data.mvs;
    });
  },
  methods: {
    MvDetailRouter(index){
        // console.log(this.recommendMv[index].name);
        this.$router.push('/MV/'+this.artmv[index].id)
      }
  },
};
</script>


<style scoped>
.mv {
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
}
.mv_list {
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content:space-between; */
  flex-wrap: wrap;
}
.mv_item {
  padding: 10px;
  width: 150px;
  /* height: 150px; */
    position: relative;
  overflow: hidden;
}
.mv_item img {
  width: 150px;

}
.mv_name {
  font-size: 15px;
  width: 150px;
  overflow: hidden;
  text-align: center;
}
.mv-num{
  background:linear-gradient(to left,#0000008a,#00000000);
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: end;
}
.num-icon{
  margin-left: auto;

  height: 20px;
  width: 20px;
  padding: 0 5px;
}
.num-icon img{


  height: 20px;
  width: 20px;
}
.num{
float: right;
margin-right: 5px;
color: #fff;
font-size: 12px;
text-align: center;
line-height: 20px;
}
</style>