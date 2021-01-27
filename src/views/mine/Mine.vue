<template>
  <div class="mine">
    <div class="bar">我的</div>
    <scroll class="scroll">
      <div class="title">
        歌单

        <img
          class="addicon"
          src="~assets/img/icon/mine/add.png"
          @click="dialogFormVisible = true"
          alt=""
        />
      </div>

      <el-dialog
        title="手机号登录"
        style="text-align: center"
        :visible.sync="dialogFormVisible"
      >
        <el-form>
          <el-form-item label="name" :label-width="formLabelWidth">
            <el-input
              v-model="name"
              autocomplete="off"
              placeholder="请歌单名"
            ></el-input>
            <!-- @blur="nameVerify()" -->
            <div style="height: 30px">
              <p style="text-align: left">{{ nameMessage }}</p>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateList">确 定</el-button>
        </div>
      </el-dialog>
      <div class="musiclist">
        <div class="musicitem" v-for="(item, index) in musiclist" :key="index">
          <div class="img">
            <img :src="item.coverImgUrl" alt="" @click="RouterDetail(index)" />
            <div class="deleteicon"  @click="DeleteList(index)" v-if="index!=0"><img src="~assets/img/icon/mine/delete.png" alt=""></div>
          </div>

          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="trackCount">{{ item.trackCount }}首</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import { _createList, _loginRefresh, _deleteList } from "network/user";

export default {
  name: "Mine",
  components: {
    Scroll,
  },
  data() {
    return {
      musiclist: null,
      dialogFormVisible: false,
      name: null,
      formLabelWidth: "60px",
      nameMessage: null,
      newplaylist: null,
    };
  },
  created() {
    this.musiclist = this.$store.state.SongList;
    console.log(this.musiclist);
  },
  methods: {
    RouterDetail(index) {
      this.$router.push("/musiclist/" + this.musiclist[index].id);
    },
    CreateList() {
      if (this.name != null) {
        _createList(this.name).then((res) => {
          this.newplaylist = res.data.playlist;
          console.log(this.newplaylist);
          // this.musiclist.splice(1, 0, this.newplaylist);
          // this.$store.state.SongList.splice(1,0,this.newplaylist)
          this.$store.commit('getUserList',this.newplaylist);
          this.musiclist = this.$store.state.SongList;
          this.dialogFormVisible = false;
        });
      } else {
        this.nameMessage = "请输入歌单名";
      }
    },
    DeleteList(index) {
      _deleteList(this.musiclist[index].id).then((res) => {
        // this.musiclist.splice(index, 1);
        this.$store.commit('deleteUserList',index);
        this.musiclist = this.$store.state.SongList;
        console.log(res.data);
      });
    },
  },
};
</script>


<style scoped>
.mine {
  width: 100%;
  height: 100%;
}
.scroll {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
}
.bar {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  background-color: rgb(243, 132, 132);
}
.title {
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bolder;
  display: flex;
  align-items: center;
}
.musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.musicitem {
  width: 150px;
  padding: 10px;
}
.musicitem img {
  width: 100%;
}
.img{
  position: relative;
}
.deleteicon{
  position: absolute;
  top: 130px;
  right: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(61, 61, 61, 0.377);
}
.deleteicon img{
  /* float: center; */
  height: 15px;
  width: 15px;
}


.info {
  width: 100%;
}
.name {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
.trackCount {
  font-size: 13px;
  color: rgba(160, 160, 160, 0.692);
  text-align: center;
}
.addicon {
  width: 25px;
  padding-right: 20px;
  margin-left: auto;
}
</style>