<template>
  <div v-if="baseInfo != null">
    <div class="bgcimg">
      <img :src="baseInfo.img" alt="" />
    </div>

    <!-- <div class="dialog" v-show="dialogShow">
          <img :src="baseInfo.img" alt="" />
        </div>
        <div class="dialog_content" v-show="dialogShow">
          <div class="close">
            <img
              src="~assets/img/icon/close/close.png"
              alt=""
              @click="CloseDialog"
            />
          </div>
          <div class="diaImg">
            <img :src="baseInfo.img" alt="" />
          </div>
          <div class="diaWrap">
            <div class="diaInfo">
              <span
                v-html="baseInfo.title"
                style="white-space: pre-line"
              ></span>
              <div class="tag">
                标签：
                <div
                  class="tagitem"
                  v-for="(item, index) in baseInfo.tags"
                  :key="index"
                >
                  <div class="tagname">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

    <div class="face">
      <div class="face_info">
        <div class="face_img">
          <img :src="baseInfo.img" alt="" />
          <div class="info_icon" @click="OpenDialog">
            <img src="~assets/img/icon/info/info.png" alt="" />
          </div>
        </div>
        <div class="face_title">
          <div class="songname">{{ baseInfo.name }}</div>
          <div class="singername">
            <div class="singerImg">
              <img :src="baseInfo.singerImg" alt="" />
            </div>
            <div class="creatorName">{{ baseInfo.creatorName }}</div>
          </div>
        </div>
      </div>
      <div class="oper">
        <div class="oper_item">
          <div class="icon" @click="Subscribe()">
            <img
              src="~assets/img/icon/musicprea/star.png"
              v-if="!showStar"
              alt=""
            />
            <img src="~assets/img/icon/musiclist/stared.png" v-else alt="" />
          </div>
          <div class="icon_name">{{ baseInfo.subscribedCount }}</div>
        </div>
        <div class="oper_item">
          <div class="icon">
            <img src="~assets/img/icon/musicprea/pl.png" alt="" />
          </div>
          <div class="icon_name">{{ baseInfo.commentCount }}</div>
        </div>
        <div class="oper_item">
          <div class="icon">
            <img src="~assets/img/icon/musicprea/share.png" alt="" />
          </div>
          <div class="icon_name">{{ baseInfo.shareCount }}</div>
        </div>
        <div class="oper_item">
          <div class="icon">
            <img src="~assets/img/icon/musicprea/download.png" alt="" />
          </div>
          <div class="icon_name">下载</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { _subscribeList } from "network/user";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "BaseInfo",
  components: {
    Scroll,
  },
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    playlist: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dialogShow: false,
      showStar: false,
      flag: 1,
      listIndex:0
    };
  },
  created(){
    console.log(this.listIndex);
    for (let i = 0; i < this.$store.state.SongList.length; i++) {
        if (this.$store.state.SongList[i].id == this.$route.params.id) {
          this.showStar = true;
          break;
        } else {
          this.showStar = false;
        }
      }
  },  
  methods: {
    OpenDialog() {
      this.$emit("OpenDialog");
      this.$store.commit("changeisShowSlider");
    },
    Subscribe() {
      for (this.listIndex; this.listIndex < this.$store.state.SongList.length; this.listIndex++) {
        if (this.$store.state.SongList[this.listIndex].id == this.$route.params.id) {
          console.log(this.listIndex);
          this.flag = 1;
          break;
        } else {
          this.flag = 0;
        }
      }
      // console.log(this.flag);
      if (this.flag == 0) {
        this.$store.commit("SubscribeList", this.playlist);
        this.showStar = true;
        this.listIndex=0;
        _subscribeList(1, this.$route.params.id).then((res) => {});
      }
      else{
        this.$store.commit("DeleteList", this.listIndex);
        this.showStar = false;
        _subscribeList(2, this.$route.params.id).then((res) => {});
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
  /* top: 50px; */
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

.dialog {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  overflow: hidden;
  /* -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px); */
  filter: blur(20px);
  transform: scale(1.3, 1.3);
}
.dialog img {
  width: 100%;
}
.dialog_content {
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 101;
  /* display: flex; */
}
.close {
  margin-left: auto;
  width: 35px;
  height: 35px;
  padding: 30px;
}
.close img {
  width: 100%;
}
.diaImg {
  width: 100%;
  text-align: center;
}
.diaImg img {
  height: 200px;
}

.diaWrap {
  width: 100%;
  padding-top: 30px;
  /* text-align: center; */
}
.diaInfo {
  width: 400px;
  padding-top: 20px;
  margin-left: calc(50% - 200px);
  border-top: solid 1px rgba(194, 191, 191, 0.493);
  color: #fff;
}

.tag {
  padding-top: 20px;
  display: flex;
}
.tagitem {
  margin: 2px 5px 0 5px;
  border: solid 1px rgba(194, 191, 191, 0.493);
  border-radius: 10px;
}
.tagname {
  padding: 0 10px 2px;
  font-size: 13px;
}
.face {
  width: 100%;
  height: 210px;
  /* background-color: rgb(175, 201, 240); */
}
.face_info {
  width: 100%;
  height: 160px;
  display: flex;
}
.face_img {
  padding: 20px 20px 0 40px;
  /* margin-left: 100px; */
  height: 130px;
  width: 130px;
  position: relative;
}
.face_img img {
  height: 100%;
}
.info_icon {
  position: absolute;
  width: 17px;
  width: 17px;
  right: 25px;
  bottom: 0;
}
.info_icon img {
  width: 100%;
}
.face_title {
  padding: 20px 20px 0 20px;
  height: 130px;
}
.songname {
  padding: 10px 0;
  font-size: 24px;
}
.singername {
  padding: 20px 0 0 10px;
  display: flex;
}
.singerImg {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  overflow: hidden;
}
.singerImg img {
  width: 100%;
  height: 100%;
}

.creatorName {
  margin-top: 5px;
  margin-left: 6px;
}

.oper {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.oper_item {
  height: 100%;
}
.icon {
  height: 25px;
}
.icon img {
  height: 25px;
}
.icon_name {
  padding-top: 3px;
  font-size: 13px;
  color: white;
  text-align: center;
}
</style>