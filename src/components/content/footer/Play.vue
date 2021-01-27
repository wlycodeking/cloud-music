<template>
  <div
    class="Play"
    v-if="playList !== null && musicList != null"
    v-loading="audio.waiting"
  >
    <Player :music="playList[currentIndex]" v-show="PlayerShow" @Hidden="Hidden" :lyric="Lyric"/>
    <transition name="fade"
      ><play-music-list
        class="play-music-list"
        transiton="fade"
        v-show="isShowPlayList"
        :musicList="musicList"
    /></transition>

    <audio
      :src="playList[currentIndex].src"
      ref="audio"
      autoplay
      @play="musicplay()"
      @pause="musicPause()"
      @ended="musicEnded()"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @playing="musicPlaying()"
    ></audio>
      <!-- @error="onError" -->
    <div class="pro">
      <div class="control">
        <div class="faceImg">
          <img :src="playList[currentIndex].pic" alt="" @click="ShowPlayer()"/>
        </div>
        <div class="controlIcon">
          <div class="pre" @click="preMusic()">
            <img src="~assets/img/icon/footer/pre.png" alt="" />
          </div>
          <div class="play" v-show="!isPlay">
            <img
              src="~assets/img/icon/footer/play.png"
              @click="Play()"
              alt=""
            />
          </div>
          <div class="pause" v-show="isPlay">
            <img
              src="~assets/img/icon/footer/pause.png"
              @click="Play()"
              alt=""
            />
          </div>
          <div class="next" @click="nextMusic()">
            <img src="~assets/img/icon/footer/next.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="middle">
      <div class="process">
        <div class="fir_floor">
        <div class="songinfo">
          {{ playList[currentIndex].title }}
          - {{ playList[currentIndex].artist }}
        </div>

        <div class="audio_time">
          {{ audio.currentTime | formatSecond }} /
          {{ audio.maxTime | formatSecond }}
        </div>
        </div>
        <el-slider
          v-model="sliderTime"
          :format-tooltip="formatProcessToolTip"
          :show-tooltip="false"
          @change="changeCurrentTime"
          v-show="isShowSlider"
          class="el_slider"
        ></el-slider>
      </div>
    </div>
    <div class="after">
      <div class="volume" v-if="volumeShow">
        <el-slider
          v-model="volume"
          @change="changeVolume"
          vertical
          height="100px"
          class="volume_slider"
        >
        </el-slider>
      </div>
      <div class="right_icon">
        <div class="volume_icon" @click="ShowVolume">
          <img
            src="~assets/img/icon/footer/volume--up.png"
            alt=""
            v-if="volume >= 50"
          />
          <img
            src="~assets/img/icon/footer/volume--down.png"
            alt=""
            v-if="volume > 0 && volume < 50"
          />
          <img
            src="~assets/img/icon/footer/volume--mute.png"
            alt=""
            v-if="volume == 0"
          />
        </div>
        <div class="play_order" @click="changeOrder">
          <img
            class="loop"
            src="~assets/img/icon/footer/loop.png"
            alt=""
            v-show="orderIndex == 0"
          />
          <img
            src="~assets/img/icon/footer/random.png"
            alt=""
            v-show="orderIndex == 1"
          />
          <img
            src="~assets/img/icon/footer/single_loop.png"
            alt=""
            v-show="orderIndex == 2"
          />
        </div>
        <div class="play_list" @click="ShowPlayList">
          <img
            style="width: 25px"
            src="~assets/img/icon/footer/playlist.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Player from "./Player"
import PlayMusicList from "./PlayMusicList";
import { audioMixin } from "./audioMixin";
import { realFormatSecond } from "./formatSecond";

