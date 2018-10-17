const dbConfig = {
    charset: "UTF8_GENERAL_CI",  //连接字符集
    LIMIT: 50,   //最多连接数
    HOST: 'localhost',  //域名
    USER: 'root',    //用户名
    PASS: 'cai123456',  //用户密码
    NAME: 'my_blog',  //数据库名
    PORT: '3306',     //服务端口
    multipleStatements: true  //是否允许执行多条sql语句
}

export = dbConfig