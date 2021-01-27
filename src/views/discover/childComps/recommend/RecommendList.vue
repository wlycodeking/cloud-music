<template>
  <div class="recommend-list">
    <more-title :ListTitle="ListTitle" @MoreRouter="RecommendRouter"/>
    <div class="music_category">
      <div
        class="music_item"
        v-for="(item, index) in musiclist"
        :key="index"
        @click="RouterDetail(index)"
      >
        <img :src="item.picUrl" alt="" />
        <div class="item_name">{{ item.name }}</div>
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
    </div>
  </div>
</template>


<script>
import MoreTitle from "components/content/moreTitle/MoreTitle"

export default {
  name: "RecommendList",
  components: {MoreTitle},
  props: {
    musiclist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {

      ListTitle:'推荐歌单'
    };
  },
  created() {

  },
  methods: {
    RecommendRouter() {
      this.$router.push("./category");
    },
    RouterDetail(index) {
      this.$router.push("/musiclist/" + this.musiclist[index].id);
    },
    Sswr(num) {},
  },
};
</script>


<style scoped>
.recommend-list {
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
}
.title {
  position: relative;
  display: flex;
}
.title_name {
  flex: 1;
}
.title_more {
  flex: 1;
  position: absolute;
  right: 0;
  bottom: 2px;
  font-size: 12px;
  color: rgb(141, 141, 135);
}

.music_category {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.music_item {
  position: relative;
  width: 17%;
  height: 17%;
  padding: 10px;
  font-size: 12px;
}
.music_item img {
  width: 100%;
}
.item_name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.count {
  position: absolute;
  top: 15px;
  left: 10px;
  width: calc(100% - 20px);
  height: 10%;
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