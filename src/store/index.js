import Vue from 'vue'
import Vuex from 'vuex'
import {_getUserMusic} from 'network/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用于当打开dialog后隐藏slider，因为slider会浮在dialog上
    isShowSlider: true,
    //是否显示loading
    isloading: false,
    // 用户信息
    user: null,//保存用户信息
    SongList: null,//用户歌单
    uid: null,//用户id
    cookie: '',
    // MusicList:null,//用户歌单（更新后）
  },
  mutations: {
    // 进度条的显示
    changeisShowSlider(state) {
      state.isShowSlider = !state.isShowSlider
    },
    // 加载页面的显示
    showLoading(state) {
      state.isloading = true;
    },
    hiddenLoading(state) {
      state.isloading = false;
    },
    // 用户信息
    getUser(state,obj){
      state.user=obj;
      state.uid=obj.account.id;
      state.cookie=obj.cookie;
      _getUserMusic(state.uid).then(res=>{
        state.SongList=res.data.playlist
      })
    },
    getUserList(state,newplaylist){
      state.SongList.splice(1,0,newplaylist)
    },
    //删除用户歌单
    deleteUserList(state,index){
      state.SongList.splice(index,1)
    },
    //收藏歌单
    SubscribeList(state,playlist){
      state.SongList.splice(1,0,playlist)
      // _subscribeList(1, id).then((res) => {
      //      console.log(111);
      //     });
    },
    //取消收藏 
    DeleteList(state,i){
      state.SongList.splice(i,1)
    }
  },
  actions: {
  },
  modules: {
  }
})
