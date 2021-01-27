module.exports={
  publicPath: process.env.NODE_ENV === 'production' ? '/fds_music/' : '/',

  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'router':'@/router',
        'store':'@/store',
        'views':'@/views',

      }
    }
  }
}