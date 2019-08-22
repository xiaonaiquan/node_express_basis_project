//mysql配置文件
mysql = {

    host: "127.0.0.1", //这是数据库的地址
  
    user: "root", //需要用户的名字
    
    port: 3306,
  
    password: "123456", //用户密码 ，如果你没有密码，直接双引号就是
  
    database: "mytest" //数据库名字
  
  } //好了，这样我们就能连接数据库了

module.exports = mysql; //用module.exports暴露出这个接口