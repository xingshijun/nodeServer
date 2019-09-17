var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
router.get('/:car/:direction', function (req, res, next) {
    var params = req.params
    var stopid, sid
    switch (params.car) {
        case "ncx" :
            if (params.direction == 0) {
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
            if (params.direction == 0) {
                stopid = '18.'
            } else {
                stopid = '19.'
            }
            sid = '967c4b5e26a842222bf5024b38d75bd0'
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
                "cookie": "aliyungf_tc=AQAAAM4rYQ+cNwYABiSotJ7UyRVK5/ZT; acw_tc=707c9fc915686011934088110e5a2b37c6227ff44670125206a76ce9cfcacf; souid=eSgsNF1+9GmaMAdAaoZRAg==; _ga=GA1.2.1983768423.1568601192; last_search_records=eyJpdiI6InNSOEgxWmNKeFFLOW1zc3dTQkZpMEE9PSIsInZhbHVlIjoiNlFRQ0VJQW0zTkZLSzJmWlwvbHlCM295R056c1JReU4yakpMWjI1aHZPc1JpRWRGcXltZ2dXYWhVY21JSFhhdXpEcklNYWt4eVNwZmdVM1poeXBObEtRPT0iLCJtYWMiOiIxOGI5OGMzNWM4YzI2YzdlMjk2OTBiODMwYmY3M2QzMGYzZmMyM2VlZTk5NjM5NjgxMTI1MTNjMDgxMDYxZmM4In0%3D; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNF1/Oa6aMAdAaqW4Ag==; XSRF-TOKEN=eyJpdiI6IlQxSWtiUkRpZE5VUitpUjVISTAyTHc9PSIsInZhbHVlIjoiVkRcL3JvN1lPdlFTUmYwZFJFcHdiRk9JMGxRNGpXNGxIakg2bzZlMUlwSks1MFwvV1lpNXJcL2VOM3M1VnB2UFUwam5IOE1uaCt2YUVoSHpmTGtHT0JtRnc9PSIsIm1hYyI6IjEwNGQ5NzlhMDBlZjhhMGNhYTU4NDI0NjYzZGMyYWYwMTZiOGFlNTAyZDFjZTQzZjJiODgyOTdjNGU0OTRmNjcifQ%3D%3D; _session=eyJpdiI6IjFVVkIwRDFacEk5TnREY1pGTEJBVnc9PSIsInZhbHVlIjoiZzNmSVZZQktrTGJwZjBsazlkeFlmZmZNTUlHWitFNTVrSE1panVzUXhcL05ldUdmNWdiQm9naEZuMDkxa1JOMjM2cmJ1YlBaZzZIV2d4c2ZjYXYrcnFnPT0iLCJtYWMiOiIxNGQxZDYzOGZmODI5NjNlYjkxZjQ5Y2NjODZiZGE2MDAxZmRjMzE4NmMyNTM3MWJiYzRkNmI0ODllYzkxNGZmIn0%3D; _gat=1; SERVERID=c6de652ace7b1e6134145ef11b72ccf7|1568621461|1568621452",
                "host": "shanghaicity.openservice.kankanews.com",
                "origin": "https://shanghaicity.openservice.kankanews.com",
                "Referer": "https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/5ab14062ac7013eada42e1512d73728c",
                "sec-fetch-dest": "empty",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?F",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/1.02.1907300 MicroMessenger/7.0.4 Language/zh_CN webview/15686011774651920 webdebugger port/51616",
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

function getCar(direction, stopid, sid) {
    return new Promise((resolve, reject) => {
        ajax("https://shanghaicity.openservice.kankanews.com/public/bus/Getstop", {
            stoptype: direction,
            stopid: stopid,
            sid: sid,
        }).then((data) => {
            resolve(data)
        })
    })

}

module.exports = router;
