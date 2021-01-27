<template>
  <div class="allmv">
<scroll class="scroll">
    <div class="nav">
      <div class="type">
        地区：
        <div class="item" v-for="(item, index) in area" :key="index">
          <div
            class="item_name"
            :class="{ action: areaIndex == index }"
            @click="areaClick(index)"
          >
            {{ item }}
          </div>
          <div class="shu">|</div>
        </div>
      </div>
      <div class="type">
        类型：
        <div class="item" v-for="(item, index) in type" :key="index">
          <div class="item_name" :class="{ action: typeIndex == index }" @click="typeClick(index)">
            {{ item }}
          </div>
          <div class="shu">|</div>
        </div>
      </div>
      <div class="type">
        排序：
        <div class="item" v-for="(item, index) in order" :key="index">
          <div class="item_name" :class="{ action: orderIndex == index }" @click="orderClick(index)">
            {{ item }}
          </div>
          <div class="shu">|</div>
        </div>
      </div>
    </div>
    <all-mv-list :mvlist="mvlist"/>
</scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import AllMvList from "../childComps/AllMvList"
import { _AllMv } from "network/mv";
export default {
  name: "MvAll",
  components: {
    Scroll,
    AllMvList,
  },
  data() {
    return {
      area: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      type: ["全部", "官方版", "原声", "现场版", "网易出品"],
      order: ["上升最快", "最热", "最新"],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0,
      mvlist: [],
    };
  },
  created() {
    this.getAllMv();
  },
  methods: {
    getAllMv(area, type, order) {
      this.mvlist = [];
      area = this.area[this.areaIndex];
      type = this.type[this.typeIndex];
      order = this.order[this.orderIndex];
      _AllMv(area, type, order).then((res) => {
        // console.log(res.data.data);
        this.mvlist = res.data.data;
        console.log(this.mvlist);
      });
    },
    areaClick(index) {
      this.areaIndex = index;
      this.getAllMv();
    },
    typeClick(index) {
      this.typeIndex = index;
      this.getAllMv();
    },
    orderClick(index) {
      this.orderIndex = index;
      this.getAllMv();
    },
  },
};
</script>


<style scoped>
.scroll{
  width: 100%;
  height: 100%;
}
.allmv {
  width: 100%;
  height: 100%;
}
.nav {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(180, 180, 180);
}
.type {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.item {
  /* width: 60px; */
  height: 20px;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  display: flex;
}
.item_name {
  padding: 0 10px;
}
.shu {
  text-align: center;
  padding: 0 10px;
}
.action {
  background-color: rgb(199, 199, 199);
}
</style>