<template>
  <div class="login" v-if="showLogin">
    <div class="logo"><img src="~assets/img/icon/user/logo.png" alt="" /></div>
    <div style="margin-bottom: 20px">登录TT音乐</div>
    <el-button round @click="dialogFormVisible = true" style="width: 70%"
      >立即登录</el-button
    >
    <el-dialog
      title="手机号登录"
      style="text-align: center"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input
            v-model="phone"
            autocomplete="off"
            placeholder="请输入手机号"
            @blur="phoneVerify()"
          ></el-input>
          <div style="height: 30px">
            <p style="text-align: left">{{ phonemessage }}</p>
          </div>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          ></el-input>
          <div style="height: 30px">
            <p style="text-align: left">{{ passwordmessage }}</p>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="GoRegister" style="float: left">注册</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="注册"
      style="text-align: center"
      :visible.sync="dialogFormVisible2"
      top="2vh"
    >
      <el-form>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input
            v-model="phone"
            autocomplete="off"
            placeholder="请输入手机号"
            @blur="phoneVerify()"
          ></el-input>
          <div style="height: 20px">
            <p style="text-align: left">{{ phonemessage }}</p>
          </div>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input
            v-model="captcha"
            autocomplete="off"
            placeholder="请输入验证码"
            @blur="captchaVerify()"
            ><template slot="append">
              <el-button @click="GetCaptcha">获取验证码</el-button></template
            >
          </el-input>

          <div style="height: 20px">
            <p style="text-align: left">{{ captchamessage }}</p>
          </div>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          ></el-input>
          <div style="height: 20px">
            <p style="text-align: left">{{ passwordmessage }}</p>
          </div>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="nickname"
            autocomplete="off"
            placeholder="请输入昵称"
            @blur="nicknameVerify()"
          ></el-input>
          <div style="height: 20px">
            <p style="text-align: left">{{ nicknamemessage }}</p>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="Register">注册</el-button>
      </div>
    </el-dialog>
  </div>
  <div v-else class="successlogin">
    <div class="hahahaha">
      <div class="headimg"><img :src="avatarUrl" alt="" /></div>
      <div class="nickname">{{ nickname }}</div>
      <div class="edit">
        <el-button class="el-icon-edit" size="mini">编辑</el-button>
      </div>
    </div>
    <div class="userinfo">
      <div class="tit">
        <div class="name">动态</div>
        <div class="num">{{ authority }}</div>
      </div>
      <div class="tit">
        <div class="name">关注</div>
        <div class="num">{{ follows }}</div>
      </div>
      <div class="tit">
        <div class="name">粉丝</div>
        <div class="num">{{ followeds }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  _PhoneVerify,
  _Login,
  _Register,
  _getCaptcha,
  _VerifyCaptcha,
} from "network/user";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      showLogin: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      phone: "", //手机号
      password: "", //密码
      captcha: "", //验证码
      nickname: "", //昵称
      phonemessage: "", //手机号提示
      passwordmessage: "", //密码提示
      captchamessage: "", //验证码提示
      nicknamemessage: "", //昵称提示
      formLabelWidth: "60px",
      avatarUrl: null, //头像
      nickname: null, //网民
      authority: null, //动态
      followeds: null, //粉丝
      follows: null, //关注
    };
  },
  // mounted(){
  //   this.avatarUrl=this.$store.state.user.profile.avatarUrl
  // },
  methods: {
    /**手机号码验证 */
    phoneVerify() {
      if (this.phone == "") {
        this.phonemessage = "请输入手机号";
        return;
      } else {
        /**res.data.exist=1说明有此账号 */
        _PhoneVerify(this.phone).then((res) => {
          if (res.data.exist != 1) {
            this.phonemessage = "手机号错误";
            console.log(res);
          } else {
            this.phonemessage = "";
          }
        });
      }
    },
    // 验证码验证
    // captchaVerify() {
    //   if (this.captcha == "") {
    //     this.captchamessage = "请输入验证码";
    //   }else{
    //     _VerifyCaptcha(this.phone, this.captcha).then((res) => {
    //       // if(res.code!=200){
    //       //   console.log(123);
    //       // }
    //   });
    //   }

        
   
   
      
    // },
    //昵称验证
    nicknameVerify() {
      if (this.nickname == "") {
        this.nicknamemessage = "请输入昵称";
      }
    },
    // 登录
    login() {
      _Login(this.phone, this.password).then((res) => {
        if (res.data.code != 200) {
          this.passwordmessage = "密码错误";
        } else {
          this.$store.commit("getUser", res.data);
          this.avatarUrl = res.data.profile.avatarUrl;
          this.nickname = res.data.profile.nickname;
          this.authority = res.data.profile.authority;
          this.followeds = res.data.profile.followeds;
          this.follows = res.data.profile.follows;
          this.passwordmessage = "";
          this.dialogFormVisible = false;
          this.showLogin = false;
        }
      });
    },
    //获取验证码
    GetCaptcha() {
      _getCaptcha(this.phone).then((res) => {
        if (this.phone != null) {
          console.log(res);
        }
      });
    },
    // 去注册
    GoRegister() {
      this.dialogFormVisible2 = true;
    },
    // 注册
    Register() {
      _Register(this.phone, this.password, this.captcha, this.nickname).then(
        (res) => {
          if (res.data.code == 505) {
            console.log("昵称已被占用");
          }
        }
      );
    },
  },
};
</script>


<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.successlogin {
  width: 100%;
  height: 100%;
}
.logo {
  margin-top: 10px;
  height: 40px;
}
.logo img {
  width: 40px;
}
.hahahaha {
  padding-top: 30px;
  height: 50px;
  width: 100%;
  display: flex !important;
  align-items: center;
  padding-bottom: 20px;
}
.headimg {
  margin-left: 20px;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  overflow: hidden;
}
.headimg img {
  height: 100%;
}
.nickname {
  padding-left: 10px;
  /* font-size: 13px; */
}
.userinfo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(182, 182, 182, 0.432);
}
.userinfo .tit:nth-child(-n + 2) {
  border-right: 1px solid rgba(134, 134, 134, 0.473);
}
.tit {
  flex: 1;
  /* height: 100%; */
  text-align: center;
  font-size: 13px;
}
.edit {
  margin-left: auto;
  padding-right: 10px;
}
</style>