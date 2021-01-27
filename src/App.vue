<template>

  <div class="app">

    <div class="leftmenu">
      <left-menu/>
           

    </div>
    <div class="main">
      <Main/>
    </div>

    <div class="footer">
      <Play/>
    </div>

  </div>
</template>

<script>
import LeftMenu from "components/content/leftmenu/LeftMenu";
  import Main from "components/content/Main";
  import Play from "components/content/footer/Play"

export default {
  name:'App',
  components:{
    LeftMenu,
    Main,
    Play
  }
}
</script>

<style>
*{
    padding: 0;
    margin:0;

    cursor:default;
  }
#app {
  height: 100vh !important;
  width: 100%;
  user-select: none !important;
  
  
  
}

.leftmenu{
  height: 85vh;
  width: 15%;
  float: left;
  background-color:#d3dce6;
}
.main{

  position: relative;
  left: 15%;
  width: 85%;
  height: 85vh;
  /* background-color: pink; */
  /* z-index: -99; */
}
.footer{
  height: 15vh;

  background-color: #b3c0d1;

}




</style>
