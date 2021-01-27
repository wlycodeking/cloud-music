<template>
  <div class="topmv" v-if="topmv.length!=0">
    <div class="topmv-list">
      <div
        class="topmv-item"
        v-for="(item, index) in topmv"
        :key="index"
        :class="{ action: index == actionIndex[index], active: index % 2 == 0 }" 
        @click="RouterMv(index)"
      >
        <div class="number">{{ index + 1 }}</div>
        <div class="play-img">
          <img :src="item.cover" alt="" />
          <div class="play-icon">
            <div class="num-icon"><img src="~assets/img/icon/more/video.png" alt=""></div>
            <div class="num">{{Math.round(item.playCount/10000)}}万</div>
          </div>
        </div>
        <div class="name">
          <div class="songname">
            {{item.name}}
          </div>
          <div class="singername">
            {{item.artistName}}
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
import { _TopMv} from "network/mv";
  export default {
    name: "TopMv",
    components: {

    },
    data () {
     return {
       actionIndex: [0, 1, 11, 12, 4, 5, 14, 15, 8, 9],
       topmv:[],
     }
    },
    created(){
      _TopMv().then(res=>{
        this.topmv=res.data.data;
        // console.log(this.topmv);
      })
    },
    methods:{
      RouterMv(index){
        this.$router.push('/MV/'+this.topmv[index].id)
      }
    }
  }
</script>


<style scoped>


.topmv-list {
  width: 100%;
  margin-top: 10px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-top: 1px solid rgba(216, 212, 212, 0.76);
  border-bottom: 1px solid rgba(216, 212, 212, 0.76);
}
.topmv-item {
  width: calc((100% - 3px) / 2);
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(216, 212, 212, 0.76);
}
.action {
  background-color: rgb(240, 239, 239);
}
.active {
  border-left: 1px solid rgba(216, 212, 212, 0.76);
}
.topmv-item img {
  height: 80px;
}
.number {
  width: 40px;
  text-align: center;
  color: rgb(83, 83, 83);
}
.name {
  margin-left: 10px;
  width: 50%;
  
}
.songname {
 white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
}
.singername {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  padding-top: 3px;
  color: rgb(175, 173, 173);
}


.play-img{
  position: relative;
}
.play-icon{
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