import axios from 'axios'
import $store from '@/store/index' 

let ajaxTimer=0;
export function request(config) {
  $store.commit('showLoading');
  //1.创建axios的实例
  const  instance=axios.create({
    baseURL:'http://localhost:3000',
  
    withCredentiweals: true,
    timeout:10000,


  })
  
  instance.defaults.withCredentials = true
  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(data=>{

    ajaxTimer++;
    return data
  },err=>{
    console.log(err);
    
  })
  //2.2.响应拦截
  instance.interceptors.response.use(data=>{
    ajaxTimer--;
        if(ajaxTimer==0)$store.commit('hiddenLoading');
    //console.log(res);
    return data
  },err=>{
    console.log(err);
  })
  //3.发送真正的网络请求
  
  return instance(config)
}
