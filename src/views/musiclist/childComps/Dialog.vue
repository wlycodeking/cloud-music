<template>
  <div class="content_info" v-if="baseInfo != null">
    
 
      <div class="dialog"  :style="{'background-image':'url('+ baseInfo.img + ')','background-repete':'no-repete','background-size':'cover','background-position':'center',width:'100%',height:'100%' }">
       
      </div>
      
      <div class="dialog_content">
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
            <scroll class="scroll">
              <div class="scroll_info">
            <span v-html="baseInfo.title" style="white-space: pre-line"></span>
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
            </div></div>
            </scroll>
          </div>
          
        </div>
      </div>

  
  </div>
</template>


<script>
import { _getMusicListDetail } from "network/musiclist";

import { baseInfo } from "network/musiclist";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Dialog",
  components: { Scroll },
  data() {
    return {
      id: 0,
      musiclistdetail: null,
      baseInfo: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    _getMusicListDetail(this.id).then((res) => {
      this.musiclistdetail = res.data;
      this.baseInfo = new baseInfo(this.musiclistdetail.playlist);
    });
  },
  methods: {
    CloseDialog() {
      this.$emit('CloseDialog')
      // this.$router.push("/musiclist/" + this.id);
      this.$store.commit('changeisShowSlider')
    },
  },
};
</script>


<style scoped>
.scroll_info{
  width: 100%;
}
.content_info {
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(179, 177, 177);
  display: inline;
  z-index: 99;
}

.dialog {
  /* position: fixed; */
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(100px);
  /* transform: scale(1.4, 1.4); */
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.dialog_content {
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  /* z-index: 101; */
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
  height: calc(100% - 329.36px);
  padding-top: 30px;
  overflow: hidden;
  /* text-align: center; */
}
.diaInfo {
  width: 400px;
  height: calc(100% - 50px);
  padding: 20px 0;
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
</style>