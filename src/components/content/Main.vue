
<template>
  <div class="main" v-loading="isloading">
    <!-- <transition name="SkipSwitch"> -->
      <keep-alive include="NewSong,Search,NewAlbum,Recommend,User">
      <router-view ></router-view>
      </keep-alive>

  <!-- </transition> -->
  </div>
</template>


<script>
  export default {
    name: "Main",
    components: {

    },
    data () {
     return {}
    },
    computed:{
    isloading(){
      return this.$store.state.isloading;
    }
  },
    methods:{}
  }
</script>


<style scoped>
.main{
  
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;


}
.SkipSwitch-enter-active,
.SkipSwitch-leave-active{
  transition: all 300ms;
}
.SkipSwitch-enter {
  transform: translate3d(-100%, 0, 0);
}
.SkipSwitch-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>