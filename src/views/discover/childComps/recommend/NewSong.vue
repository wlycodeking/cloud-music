<template>
  <div class="newsong" v-if="newSong != null">
    <more-title :ListTitle="ListTitle" @MoreRouter="NewSongRouter" />
    <div class="newsong-list">
      <div
        class="newsong-item"
        v-for="(item, index) in newSong"
        :key="index"
        :class="{ action: index == actionIndex[index], active: index % 2 == 0 }"
      >
        <div class="num">{{ index + 1 }}</div>
        <div class="play-img" @click="PlayMusic(index)">
          <img :src="item.picUrl" alt="" />
          <div class="play-icon">
            <img src="~assets/img/icon/more/play.png" alt="" />
          </div>
        </div>
        <div class="name">
          <div class="songname">
            {{ item.name }}
            <!-- <div class="alia"> -->
            {{ item.song.alias[0] ? "(" + item.song.alias[0] + ")" : "" }}
            <!-- </div> -->
          </div>
          <div class="singername">
            {{ item.song.artists[0].name
            }}{{ item.song.artists[1] ? "/" + item.song.artists[1].name : "" }}
            -
            {{ item.song.album.name }}
          </div>
        </div>
        <div class="moreicon">
          <el-popover placement="left" width="150px" trigger="click" ref="menuListPopover">
            <scroll class="selectList">
              <div class="user_list_item" v-for="(item1,index1) in userList" :key="index1" @click="AddUserList(item1.id,index)">
                {{item1.name}}
              </div>
            </scroll>
            <button slot="reference">
              <img src="~assets/img/icon/more/add.png" alt="" />
            </button>
          </el-popover>
        </div>
        <div class="moreicon">
          <el-popover placement="left" width="150px" trigger="click" ref="menuListPopover">
            <div class="popover_content card1"  @click="RouterComment(index)">
              <img src="~assets/img/icon/more/comment.png" alt="" />
              评论
            </div>
            <div class="popover_content card2" @click="RouterSinger(index)">
              <img src="~assets/img/icon/more/singer.png" alt="" />
              歌手
            </div>
            <div class="popover_content card3" @click="RouterAlbum(index)">
              <img src="~assets/img/icon/more/album.png" alt="" />
              专辑
            </div>
            <button slot="reference">
              <img src="~assets/img/icon/more/more.png" alt="" />
            </button>
          </el-popover>
        </div>
        
      </div>
    </div>
    
  </div>
</template>


<script>
import MoreTitle from "components/content/moreTitle/MoreTitle";
import Scroll from "components/common/scroll/Scroll";

import { _addMusic } from "network/user";
export default {
  name: "NewSong",
  components: {
    MoreTitle,
    Scroll
  },

  props: {
    newSong: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      actionIndex: [0, 1, 11, 12, 4, 5, 14, 15, 8, 9],
      ListTitle: "最新音乐",
      add: "add",
      userList:null
    };
  },
  // computed:{
  //   artist(){
  //     {{item.song.artists[0].name}}/{{item.song.artists[1].name}}
  //   }
  // },
  created() {
    this.userList=this.$store.state.SongList;
    // console.log(this.userList);
    // console.log(this.newSong);
  },
  methods: {
    AddUserList(id,index){
      _addMusic(this.add, id, this.newSong[index].id).then((res) => {
        console.log(res);
      });
    },
    PlayMusic(index) {
      this.$emit("playMusic", index);
    },
    NewSongRouter() {
      console.log("最新音乐");
      this.$router.push("./newsongs");
    },
    RouterComment(index) {
      // this.$refs.menuListPopover.doClose();

      // console.log(this.newSong[index].id);
      
    },
    RouterSinger(index) {
      console.log("歌曲歌手路由");
      this.$router.push("/artist/" + this.newSong[index].song.artists[0].id);
    },
    RouterAlbum(index) {
      console.log("歌曲专辑路由");
      this.$router.push("/albumDetail/" + this.newSong[index].song.album.id);
    },
  },
};
</script>


<style scoped>
button {
  background: transparent;
  border: none !important;
  font-size: 0;
}
.popover_content {
  height: 40px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  /* align-content: center; */
  /* text-align: center; */
  justify-items: center;
  justify-content: center;
}
.card1 {
  height: 26px;
  padding-bottom: 2px;
  border-bottom: 1px solid rgb(112, 110, 110);
}
.card2 {
  height: 40px;
  border-bottom: 1px solid rgb(112, 110, 110);
}
.card3 {
  padding-top: 5px;
  height: 23px;
}
.popover_content img {
  height: 20px;
  padding-right: 10px;
}
.newsong {
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
}
.newsong-list {
  width: 100%;
  /* height: 100%; */
  margin-top: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-top: 1px solid rgba(216, 212, 212, 0.76);
  border-bottom: 1px solid rgba(216, 212, 212, 0.76);
}
.newsong-item {
  width: calc((100% - 3px) / 2);
  height: 80px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(216, 212, 212, 0.76);
}
.action {
  background-color: rgb(240, 239, 239);
}
.active {
  border-left: 1px solid rgba(216, 212, 212, 0.76);
}
.newsong-item img {
  height: 60px;
}
.num {
  width: 40px;
  text-align: center;
  color: rgb(83, 83, 83);
}
.name {
  margin-left: 10px;
  width: 60%;
}
.songname {
  /* display: flex; */
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singername {
  font-size: 13px;
  padding-top: 3px;
  color: rgb(175, 173, 173);
}
.moreicon {
  margin-left: auto;
  padding:0 10px;
}
.moreicon img {
  height: 18px;
  padding: 10px 0;
}

.play-img {
  position: relative;
}
.play-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.play-icon img {
  width: 20px;
  height: 20px;
}



.selectList{
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.user_list_item{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* text-align: center; */
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(160, 160, 160, 0.377);
  color:rgb(80, 79, 79) ;
}
</style>