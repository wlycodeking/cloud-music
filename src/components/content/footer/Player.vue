<template>
  <transition name="slide">
    <div class="player">
      <div class="top">
        <div class="downicon">
          <img
            src="~assets/img/icon/player/godown.png"
            alt=""
            @click="Hidden"
          />
        </div>
        <div class="share">
          <img src="~assets/img/icon/player/share.png" alt="" />
        </div>
      </div>
      <div class="container">
        <div class="left"></div>
        <div class="right">
          {{ music.title }}
          <div><Lyric :lyric="lyric" ref="playerLyric" /></div>
          
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import Lyric from "./Lyric";
export default {
  name: "Player",
  components: {
    Lyric,
  },
  props: {
    music: {
      type: Object,
      default() {
        return {};
      },
    },
    lyric: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.music);
    console.log(this.lyric);
  },
  watch: {
    lyric() {
      if(this.$refs.playerLyric.$refs.scroll != null) {
        this.$refs.playerLyric.$refs.scroll.scrollTo(0, 0, 0);
      }
    }
  },
  methods: {
    Hidden() {
      this.$emit("Hidden");
    },
  },
};
</script>


<style scoped>
.player {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: pink;
  z-index: 99;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
  transform: none;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}

.top {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.downicon,
.share {
  padding: 10px 20px 0 20px;
}
.downicon img {
  width: 25px;
}
.share img {
  width: 25px;
}

.container {
  display: flex;
  width: 100%;
  height: calc(100% - 40px);
}
.left {
  flex: 1;
}
.right {
  background-color: #000;
  color: #fff;
  flex: 1;
}
</style>