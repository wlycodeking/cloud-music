
<template>
  <div class="MV">
    <mv-nav-bar />
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>


<script>
import MvNavBar from "./childComps/mvnavbar/MvNavBar"
  export default {
    name: "MV",
    components: {
MvNavBar

    },
    data () {
     return {}
    },
    methods:{}
  }
</script>


<style scoped>
.MV {
  width: 100%;
  height: 100%;

}
.content {
  height: calc(100% - 50px - 20px);
  width: calc(100% - 20px);
  overflow: hidden;
    padding: 20px 10px 0 10px;
}

</style>