<template>
  <div class="ranklist" v-if="all.length!=0">
    <scroll class="scroll">
      <div class="cloudtop">
        <div class="top_title">
          <img src="~assets/img/icon/artist/colum.png" alt="">
          云音乐官方榜
        </div>
        <div class="top_list_c">
          <div class="top_item_c" v-for="(item,index) in cloudtop" :key="index">
            <div class="imgdiv" @click="RouterCloud(index)">
            <img :src="item.coverImgUrl" alt="">
            <div class="update">{{item.updateFrequency}}</div>
            </div>
            <div class="top_song">
              <topthree :id="item.id"/>
            </div>
          </div>
        </div>
      </div>
      <div class="globaltop">
        <div class="top_title">
          <img src="~assets/img/icon/artist/colum.png" alt="">
          全球榜
        </div>
        <div class="top_list_c">
          <div class="top_item_g" v-for="(item,index) in globaltop" :key="index">
            <div class="imgdiv" @click="RouterGlobal(index)">
            <img :src="item.coverImgUrl" alt="">
            
            </div>
            <div class="item_name">{{item.name}}</div>
            
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
import Topthree from "../childComps/ranklist/Topthree"

import Scroll from "components/common/scroll/Scroll";

import { _getTopList} from "network/discover";
  export default {
    name: "MusicRankList",
    components: {
      Topthree,
Scroll
    },
    data () {
     return {
       all:[],
       cloudtop:[],
       globaltop:[]
     }
    },
    created(){
      _getTopList().then(res=>{
        this.all=res.data.list;
        this.cloudtop=this.all.slice(0,4);
        console.log(this.cloudtop);
        this.globaltop=this.all.splice(4);
        console.log(this.globaltop);
      })
    },  
    methods:{
       RouterCloud(index) {
      this.$router.push("/musiclist/" + this.cloudtop[index].id);
    },
    RouterGlobal(index){
            this.$router.push("/musiclist/" + this.globaltop[index].id);

    }
    }
  }
</script>


<style scoped>
.ranklist
{
  width: 100%;
  height: 100%;
}
.scroll{
  width: 100%;
  height: 100%;
}
.cloudtop{
  margin-bottom: 30px;
}
.top_title{
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  font-size: 17px;
  font-weight: 550;
}
.top_title img{
  width: 20px;
}
.top_list_c{
  width: 100%;
  display: flex;
  flex-wrap: wrap;

}
.top_item_c{
  width: 50%;
  padding-bottom: 10px;
  display: flex;
}
.top_item_c img{
  width: 150px;
}
.top_song{
  width: 60%;
  height: 100%;
}
.imgdiv{
  position: relative;
}
.update{
  position: absolute;
  top: 130px;
  left: 4px;
  font-size: 12px;
  color: #fff;
  letter-spacing: 1px;
  
}
.top_item_g{
  padding: 10px;
}
.top_item_g img{
  width: 150px;
}
.item_name{
  width: 150px;
  overflow: hidden;
  font-size: 14px;
}
</style>