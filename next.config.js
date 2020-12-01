const now_server = false;

module.exports = {
  exportPathMap: function(){
    return {
      '/' : {page: '/' }
    }
  },
  env: {
    MYSQL_HOST : '35.243.114.6',
    MYSQL_DATABASE : 'test',
    MYSQL_USER : 'roivo',
    MYSQL_PASSWORD : 'gcpsqlnhs10345',
    WEBAPP_URL : process.env.APP_STAGE === 'local' ? 'http://localhost:3000' : 'https://nexttest-ten.vercel.app',
  },
}