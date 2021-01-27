<template>
  <div class="allmusiclist" v-if="musiclist.length!=0">
    <scroll class="scroll">
      <div class="title">
        <div class="all">
          <img src="~assets/img/icon/artist/colum.png" alt="" />
          {{titlename}}
        </div>
        <el-popover ref="popover" placement="bottom" width="1000" trigger="click">
          <div class="category_list">
            <div class="tag_list">
              <div class="tag_title">
                {{tags[0]}}:
              </div>
              <div class="tag_item_grop">
              <div class="tag_item" v-for="(item,index) in tag0" :key="index" @click="getMusicList(item.name)">
                {{item.name}}
              </div>
              </div>
            </div>
            <div class="tag_list">
              <div class="tag_title">
                {{tags[1]}}:
              </div>
              <div class="tag_item_grop">
              <div class="tag_item" v-for="(item,index) in tag1" :key="index" @click="getMusicList(item.name)">
                {{item.name}}
              </div>
              </div>
            </div>
            <div class="tag_list">
              <div class="tag_title">
                {{tags[2]}}:
              </div>
              <div class="tag_item_grop">
              <div class="tag_item" v-for="(item,index) in tag2" :key="index" @click="getMusicList(item.name)">
                {{item.name}}
              </div>
              </div>
            </div>
            <div class="tag_list">
              <div class="tag_title">
                {{tags[3]}}:
              </div>
              <div class="tag_item_grop">
              <div class="tag_item" v-for="(item,index) in tag3" :key="index" @click="getMusicList(item.name)">
                {{item.name}}
              </div>
              </div>
            </div>
            <div class="tag_list">
              <div class="tag_title">
                {{tags[4]}}:
              </div>
              <div class="tag_item_grop">
              <div class="tag_item" v-for="(item,index) in tag4" :key="index" @click="getMusicList(item.name)">
                {{item.name}}
              </div>
              </div>
            </div>
          </div>
          <button slot="reference">
            <div class="select">
              <img src="~assets/img/icon/musiclist/category.png" alt="" />
              选择分类
            </div>
          </button>
        </el-popover>

      </div>
      <music-list :musiclist="musiclist"/>
    </scroll>
  </div>
</template>


<script>
import MusicList from "../childComps/Category/MusicList"

import Scroll from "components/common/scroll/Scroll";

import { _getCatlistTag,_getTopPlayList } from "network/discover";
export default {
  name: "MusicListCategory",
  components: {
    MusicList,
    Scroll,
  },
  data() {
    return {
      titlename:null,
      musiclist:[],
      all:null,
      tags: [],
      tag0: [],
      tag1: [],
      tag2: [],
      tag3: [],
      tag4: [],
    };
  },
  created() {
    _getCatlistTag().then((res) => {
      this.tags = res.data.categories;
      this.all=res.data.all.name;
      console.log(this.all);
      this.titlename=res.data.all.name;
      // console.log(this.tags);
      for (let i of res.data.sub) {
        switch (i.category) {
          case 0:
            this.tag0.push(i);
            break;
          case 1:
            this.tag1.push(i);
            break;
          case 2:
            this.tag2.push(i);
            break;
          case 3:
            this.tag3.push(i);
            break;
          case 4:
            this.tag4.push(i);
            break;
        }
      }
    });
    _getTopPlayList(this.all).then(res=>{
        this.musiclist=res.data.playlists;
      })
  },
  methods: {
    getMusicList(cat){
      _getTopPlayList(cat).then(res=>{
        this.musiclist=res.data.playlists;
        this.titlename=cat;
        this.$refs.popover.showPopper = false;
      })
    }
  },
};
</script>


<style scoped>
.allmusiclist {
  width: 100%;
  height: 100%;
}
.scroll {
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title img {
  height: 20px;
}
.all {
  display: flex;
  align-items: center;
}
.select {
  height: 25px;
  display: flex;
  width: 90px;
  border-radius: 15px;
  border: 1px solid rgb(189, 189, 189);
  font-size: 13px;
  line-height: 25px;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: #fff;
}
.select img {
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
button {
  background: transparent;
  border: none !important;
  font-size: 0;
}
.category_list{
  width: 100%;
  height: 420px;
}
.tag_list{
  display: flex;
  /* align-items: center; */
  flex-wrap: wrap;
}
.tag_title{
  /* width: 40px; */
  height: 20px;
  font-size: 20px;
  padding: 10px;
  line-height: 20px;
  
}
.tag_item_grop{
  display: flex;
  width: 900px;
  align-items: center;
  flex-wrap: wrap;
}
.tag_item{
  width: 80px;
  height: 30px;
  border: 1px solid rgb(221, 220, 220);
  text-align: center;
  margin: 5px ;
  line-height: 30px;
}
</style>