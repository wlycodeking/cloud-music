<template>
  <div v-if="comment != null" class="comment">
    <div v-for="(item, index) in comment" :key="index" class="comment_item">
      <div class="comm_info">
        <div class="avatar">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="userinfo">
          <div class="username">{{item.user.nickname}}</div>
          <div class="time">{{format(item.time)}}</div>
        </div>
        <div class="like">
          <div class="like_count">{{item.likedCount}}</div>
          
          <img src="~assets/img/icon/mvdetail/like.png" alt="">
        </div>
      </div>
      <div class="comm_content">
        {{item.content}}
      </div>
    </div>
  </div>
</template>


<script>
import {dateFormat} from "common/tool"
export default {
  name: "Comment",
  components: {},
  props: {
    comment: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  
  methods: {
    format(time){
return dateFormat ("mm-dd HH:MM",new Date(time))
    }
  },
};
</script>


<style scoped>
.comment {
  width: 100%;
  height: 100%;
}
.comment_item {
  width: 100%;
  padding: 10px 0;
}
.comm_info{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.userinfo{
  padding-left: 10px;
}
.username{
  font-size: 15px;
  color: rgb(128, 127, 127);
}
.time{
  font-size: 8px;
  color: rgb(155, 155, 155);
}
.like{
  /* float: right; */
  margin-left: auto;
  line-height: 40px;
  display: flex;
  align-items: center;
  
}
.like_count{
  height: 20px;
  line-height: 25px;
  font-size: 13px;
  padding-right: 7px;
}
.like img{
  width: 20px;
}
.comm_content{
  /* width: ; */
  padding-left: 40px;
  padding-top: 7px;
  font-size: 15px;


}
</style>