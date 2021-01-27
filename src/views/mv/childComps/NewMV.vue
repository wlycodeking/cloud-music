<template>
  <div class="new_mv" v-if="newMvf.length!=0&&newMv.length!=0">
    <div class="mv-list1">
      <img :src="newMvf[0].cover" alt="" @click="RouterMv(-1)"/>
    </div>
    <div class="mv-list2">
      <div class="mv-item" v-for="(item, index) in newMv" :key="index" @click="RouterMv(index)">
      <img :src="item.cover" alt="" />
    </div>
    </div>
    
  </div>
</template>


<script>
import { _NewMv } from "network/mv";
export default {
  name: "NewMV",
  components: {},
  data() {
    return {
      newMvf: [],
      newMv: [],
    };
  },
  created() {
    _NewMv().then((res) => {
      this.newMvAll=res.data.data;
      this.newMv = res.data.data.slice(1, 5);
      this.newMvf = res.data.data.slice(0, 1);
    });
  },
  methods: {
    RouterMv(index){
      this.$router.push('/MV/'+this.newMvAll[index+1].id);
    }
  },
};
</script>


<style scoped>
.new_mv {
  width: 100%;
  margin-top: 10px;
  display: flex;
}
.mv-list1{
  flex: 1;
  height: 250px;
  width: 100%;
  /* padding: 20px; */
}
.mv-list1 img{
  height: 235px;
  width: 100%;
}
.mv-list2 {
flex: 1;
height: 250px;
display: flex;
padding-left: 10px;
justify-content: space-between;
/* flex-flow: column; */
flex-wrap: wrap;
}
.mv-item{
  width: 50%;
  height: 125px;
  overflow: hidden;
}
.mv-item img{
  height: 110px;
   width: 95%;
}
</style>