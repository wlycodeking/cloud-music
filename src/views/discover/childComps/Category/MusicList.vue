<template>
  <div class="musiclist">
    <div class="music_item" v-for="(item, index) in musiclist" :key="index" @click="RouterDetail(index)">
      <div class="item_img">
        <img :src="item.coverImgUrl" alt="" />
        <div class="count">
          <div class="count_image">
            <img src="~assets/img/icon/count/playcount.png" alt="" />
          </div>
          <div class="count_number" v-if="item.playCount < 100000000">
            {{ Math.round(item.playCount / 10000) }}万
          </div>
          <div class="count_number" v-else>
            {{ Math.round(item.playCount / 100000000) }}亿
          </div>
        </div>
      </div>
      {{ item.name }}
    </div>
  </div>
</template>


<script>
export default {
  name: "MusicList",
  components: {},
  props: {
    musiclist: {
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
   RouterDetail(index) {
      this.$router.push("/musiclist/" + this.musiclist[index].id);
    },
  },
};
</script>


<style scoped>
.musiclist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.music_item {
  width: 150px;
  padding: 10px;
  font-size: 13px;
}
.item_img {
  position: relative;
}
.item_img img {
  width: 150px;
}
.count {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 50%;
  height: 10%;
  background: linear-gradient(to left, #0000008a, #00000000);
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
}
.count_image {
  padding-right: 3px;
}
.count_image img {
  height: 15px;
  width: 15px;
}
.count_number {
  padding-right: 3px;
  color: #fff;
}
</style>