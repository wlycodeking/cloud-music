<template>
  
    <div class="title" v-if="ListTitle!=null">
      <div class="title_name"><h3>{{ListTitle}}</h3></div>
      <div class="title_more" @click="MoreRouter">
        更多
        <div class="el-icon-arrow-right"></div>
      </div>
    </div>
  
</template>


<script>
  export default {
    name: "MoreTitle",
    components: {

    },
     props: {
    ListTitle: {
      type: String,
      default() {
        return "";
      },
    },
  },
    data () {
     return {}
    },
    methods:{
      MoreRouter(){
        this.$emit('MoreRouter');
      }
    }
  }
</script>


<style scoped>
.title {
  position: relative;
  display: flex;
}
.title_name {
  flex: 1;
}
.title_more {
  flex: 1;
  position: absolute;
  right: 0;
  bottom: 2px;
  font-size: 12px;
  color: rgb(141, 141, 135);
}
</style>