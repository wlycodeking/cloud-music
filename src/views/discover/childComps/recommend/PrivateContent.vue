<template>
  <div class="private-content">
    <more-title :ListTitle="ListTitle" @MoreRouter="PrivateRouter" />
    <div class="private-item-list">
      <div
        class="private-item"
        v-for="(item, index) in privatelist"
        :key="index"
        @click="PrivateDetail(index)"
      >
        <div class="play-img">
          <img :src="item.picUrl" alt="" />
          <div class="play-icon">
            <img src="~assets/img/icon/more/video.png" alt="" />
          </div>
        </div>
        <div class="item-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import MoreTitle from "components/content/moreTitle/MoreTitle";
export default {
  name: "PrivateContent",
  components: {
    MoreTitle,
  },
  props: {
    privatelist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      ListTitle: "独家放送",
    };
  },
  methods: {
    PrivateRouter() {
      console.log("暂未开放此功能");
      this.$router.push("/MV/MvExclusive");
    },
    // 路由进入mv详情
    PrivateDetail(index){
      this.$router.push('/MV/'+this.privatelist[index].id)
    }
  },
};
</script>


<style scoped>
.private-content {
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
}

.private-item-list {
  width: 100%;
  /* height: 200px; */
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.private-item {
  position: relative;
  width: 30%;
  /* height: 100%; */
  padding: 10px;
  font-size: 12px;
}

.private-item img {
  width: 100%;
}
.play-img {
  position: relative;
}
.play-icon {
  position: absolute;
  top: 5px;
  left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: rgba(0, 0, 0, 0.425);
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-icon img {
  width: 17px;
  height: 17px;
}
</style>