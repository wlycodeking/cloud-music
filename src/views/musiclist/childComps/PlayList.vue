<template>
  <div class="playlist" v-if="songlist != null">
    <div
      class="musicItem"
      v-for="(item, index) in songlist"
      :key="index"
      :class="{ curFont: playIndex == index }"
    >
      <div class="num">{{ index + 1 }}</div>
      <div class="song" @click="musicItemClick(index)">
        <div class="songname">
          {{ item.name }}
          <!-- <div class="alia"> -->
          {{ item.alia[0] ? "(" + item.alia[0] + ")" : "" }}
          <!-- </div> -->
        </div>
        <div class="singername">{{ item.singer }}-{{ item.album }}</div>
      </div>
      <div class="moreicon0">
        <el-popover placement="left" width="150px" trigger="click" ref="menuListPopover">
            <scroll class="selectList">
              <div class="user_list_item0">选择添加的歌单</div>
              <div class="user_list_item" v-for="(item1,index1) in userList" :key="index1" @click="AddUserList(item1.id,index)">
                {{item1.name}}
              </div>
            </scroll>
            <button slot="reference">
              <img src="~assets/img/icon/more/add.png" alt="" />
            </button>
          </el-popover>
        <!-- <el-dropdown >
          <span class="el-dropdown-link">
            <img src="~assets/img/icon/more/add.png" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <scroll class="selectList">
              <el-dropdown-item
                v-for="(item1, index1) in userList"
                :key="index1"
                @click="AddUserList(item1.id, index)"
              >
                {{ item1.name }}
              </el-dropdown-item>
            </scroll>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
      <div class="moreicon">
        <el-popover placement="left" width="150px" trigger="click">
          <div class="popover_content card1" @click="RouterComment(index)">
            <img src="~assets/img/icon/more/comment.png" alt="" />
            喜欢
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
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import { _addMusic,_like } from "network/user";
export default {
  name: "PlayList",

  components: { Scroll },
  props: {
    songlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      playIndex: 0.5,
      musiclists: null,
      add: "add",
      userList: null,
    };
  },
  created() {
    this.userList = this.$store.state.SongList;
    this.$bus.$on("Playing", (index, path) => {
      if (this.$route.path == path) {
        this.playIndex = index;
      }
    });
  },
  methods: {
    AddUserList(id, index) {
      _addMusic(this.add, id, this.songlist[index].id).then((res) => {
        console.log(res);
      });
    },
    musicItemClick(index) {
      if (this.$parent.$parent.$el.className.indexOf("play-music-list") != -1) {
        this.$bus.$emit("PlayMusicListItem", index);
        return;
      }
      this.$emit("musicItemClick", index);
    },
    RouterComment(index) {
      console.log("歌曲评论路由");
      _like(this.songlist[index].id).then(res=>{
        console.log(res);
      })
    },
    RouterSinger(index) {
      console.log("歌曲歌手路由");

      this.$router.push("/artist/" + this.songlist[index].singerId);
    },
    RouterAlbum(index) {
      console.log("歌曲专辑路由");
      this.$router.push("/albumDetail/" + this.songlist[index].albumId);
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
.musicItem {
  display: flex;
  height: 60px;
  align-content: center;
  align-items: center;
}
.num {
  padding: 0 15px;
}

.songname {
  max-width: 600px;
  /* display: flex; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.singername {
  width: 600px;
  font-size: 13px;
  padding-top: 3px;
  color: rgb(175, 173, 173);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.moreicon {
  /* float: right; */
  padding: 0 10px;
}
.moreicon0 {
  margin-left: auto;
  padding: 0 10px;
}
.moreicon0 img {
  /* padding: 10px 0; */
  height: 18px;
}
.moreicon img {
  padding: 10px 0;
  height: 18px;
}
.curFont {
  background-color: pink;
}

.selectList {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.user_list_item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* text-align: center; */
  font-size: 16px;
  border-bottom: 1px solid rgba(160, 160, 160, 0.377);
  color: rgb(80, 79, 79);
}
.user_list_item0 {
  width: 100%;

  text-align: center;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(160, 160, 160, 0.377);
  color: rgb(80, 79, 79);
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>