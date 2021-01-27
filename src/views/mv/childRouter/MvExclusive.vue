
<template>
  <div class="mvExclu">
    <scroll class="scroll">
      <div class="exclusive_mv">
        <div class="item" v-for="(item, index) in ExclusiveMv" :key="index" @click="RouterMv(index)">
          <div class="img">
            <img :src="item.cover" alt="" />
            <div class="play-icon">
              <div class="num-icon">
                <img src="~assets/img/icon/more/video.png" alt="" />
              </div>
              <div class="num">{{ Math.round(item.playCount / 10000) }}万</div>
            </div>
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import { _ExclusiveMv } from "network/mv";
export default {
  name: "MvExclusive",
  components: {
    Scroll,
  },
  data() {
    return {
      ExclusiveMv: [],
    };
  },
  created() {
    _ExclusiveMv().then((res) => {
      this.ExclusiveMv = res.data.data;
      console.log(this.ExclusiveMv);
    });
  },
  methods: {
    RouterMv(index){
        this.$router.push('/MV/'+this.ExclusiveMv[index].id)
      }
  },
};
</script>


<style scoped>
.mvExclu {
  width: 100%;
  height: 100%;
}
.scroll {
  width: 100%;
  height: 100%;
}
.exclusive_mv {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 29%;
  padding: 10px;
}
.item img {
  width: 100%;
}
.name {
  font-size: 14px;
}
.img{
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