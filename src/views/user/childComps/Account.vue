<template>
  <div class="account">
    <div class="title">账号</div>
    <scroll class="scroll">
      <div class="login">
        <Login />
      </div>
      <div class="bg"></div>
      <div class="mine">
        我的消息
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="bg"></div>
      <div class="mine">
        我的会员
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="bg"></div>
      <div class="control">
        定时关闭
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="control">
        音质选择
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="control">
        清除缓存
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="control">
        音乐黑名单
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="control">
        心动模式
        <el-switch
          style="display: block"
          v-model="value1"
          active-color="#13ce66"
          class="iconimg"
        >
        </el-switch>
      </div>
      <div class="control">
        控制中心菜单显示“喜欢”
        <el-switch
          style="display: block"
          v-model="value2"
          active-color="#13ce66"
          class="iconimg"
        >
        </el-switch>
      </div>
      <div class="control">
        锁屏歌词（仅限平板用户使用）
        <el-switch
          style="display: block"
          v-model="value3"
          active-color="#13ce66"
          class="iconimg"
        >
        </el-switch>
      </div>
      <div class="mine">
        歌词翻译
        <el-switch
          style="display: block"
          v-model="value4"
          active-color="#13ce66"
          class="iconimg"
        >
        </el-switch>
      </div>
      <div class="bg"></div>
      <div class="control">
        账号和绑定设置
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="control">
        寻找并邀请好友
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="mine">
        消息和隐私设置
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="bg"></div>
      <div class="mine">
        关于TT音乐
        <i class="el-icon-arrow-right iconimg"></i>
      </div>
      <div class="bg"></div>
      <div class="out">
        退出登录
      </div>
      <div class="bg"></div>
      <div class="bg"></div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "components/common/scroll/Scroll";

import Login from "./Login";
import { _PhoneVerify} from "network/user";
export default {
  name: "Account",
  components: {
    Scroll,
    Login,
  },
  data() {
    return {
      value1: true,
      value2: true,
      value3: true,
      value4: true,
    };
  },
  methods: {
    
  },
};
</script>


<style scoped>
.account {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 35px;
}
.scroll {
  width: 100%;
  height: calc(100% - 35px);
  overflow: hidden;
}
.login {
  width: 100%;
  height: 150px;
  background-color: #fff;
}
.bg {
  width: 100%;
  height: 10px;
  background-color: #f6f6f6;

}
.mine {
  padding-left: 20px;
  width: calc(100% - 20px);
  height: 50px;
  display: flex;
  align-items: center;
}
.iconimg {
  padding-right: 20px;
  color: #9e9e9ead;
  margin-left: auto;
  font-weight: bolder;
}
.control {
  margin-left: 20px;
  width: calc(100% - 20px);
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c7c7c785;
}
.out{
  width: 100%;
  height: 50px;
  text-align: center;
  color: red;
  line-height: 50px;
}
</style>