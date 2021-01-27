<template>
  <div v-if="mvlist.length != 0" class="mvlist">
    <div class="item" v-for="(item, index) in mvlist" :key="index">
      <div class="item_img" @click="RouterMv(index)">
        <img :src="item.cover" alt="" />
        <div class="play-icon">
          <div class="num-icon">
            <img src="~assets/img/icon/more/video.png" alt="" />
          </div>
          <div class="num" v-if="item.playCount>10000">{{ Math.round(item.playCount / 10000) }}万</div>
          <div class="num" v-else>{{ item.playCount }}</div>
        </div>
      </div>
      <div class="name">
        {{item.name}}
      </div>
      <div class="artist">
        {{item.artistName}}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "AllMvList",
  components: {},
  props: {
    mvlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    RouterMv(index){
      this.$router.push('/MV/'+this.mvlist[index].id)
    }
  },
};
</script>


<style scoped>
.mvlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 22%;
  padding: 10px;
}
.item_img {
  width: 100%;
  position: relative;
}
.item_img img {
  width: 100%;
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

.name{
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.artist{
  font-size: 12px;
  color: #a09e9e;
}
</style>