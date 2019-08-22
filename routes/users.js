var express = require('express');
var router = express.Router();
var mysql = require('../common/basicConnection');
var DBSQL = require('../model/DBSQL')

var mytesTable = new DBSQL('mytest.users', ['name'])

/* post users listing. */
router.post('/', function(req, res, next) {
    let mysqlSQL = ''
    console.log(req.body, '传的参数')
    if('_methods' in req.body)
    {

    }
    else
    {
        let testmsg = mytesTable.insert(req.body)
        mysqlSQL = testmsg
        console.log(mysqlSQL)
    }
    mysql.query(mysqlSQL, function(err, result) {
        if (result) {
            res.json({
                code: '200',
                data: result
            })
        } else {
            res.json({
                code: '500',
                msg: err
            })
        }
    })
});

router.post('/select',function(req,res,next){
    console.log(req.body,'传的参数');
    let sqlText = mytesTable.select('id',req.body.id);
    mysql.query(sqlText, function(err, result) {
        if (result) {
            res.json({
                code: '200',
                data: result
            })
        } else {
            res.json({
                code: '500',
                msg: err
            })
        }
    })
});

module.exports = router;
