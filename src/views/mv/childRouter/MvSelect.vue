<template>
  <div class="select">
    <scroll class="scroll">
    <div class="new_mv">
      <more-title :ListTitle="newmvname" @MoreRouter="allMVRouter" />
      <NewMV/>
    </div>
    <div class="topmv">
      <more-title :ListTitle="topmvname" @MoreRouter="allMVRouter" />
      <top-mv/>
    </div>
    </scroll>
  </div>
</template>


<script>
import MoreTitle from "components/content/moreTitle/MoreTitle";
import NewMV from "../childComps/NewMV"
import TopMv from "../childComps/TopMv"

import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "MvSelect",
    components: {
MoreTitle,
NewMV,
TopMv,
Scroll
    },
    data () {
     return {
       newmvname: "最新音乐",
       topmvname:"mv排行榜"
     }
    },
    methods:{
      allMVRouter(){
        this.$router.push('/MV/MvAll');
      }
    }
  }
</script>


<style scoped>
.select{
  width: 100%;
  height: 100%;
}
.scroll{
  width: 100%;
  height: 100%;
}
.topmv{
  margin-top: 20px;
}
</style>