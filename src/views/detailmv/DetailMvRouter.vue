<template>
  <div
    class="mv-detail"
    v-if="mvid != 0 && mvdetail != null && comment != null&&url != null"
  >
    <div class="title_bar">
      <img src="~assets/img/icon/mvdetail/back.png" alt="" @click="Back" />
      {{ mvdetail.name }}
    </div>
    <div class="mvdetail_content">
      <div class="video_div">
        <scroll class="scroll_left">
          <div class="videoWrap">
            <video
              :src="url"
              controls
              width="100%"
              height="100%"
              error="Error()"
              ref="video1"
            ></video>
          </div>
          <div class="info">
            <div class="left">
              <div class="title">
                {{ mvdetail.name }} -
                <div class="singername">{{ mvdetail.artistName }}</div>
              </div>
              <div class="playnum">播放：{{ mvdetail.playCount }}</div>
            </div>

            <div class="right">
              <div class="collect">
                <img src="~assets/img/icon/mvdetail/collect1.png" alt="" />
                <div class="count">{{ mvdetail.subCount }}</div>
              </div>
              <div class="transmit">
                <img src="~assets/img/icon/mvdetail/transmit1.png" alt="" />
                <div class="count">{{ mvdetail.shareCount }}</div>
              </div>
            </div>
          </div>
          <div class="desc">
            {{ mvdetail.desc }}
          </div>
        </scroll>
      </div>
      <div class="comment_div">
        <div class="comment_title">最新评论（{{ comment.length }}）</div>
        <div class="comment_content">
          <scroll class="scroll_right">
            <comment :comment="comment" />
          </scroll>
        </div>
        <div class="send">发表评论</div>
      </div>
    </div>
  </div>
  <div v-else style="display: flex;height:100px">
            视频链接不存在请
            <div @click="Back()" style="color: red">返回</div>
          </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import Comment from "./childComps/Comment";

import { _MvDetail, _MvUrl, _MvComment } from "network/mv";
export default {
  name: "DetailMvRouter",
  components: {
    Scroll,
    Comment,
  },

  data() {
    return {
      mvid: 0,
      mvdetail: null,
      url: null,
      comment: null,
    };
  },
  created() {
    this.mvid = this.$route.params.id;
    if (this.mvid != 0) {
      _MvDetail(this.mvid).then((res) => {
        this.mvdetail = res.data.data;
        // console.log(this.mvdetail);
      });

      _MvUrl(this.mvid).then((res) => {
        this.url = res.data.data.url;
      });
      _MvComment(this.mvid).then((res) => {
        this.comment = res.data.comments;
        // console.log(this.comment);
      });
      this.currentSrc();
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    Error() {
      console.log(123);
    },
    currentSrc() {
      if (this.url == null) {
        console.log(123);
      }
    },
  },
};
</script>


<style scoped>
.videoWrap {
  width: 100%;
  height: 350px;
  background-color: #000;
}
.mv-detail {
  width: 100%;
  height: 100%;
}
.title_bar {
  width: 100%;
  height: 39px;
  text-align: center;
  font-size: 18px;
  line-height: 39px;
  /* background-color: pink; */
  border-bottom: 1px solid rgba(148, 147, 147, 0.445);
}
.title_bar img {
  float: left;
  padding: 7px 0 0 20px;
  height: 25px;
}
.mvdetail_content {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  overflow: hidden;
}
.video_div {
  flex: 5;
  padding: 10px;
}
.comment_div {
  flex: 3;
}

.info {
  width: calc(100% - 20px);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0px 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(172, 172, 172, 0.486);
}

.title {
  display: flex;
  align-items: center;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.singername {
  font-size: 14px;
  padding-left: 2px;
}
.playnum {
  margin-top: 5px;
  font-size: 14px;
  color: rgb(136, 135, 133);
}

.right {
  display: flex;
}
.collect,
.transmit {
  padding: 0 10px;
}
.collect img {
  width: 25px;
}
.transmit img {
  width: 23px;
  padding-top: 2px;
}
.count {
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  color: rgb(121, 121, 121);
}
.scroll_left {
  width: 100%;
  height: 100%;
}
.scroll_right {
  width: 100%;
  height: 100%;
}
.desc {
  /* width: ; */
  padding: 10px;
  font-size: 14px;
  color: rgb(134, 132, 132);
}

/* 评论 */
.comment_div {
  width: 100%;
  height: 100%;
  border-left: 1px solid rgba(148, 147, 147, 0.445);
}
.comment_title {
  /* width: calc(100% - 10px); */
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}
.comment_content {
  padding: 0 10px;
  width: calc(100% - 20px);
  height: calc(100% - 91px);
  overflow: hidden;
}
.send {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  border-top: 1px solid rgba(148, 147, 147, 0.445);
  font-size: 14px;
  color: rgb(128, 128, 128);
  letter-spacing: 2px;
}
</style>