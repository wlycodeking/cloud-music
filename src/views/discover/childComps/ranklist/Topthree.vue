<template>
  <div class="topthree" v-if="top!=null&&id!=0&&topthree.length!=0">
    <div v-for="(item, index) in topthree" :key="index" class="three_item">
      {{ index + 1 }}.{{ item.name }}-{{ item.singer }}
    </div>
  </div>
</template>


<script>
import {
  _getMusicListDetail,
  _getSongDetail,
  songDetail,
} from "network/musiclist";
export default {
  name: "Topthree",
  components: {},
  props: {
    id: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      top: null,
      topthree: [],
    };
  },
  created() {
    if (this.id != null) {
      _getMusicListDetail(this.id).then((res) => {
        this.top = res.data.playlist.trackIds;
        for (let i of this.top.slice(0, 3)) {
          _getSongDetail(i.id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.topthree.push(song);
          });
        }
        
      });
    }
  },
  methods: {},
};
</script>


<style scoped>
.topthree {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.three_item {
  padding: 10px;
  font-size: 13px;
  color: rgb(122, 122, 122);
}
</style>