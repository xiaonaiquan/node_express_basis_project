var mysql = require('mysql');
var $dbConfig = require('../config/mysql');

// 使用连接池，避免开太多的线程，提升性能
var pool = mysql.createPool($dbConfig);
//var connection = '';
/**
 * 对query执行的结果自定义返回JSON结果
 */
function responseDoReturn(res, result, resultJSON) {
    if (typeof result === 'undefined') {
        res.json({
            code: '201',
            msg: 'failed to do'
        });
    } else {
        res.json(result);
    }
};

/**
 * 封装query之sql带不占位符func
 */
function query(sql, callback) {
    // if(connection)
    // {
    //     console.log(11111);
    //     //next();
    // }
    // else{
    //     connection = mysql.createConnection({
    //         host: 'http://127.0.0.1',
    //         user: 'root',
    //         password: '123456',
    //         database: 'mytest'
    //       });
    //    // next();
    //     console.log(222222);
    // }
    // pool.getConnection(function(err, connection) {
    //     console.log('1111'+ err);
    //     connection.query(sql, function(err, rows) {
    //         callback(err, rows);
    //         //释放链接
    //         connection.release();
    //     });
    // });
    pool.getConnection(function(err, connection) {
        console.log(err)
        connection.query(sql, function(err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}

/**
 * 封装query之sql带占位符func
 */
function queryArgs(sql, args, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, args, function(err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}

//exports
module.exports = {
    query: query,
    queryArgs: queryArgs,
    doReturn: responseDoReturn
}