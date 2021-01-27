//配置路由相关信息
import VueRouter from "vue-router";
import Vue from 'vue'



const DiscoverMusic = () => import('views/discover/DiscoverMusic')

const Recommend = () => import('views/discover/childRouter/Recommend')

// const Individuation = () => import('views/discover/childRouter/Individuation')

const BroadCast = () => import('views/discover/childRouter/BroadCast')
const MusicListCategory = () => import('views/discover/childRouter/MusicListCategory')
const MusicRankList = () => import('views/discover/childRouter/MusicRankList')
const NewSongs = () => import('views/discover/childRouter/NewSongs')
const NewSong = () => import('views/discover/childRouter/newsongChild/NewSong')
const NewAlbum = () => import('views/discover/childRouter/newsongChild/NewAlbum')


const MV = () => import('views/mv/MV')
const MvSelect = () => import('views/mv/childRouter/MvSelect')
const MvExclusive = () => import('views/mv/childRouter/MvExclusive')
const MvAll = () => import('views/mv/childRouter/MvAll')

const DetailMvRouter = () => import('views/detailmv/DetailMvRouter')

const Search = () => import('views/search/Search')

const SearchInfo = () => import('views/searchinfo/SearchInfo')

const Artist = () => import('views/artist/Artist')
const HotFif = () => import('views/artist/childRouter/HotFif')
const Album = () => import('views/artist/childRouter/Album')
const Detail = () => import('views/artist/childRouter/Detail')
const Mv = () => import('views/artist/childRouter/Mv')


const MusicList = () => import('views/musiclist/MusicList')

// const Dialog = () => import('views/musiclist/childRouter/Dialog')

const PrivateList = () => import('views/privatelist/PrivateList')

const AlbumDetail = () => import('views/album/AlbumDetail')

const User = () => import('views/user/User')
const First = () => import('views/user/childRouter/First')

const Mine = () => import('views/mine/Mine')



//1.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/discover'
  },
  {
    path: '/discover',
    component: DiscoverMusic,
    children: [
      {
        path: '/',

        redirect: '/discover/recommend'
      },
      {
        path: '/discover/recommend',
        component: Recommend,

      },
      {
        path: '/discover/category',
        component: MusicListCategory
      },
      {
        path: '/discover/broadcast',
        component: BroadCast
      },
      {
        path: '/discover/ranklist',
        component: MusicRankList
      },
      {
        path: '/discover/newsongs',
        component: NewSongs,
        children: [
          {
            path: '/',
            redirect: '/discover/newsongs/newsong'
          },
          {
            path: '/discover/newsongs/newsong',
            component: NewSong
          },
          {
            path: '/discover/newsongs/newalbum',
            component: NewAlbum
          }
        ]
      },
    ]
  },
  {
    path: '/MV',
    component: MV,
    children: [
      {
        path: '/',
        redirect: '/MV/MvSelect'
      },
      {
        path: '/MV/MvSelect',
        component: MvSelect
      },
      {
        path: '/MV/MvExclusive',
        component: MvExclusive
      },
      {
        path: '/MV/MvAll',
        component: MvAll
      },


    ]
  },
  {

    path: '/MV/:id',
    component: DetailMvRouter

  },
  {
    path: '/Search',
    component: Search,
  },
  {
    path: '/searchInfo/:key',
    component: SearchInfo,
  },
  {
    path: '/artist/:key',
    component: Artist,
    children: [
      {
        path: '/',
        redirect: '/artist/HotFif/:key'
      },
      {
        path: '/artist/HotFif/:key',
        component: HotFif
      },
      {
        path: '/artist/Mv/:key',
        component: Mv
      },
      {
        path: '/artist/Album/:key',
        component: Album
      },
      {
        path: '/artist/Detail/:key',
        component: Detail
      },



    ]
  },
  {
    path: '/musiclist/:id',
    component: MusicList,
  },
  // {
  //   path: '/dialog/:id',
  //   component: Dialog

  // },
  {
    path: '/privateList',
    component: PrivateList
  },
  {
    path: '/albumDetail/:id',
    component: AlbumDetail
  },
  // 用户路由
  {
    path: '/user',
    component: User,
    children: [
      {
        path: '/',
        redirect: '/user/first'
      },
      {
        path:'/user/first',
        component:First
      }
    ]
  },
  //我的路由
  {
    path:'/mine',
    component:Mine
  }


]
//2.创建VueRouter对象
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  //配置路由和组件之间的应用关系
  routes
})

//3.将router对象传入到vue实例中,通过export default router，然后再main.js中导入加挂载
export default router