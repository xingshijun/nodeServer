var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
router.get('/:car/:direction', function (req, res, next) {
    var params = req.params
    var stopid, sid
    switch (params.car) {
        case "ncx" :
            if (params.direction == 0) {// direction 0 上班 1 回家
                stopid = '5.'
            } else {
                stopid = '38.'
            }
            sid = '5ab14062ac7013eada42e1512d73728c'
            getCar(params.direction + '', stopid, sid).then(function (data) {
                res.send(data);
            })
            break
        case "pd28l" :
            if (params.direction == 0) {// direction 0 上班 1 回家
                stopid = '18.'
            } else {
                stopid = '19.'
            }
            sid = '967c4b5e26a842222bf5024b38d75bd0'
            getCar(params.direction + '', stopid, sid).then(function (data) {
                res.send(data);
            })
            break
        case "pd68l" :
            if (params.direction == 0) {// direction 0 上班 1 回家
                stopid = '30.'
            } else {
                stopid = '6.'
            }
            sid = '28a7cafbb30d7e79f93d439dd7696d21'
            getCar(params.direction + '', stopid, sid).then(function (data) {
                res.send(data);
            })
            break
        case "sj45l" :
            if (params.direction == 0) {// direction 0 上班 1 回家
                stopid = '13.'
            } else {
                stopid = '11.'
            }
            sid = '522f13b40d7c9d93aba7d0007d4c9be0'
            getCar(params.direction + '', stopid, sid).then(function (data) {
                res.send(data);
            })
            break
        case "87l" :
            if (params.direction == 0) {// direction 0 上班 1 回家
                stopid = '17.'
            } else {
                stopid = '6.'
            }
            sid = '9d82738ff77f4297cec061f5b4d965c1'
            getCar(params.direction + '', stopid, sid).then(function (data) {
                res.send(data);
            })
            break
        case "qb2l" :
            if (params.direction == 0) {// direction 0 上班 1 回家
                stopid = '7.'
            } else {
                stopid = '9.'
            }
            sid = '1998e03a5b88776756e2fa979d2c2019'
            getCar(params.direction + '', stopid, sid).then(function (data) {
                res.send(data);
            })
            break
        default :
            res.send([{
                res: "暂不支持"
            }]);
    }
});
const ajax = (url, param) => {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'post',
            headers: {
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                "connection": "keep-alive",
                "cookie": "acw_tc=707c9fc915686011934088110e5a2b37c6227ff44670125206a76ce9cfcacf; _ga=GA1.2.1983768423.1568601192; souid=wKgBHF2IJSRusnPUFKwHAg==; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNF2IJUma6AdFbnyZAg==; _gat=1; last_search_records=eyJpdiI6ImR0XC9lZWNRbWhSWEdKeVAydkoxVDNRPT0iLCJ2YWx1ZSI6ImRXR1BRVk5ybXJVb1RJVVF5YmdMXC9tcXZEU1wvOUZkbjQ1R3pTeVRKWlordz0iLCJtYWMiOiJiNTIwMzdkODgyODI0YWRiMGY2MTRlMDJkYThhMmE1ZWU5ZjVmOWRiYjZlOTkyMWE3ZGI5OTI0OTM5NmUyMWMwIn0%3D; SERVERID=c6de652ace7b1e6134145ef11b72ccf7|1569203542|1569203529; XSRF-TOKEN=eyJpdiI6Ijd1ZkdtMXpoZ3F4Vm9wSzR2UE4zOHc9PSIsInZhbHVlIjoiR1lEQjdsSUhDdDFlN0tDZHR2RHI3TzkySnpWdGJjaHYzR1lXTlBUbk5acXpiTkM0U2dVSEpRWFYza2pKNG93T3lRQ1ZRMEdLbEtkNEpoNUd2T0V5cVE9PSIsIm1hYyI6IjQ0ZDFlYzJhZmE3ZGJiOGQ4YWEzZDEyZjY0NTFkMDdmYzQ4YjJlY2ExYWFkODYzYTQ2ZGQ2OTg3NmM2ZGM4YjIifQ%3D%3D; _session=eyJpdiI6IlwvM1pYNVh1a2hwU2lmRTBtTFwvdjhXZz09IiwidmFsdWUiOiJvcnRzR2JGTjAyeXBlQnQ5V0s1TzdrbWYyV2ZGVVhrbFhiZWlqMXlLUzl4b2o2VGpUMDVxNCtCTUltOXd2OGdmSTZOcW1wdjErd2NlNnd0eElzR3VNUT09IiwibWFjIjoiMzZhY2JhMWNkYTM0YWI4YWM1MGFlMTdiNmNlNWYyOWVkMjQ5OTM3OTdjNmI2YjZiOTVjOGRiOTcwZGJkOTJmNyJ9",
                "host": "shanghaicity.openservice.kankanews.com",
                "origin": "https://shanghaicity.openservice.kankanews.com",
                "Referer": "https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/" + param.sid,
                "sec-fetch-dest": "empty",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?F",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/1.02.1907300 MicroMessenger/7.0.4 Language/zh_CN webview/1569203522381249 webdebugger port/63788",
                "x-requested-with": "XMLHttpRequest",
            },
            form: param,
        }, function (error, response, data) {
            //如果请求成功则打印数据 否则显示错误信息
            if (!error && response.statusCode == 200) {
                resolve(data)
            } else {
                reject(error)
            }
        });
    })
}
router.get('/:idnum', function (req, res, next) {
    var params = req.params
    getCarSid(params.idnum).then(function (data) {
        res.send(data);
    })
});

function getCarSid(name) {
    return new Promise((resolve, reject) => {
        ajax("https://shanghaicity.openservice.kankanews.com/public/bus/get", {
            idnum: name,
        }).then((data) => {
            resolve(data)
        })
    })
}

function getCar(direction, stopid, sid) {
    return new Promise((resolve, reject) => {
        ajax("https://shanghaicity.openservice.kankanews.com/public/bus/Getstop", {
            stoptype: direction,
            stopid: stopid,
            sid: sid,
        }).then((data) => {
            console.log(data);
            resolve(data)
        })
    })

}

module.exports = router;
