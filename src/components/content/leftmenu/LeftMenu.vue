
<template>
  <div class="leftmenu">
    <router-link :to="item.link" v-for="(item, index) in list" :key="index">
      <div class="left-item" @click="btnClick(index)">
        <img class="icon" :src="currentIndex==index?item.images:item.image" alt="" />
        <div class="actionfont"><a :class="{action:currentIndex==index}">{{ item.title }}</a></div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "component_name",
  components: {},
  data() {
    return {
      currentIndex:0,
      list: [
        {
          link: "/discover",
          image: require("assets/img/icon/leftmenu/un-discover.png"),
          images:require("assets/img/icon/leftmenu/en-discover.png"),
          title: "发现",
        },
        {
          link: "/MV",
          image: require("assets/img/icon/leftmenu/un-mv.png"),
          images:require("assets/img/icon/leftmenu/en-mv.png"),
          title: "MV",
        },
        {
          link: "/mine",
          image: require("assets/img/icon/leftmenu/un-mine.png"),
          images:require("assets/img/icon/leftmenu/en-mine.png"),
          title: "我的",
        },
        {
          link: "/discover",
          image: require("assets/img/icon/leftmenu/un-friends.png"),
          images:require("assets/img/icon/leftmenu/en-friends.png"),
          title: "朋友",
        },
        {
          link: "/user",
          image: require("assets/img/icon/leftmenu/un-account.png"),
          images:require("assets/img/icon/leftmenu/en-account.png"),
          title: "账号",
        },
      ],
    };
  },
  methods: {
    btnClick(index){
      this.currentIndex=index
    }
  },
};
</script>


<style scoped>
.leftmenu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  
}
.left-item {
  flex: 1;
  /* padding: 20px; */
  
}
.icon {
  width: 30px;
}

a{
  text-decoration: none !important;
  color: #000;
}
.action{
  color:#d81e06
}

</style>