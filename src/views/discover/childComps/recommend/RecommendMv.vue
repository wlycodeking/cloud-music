<template>
  <div class="recommend-mv" v-if="recommendMv!=null">
    <more-title :ListTitle="ListTitle" @MoreRouter="MVRouter"/>
    <div class="recommend-mv-list" >
      <div class="recommend-mv-item" v-for="(item,index) in recommendMv" :key="index" @click="MvDetailRouter(index)">
        
          <img :src="item.picUrl" alt="">
          <div class="mv-name">{{item.name}}</div>
          <div class="mv-num">
            <div class="num-icon"><img src="~assets/img/icon/more/video.png" alt=""></div>
            <div class="num">{{item.playCount}}</div>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
import MoreTitle from "components/content/moreTitle/MoreTitle";


  export default {
    name: "RecommendMv",
    components: {
MoreTitle
        
    },
    props: {
    recommendMv: {
      type: Array,
      default() {
        return [];
      },
    },
  },
    data () {
     return {
       ListTitle:'推荐MV'
     }
    },

    methods:{
      MVRouter(){
        this.$router.push("/MV/MvSelect")
      },
      MvDetailRouter(index){
        console.log(this.recommendMv[index].name);
        this.$router.push('../MV/'+this.recommendMv[index].id)
      }
    }
  }
</script>


<style scoped>
.recommend-mv{
  width: 100%;
  height: 100%;
}
.recommend-mv-list{
  width: 100%;
  display: flex;
  justify-content: space-between;
    margin-top: 20px;
}
.recommend-mv-item{
  width: 23%;
  position: relative;
}
.recommend-mv-item img{
  width: 100%;
}
.mv-name{
  font-size: 14px;
}
.mv-num{
  background:linear-gradient(to left,#0000008a,#00000000);
  position: absolute;
  top: 0;
  right: 0;
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