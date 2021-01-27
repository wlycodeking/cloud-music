<template>
  <div class="user">
    <div class="left">
      <Account/>
    </div>
    <div class="right">
      <router-view>
        
      </router-view>
    </div>
  </div>
</template>


<script>
import Account from "./childComps/Account"
  export default {
    name: "User",
    components: {
Account
    },
    data () {
     return {}
    },
    methods:{}
  }
</script>


<style scoped>
.user{
  width: 100%;
  height:100%;
  display: flex;
}
.left{
  flex: 1;
  height: 100%;
  border-right: 1px solid #000;
}
.right{
  flex: 1;
  height: 100%;
}
</style>