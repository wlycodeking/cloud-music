import {realFormatSecond} from "./formatSecond"
import { _Lyric} from "network/musiclist"
export const audioMixin={
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second)
    },
    // transPlayPause(value) {
    //   return value ? '暂停' : '播放'
    // },
    // transMutedOrNot(value) {
    //   return value ? '放音' : '静音'
    // },
    // transSpeed(value) {
    //   return '快进: x' + value
    // }
  },
  methods:{
    // 播放监听  获得歌词
    musicplay(){
      this.isPlay = true;
      console.log(this.playList[this.currentIndex].id);
      _Lyric(this.playList[this.currentIndex].id).then(res=>{
        this.Lyric=res.data.lrc.lyric;
        console.log(this.Lyric);
      })
    },
    /**对播放暂停进行监视 */
    musicPause() {
      this.isPlay = false;
      if (this.$refs.player != null) this.$refs.player.isPlay = false;
    },
    musicEnded() {
      switch (this.orderIndex) {
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++; //循环播放
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length); //随机播放
          break;
        case 2: //单曲循环
          break;
      }
    },
    // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      onLoadedmetadata(res) {
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {

        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
        
      },
      // 当音乐播放
      musicPlaying() {
        this.isPlay = true;
        /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */
        this.$bus.$emit(
          "Playing",
          this.playList[this.currentIndex].index,
          this.path
        );
        // if (this.$refs.player != null) this.$refs.player.isPlay = true;
      },
  }
}