export default {
  name: "Play",
  components: { PlayMusicList ,Player},
  mixins: [audioMixin],
  data() {
    return {
      value: 0,
      isPlay: false,
      playList: [
        {
          title: "",
          artist: "",
          index: "0",
          lrc: "",
          src: "",
          pic:
            "https://p1.music.126.net/iXfcMxrGisgh5Dxkc3HTFQ==/109951165393530790.jpg",
        },
      ],
      Lyric:"",//歌词
      isShowPlayList: false,
      PlayerShow:false,
      path: "",
      currentIndex: 0,
      musicList: [],
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: false,
        preload: "auto",
      },
      sliderTime: 0,
      volume: 100,
      volumeShow: false,
      orderIndex: 0,
    };
  },

  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
    this.$bus.$on("playMusic", (list, index, path, musicList) => {
      this.playList = [];
      this.path = path;
      this.playList = list;
      this.musicList = musicList;

      //   this.music = list.filter(item => {
      //     return item.src !== "";
      //   });
      /**对数组进行排序 不用也没事*/
      this.playList = this.playList.sort((a, b) => {
        return a.index - b.index;
      });
      // console.log(this.playList);
      /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
       * 用一次查找解决问题
       */
      // 不用播放总是播放第一首
      this.setCurrentIndex(index);
    });

    this.$bus.$on("PlayMusicListItem", (index) => {
      this.setCurrentIndex(index);
    });
  },
  computed: {
    isShowSlider() {
      return this.$store.state.isShowSlider;
    },
  },
  methods: {
    // 点击封面弹出播放器
    ShowPlayer(){
      this.PlayerShow=true;
      this.$store.commit('changeisShowSlider')
    },
    // 隐藏播放器
    Hidden(){
      this.PlayerShow=false;
      this.$store.commit('changeisShowSlider')
    },
    ShowPlayList() {
      this.isShowPlayList = !this.isShowPlayList;
    },
    /**设置要播放的音乐 */
    setCurrentIndex(index) {
      for (let i in this.playList) {
        if (this.playList[i].index == index) {
          this.currentIndex = i;
          break; //break跳出循环------continue跳出本次循环
        }
      }
    },
    // 播放上一首
    preMusic() {
      if (this.currentIndex <= 0) this.currentIndex = this.playList.length - 1;
      else this.currentIndex--;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    // 播放下一首
    nextMusic() {
      if (this.orderIndex == 1) {
        this.currentIndex = Math.floor(Math.random() * this.playList.length); //随机播放
      } else {
        if (this.currentIndex == this.currentIndex.length - 1)
          this.currentIndex = 0;
        else this.currentIndex++;
        this.$refs.audio.src = this.playList[this.currentIndex].src;
      }
    },
    ShowVolume() {
      this.volumeShow = true;
      setTimeout(() => {
        this.volumeShow = false;
      }, 3000);
    },
    // 暂停或者播放
    Play() {
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4) {
        this.$refs.audio.play();
      } else this.$refs.audio.pause();
    },
    // 音量改变
    changeVolume(index = 0) {
      this.$refs.audio.volume = index / 100;
      this.volume = index;
    },
    // 改变播放顺序图标
    changeOrder() {
      if (this.orderIndex >= 2) {
        this.orderIndex = 0;
      } else this.orderIndex++;
    },
  },
};
</script>


<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.Play {
  width: 100%;
  height: 100%;
  /* padding: 20px; */
  display: flex;
  /* align-content: space-between; */
}
.play-music-list {
  position: absolute;
  /* display: block; */
  right: 10px;
  bottom: 103px;
  height: 450px;
  width: 400px;
  z-index: 100;
  background-color: #fff;
  border-radius: 10px;
  /* box-shadow: -3px 0 3px #8f8d8d7c, 3px 0 3px #8f8d8d7c, 0px -3px 3px #8f8d8d7c,
    0px 3px 3px #8f8d8d7c; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.pro {
  flex: 2;
  padding: 20px 0 0 20px;
}
.middle {
  flex: 5;
  height: 100%;
  display: flex;
  align-items: center;
}
.after {
  flex: 2;
  display: flex;
}
.control {
  display: flex;
}
.controlIcon {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.faceImg {
  padding-right: 30px;
  height: 58.5px;
}
.faceImg img {
  height: 58.5px;
}
.pre img,
.next img {
  height: 30px;
}
.play img,
.pause img {
  height: 40px;
}

.process {
  /* padding: 0 30px; */
  /* display: flex;
  align-items: center; */
  padding: 0 20px;
  height: 100%;
  flex: 1;
}
.fir_floor{
  display: flex;
  margin-top: 15px;
}
.el_slider{
  margin-top: -10px;
}
.audio_time {
  font-size: 13px;
  /* float: right; */

  padding-right: 10px;
  margin-left: auto;
  color: rgb(130, 131, 133);
}
.songinfo{
  width: 300px;
overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
    /* margin-top: -13px;  */
}

.volume {
  height: 120px;
  width: 40px;
  bottom: 48.5px;

  position: absolute;
}
.right_icon img {
  width: 23px;
}
.right_icon {
  /* margin-top: 10px; */
  display: flex;
  align-items: center;
}
.volume_icon {
  padding-left: 10px;
}
.play_order,
.play_list {
  margin-left: 50px;
}
</style>