<template>
  <div>
    <div class="bgcimg">
      <img :src="artist.img1v1Url" alt="" />
    </div>
    <div class="baseinfo">
      <div class="base_img">
        <img :src="artist.img1v1Url" alt="" />
      </div>
      <div class="artist_info">
        <div class="artist_name">{{ artist.name }}</div>
      </div>
    </div>
    <div class="oper">
      <div
        class="oper_title"
        v-for="(item, index) in list"
        :key="index"
        :class="{ action: currentIndex == index }"
        @click="setCurrent(index)"
      >
        {{ item }}
      </div>
      
    </div>
  </div>
</template>


<script>
export default {
  name: "Face",
  components: {},
  props: {
    artist: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      list: ["热门50单曲", "专辑", "相关MV", "歌手信息"],
      currentIndex: 0,
      id: 0,
      
    };
  },
  created() {
    this.id = this.$route.params.key;
  },
  methods: {
    setCurrent(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/artist/HotFif/" + this.id);
          break;
        // console.log(index);
        case 1:
          // console.log(index);
          this.$router.push("/artist/Album/" + this.id);
          break;
        case 2:
          this.$router.push("/artist/Mv/" + this.id);
          break;
        case 3:
          this.$router.push("/artist/Detail/" + this.id);
          break;
      }
    },
  },
};
</script>


<style scoped>
.bgcimg {
  width: 100%;
  height: 210px;
  position: absolute;
  left: 0;
  z-index: -1;
  overflow: hidden;
  background-color: rgb(170, 169, 169);
}
.bgcimg img {
  width: 100%;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(60px);
}
.baseinfo {
  /* position: absolute; */
  width: 100%;
  height: 160px;
  display: flex;
}
.base_img {
  width: 130px;
  height: 130px;
  margin: 20px 20px 0 35px;
}
.base_img img {
  width: 100%;
  height: 100%;
}
.artist_info {
  margin-top: 30px;
}
.artist_name {
  font-size: 20px;
  font-weight: 600;
}
.oper {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.oper_title {
  height: 47px;
  width: 100px;
  text-align: center;
  line-height: 47px;
}
.router {
  position: absolute;
  top: 250px;
  width: 100%;
  height: calc(100% - 250px);
}
.action {
  border-bottom: 3px solid #000;
}
</style>