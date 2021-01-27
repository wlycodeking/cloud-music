<template>
  <div class="discover">
    <nav-bar />
    <div class="content" >
      <keep-alive>
        <!-- <v-scroll-x-transition> -->
        <router-view></router-view>
        <!-- </v-scroll-x-transition> -->
      </keep-alive>
    </div>
  </div>
</template>


<script>

import NavBar from "./childComps/navbar/NavBar";
export default {
  name: "DiscoverMusic",
  components: {
    NavBar,

  },
  data() {
    return {
      
    };
  },
  // computed:{
  //   isloading(){
  //     return this.$store.state.isloading;
  //   }
  // },
  computed:{
    
  },
  methods: {},
};
</script>


<style scoped>
.discover {
  width: 100%;
  height: 100%;

}
.content {
  height: calc(100% - 50px - 20px);
  width: calc(100% - 40px);
  overflow: hidden;
    padding: 20px 20px 0 20px;
}








</style>