var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlLib = require('./mysql')
/* GET users listing. */
router.get('/set/:user/:type/:price/:switch', function (req, res, next) {
    /*res.send({
        res: req.params
    });*/
    var params = req.params
    if (params.area) {
        mysqlLib.startconnect('gold')
        mysqlLib.selectValues('data', params.user, params.type).then((result) => {
            if (Array.isArray(result) && result.length > 0) {
                saveUserInfo()
            }
            mysqlLib.endconnect()
            res.send(result);
        })
    } else {
        res.send({
            code: 'E'
        })
    }
});
router.get('/get/:user/:type/:price/:switch', function (req, res, next) {
    /*res.send({
        res: req.params
    });*/
    var params = req.params
    if (params.area) {
        mysqlLib.startconnect('gold')
        mysqlLib.selectValues('data', params.user, params.type).then((result) => {
            if (Array.isArray(result) && result.length > 0) {
            }
            mysqlLib.endconnect()
            res.send(result);
        })
    } else {
        res.send({
            code: 'E'
        })
    }
});
function saveUserInfo(data, database) {
    mysqlLib.startconnect(database)
    let arr = []
    if (data) {
        arr.push(
            [{
                name: 'user',
                content: data.user
            },
                {
                    name: 'buy_price',
                    content: data.buy_price
                },
                {
                    name: 'sell_price',
                    content: data.sell_price
                },
                {
                    name: 'switch',
                    content: data.switch
                },
                {
                    name: 'date',
                    content: mysqlLib.getDate("YYYY-MM-DD")
                },
                {
                    name: 'time',
                    content: mysqlLib.getDate("hh:mm:ss")
                }])
    }
    mysqlLib.insertValues("data", arr)
}
module.exports = router;
