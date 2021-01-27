<template>
  <div class="search_info">
    <div class="hot_search">
      <div class="hot_title">
        <div class="hot_name">热门搜索</div>
      </div>
      <div class="hotlist">
        <div
          class="hot_item"
          v-for="(item, index) in hotlist"
          :key="index"
          @click="RouterInfo(item.searchWord)"
        >
          {{ item.searchWord }}
        </div>
      </div>
    </div>
    <div class="history_search">
      <div class="history_title">
        <div class="history_name">历史搜索</div>
        <div class="history_clear">
          <img
            src="~assets/img/icon/search/bin.png"
            alt=""
            @click="clearHistory"
          />
        </div>
      </div>
      <div class="hotlist">
        <div
          class="hot_item"
          v-for="(item, index) in historylist"
          :key="index"
          @click="RouterInfo(item.searchWord)"
        >
           <div class="item_name">{{ item.searchWord }}</div> 
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SearchHot",
  components: {},
  props: {
    hotlist: {
      type: Array,
      default() {
        return [];
      },
    },
    keywords: {
      type: String,
      default() {
        return null;
      },
    },
    historylist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      
    };
  },
  created(){
    
  },
  mounted(){
    
  },
  methods: {
    clearHistory() {
      this.$emit('clearHistory');
    },
    RouterInfo(item) {
      this.$router.push("/searchInfo/" + item);
      console.log(item);
    },
  },
};
</script>


<style scoped>
.search_info {
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.hot_search,
.history_search {
  flex: 1;
  /* background-color: rgb(203, 156, 250); */
  margin: 0 20px;
}
.hot_title,
.history_title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #8a8989a2;
}
.hot_name,
.history_name {
  padding-bottom: 5px;
  border-bottom: 3px solid rgb(184, 181, 181);
  width: 70px;
}
.history_clear {
  width: 20px;
  margin-right: 10px;
  padding-top: 3px;
}
.history_clear img {
  width: 20px;
}
.hotlist {
  width: 100%;
  /* height: 200px; */
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
}
.hot_item {
  margin-top: 20px;
  font-size: 15px;
  color: rgb(166, 170, 170);
  width: 50%;
  
}
.item_name{
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>