
<template>
  <div class="nav-bar">
    <div class="content">
      <router-link v-for="(item, index) in list" :key="index" :to="item.link">
        <div class="nav-item">
          <a>{{ item.name }}</a>
        </div>
      </router-link>
    </div>
    <div class="search">
      <div class="search-box" @click="RouterSearch">
        <img src="~assets/img/icon/search/search.png" alt="" />
        <div>搜索</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      list: [
        { link: "/discover/recommend", name: "推荐" },
        { link: "/discover/category", name: "歌单" },
        { link: "/discover/broadcast", name: "电台" },
        { link: "/discover/ranklist", name: "排行榜" },
        { link: "/discover/newsongs/newsong", name: "新歌" },
      ],
    }
  },
  methods: {
    RouterSearch() {
      this.$router.push("/Search");
    },
  },
};
</script>


<style scoped>
.nav-bar {
  background-color: #ec8585;
  display: flex;
  height: 50px;
  /* border-bottom: 1px solid #f6f6f6; */
}
.content {
  display: flex;
  flex: 3;
  justify-content: center;
}
.nav-item {
  flex: 1;
  padding: 20px 20px 10px 20px;
}
a {
  text-decoration: none !important;
  color: black;
}

.router-link-exact-active {
  border-bottom: 3px solid #f6f6f6;
}
.search {
  position: relative;
  /* background-color: red; */
  flex: 2;
}
.search-box {
  position: absolute;
  bottom: 10px;
  right: 40px;
  width: 65%;
  height: 30px;
  border-radius: 15px;
  background-color: #f6f6f6;
  color: #bfbfbf;
  -webkit-user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-box img {
  width: 22px;
  height: 22px;
}

</style>