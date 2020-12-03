module.exports = {
  exportPathMap: function(){
    return {
      '/' : {page: '/' }
    }
  },
  env: {
    WEBAPP_URL : process.env.APP_STAGE === 'local' ? 'http://localhost:3000' : 'https://nexttest-ten.vercel.app',
  },
}