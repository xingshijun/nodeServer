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
        case "pd68l" :
            if (params.direction == 0) {
                stopid = '30.'
            } else {
                stopid = '6.'
            }
            sid = '28a7cafbb30d7e79f93d439dd7696d21'
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
                "cookie": "acw_tc=707c9fc915686011934088110e5a2b37c6227ff44670125206a76ce9cfcacf; _ga=GA1.2.1983768423.1568601192; souid=eSgsNF2BjICZQQdBblGMAg==; last_search_records=eyJpdiI6InJmbEt0endpZ2JPVjJGUEpPZEF2eUE9PSIsInZhbHVlIjoiMWpsSWJvcXBXNVRMcHBYanFOQnlvKzBRQ2FsYUlQUWQwU3hJeW13XC9GcmJHaG5raXhiMlA2SWgySSt4cFZcL0F2IiwibWFjIjoiY2JiZjQxZjM0ZWI4NzkzYWVmMWViZWM2YTY1YmZlOWRmOTQyNjBjYmExOWRlMWRmOWRlOGUyYzVhOGNkMDdiOCJ9; aliyungf_tc=AQAAAHOcTFVY3QAABiSotM8VON+BCQz/; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNF2Bn8WZQQdBblcUAg==; XSRF-TOKEN=eyJpdiI6Ijc4elcwTVRWbUhFeGZLemVUdlRhQkE9PSIsInZhbHVlIjoiOUJKSEpWZXhEYjB2cHZiMU9sMEN3UXkweVRHZElYdnNXdlBPNGhyTEtWczJTVTVnVVBJTjFRckNHSTFEWXFtTld1TXlHSVZ0eGxnZ043XC9UaDBUVzF3PT0iLCJtYWMiOiIyMjE1MjA1YzM0NzBlYmY0ZmY1ZmYyN2VmNjNhMjk2NGJlMTI0N2M5MmJhZTI1NDU4NTYyNTQyMzIyZWFkM2M4In0%3D; _session=eyJpdiI6ImlibGMwUVJaUUxEVHBack83Q1FYdlE9PSIsInZhbHVlIjoiVWR2MU9YRHl6V2t4XC92cko0OFUxWlVWRmRYWkYzMXlvanVNaHo5XC9QdDhKcGQ0VHUzZmdrVCtEOUplWnhxVUdMZk96bFpHakJYRXZSUW5PVjZjMlRxdz09IiwibWFjIjoiY2QxOWUzNTA2NjU3ZDdlNDI0MWFiOGQ1YmM5Y2YxZjUzYjg0YWRjN2Y3N2I1YTBjNWMyZDU5MThiNDVkOWEyOSJ9; SERVERID=4f5f69a3e569b9cd359e6a82e64e12fb|1568776136|1568776133; _gat=1",
                "host": "shanghaicity.openservice.kankanews.com",
                "origin": "https://shanghaicity.openservice.kankanews.com",
                "Referer": "https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/" + param.sid,
                "sec-fetch-dest": "empty",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?F",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/1.02.1907300 MicroMessenger/7.0.4 Language/zh_CN webview/15687761282831258 webdebugger port/33217",
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
