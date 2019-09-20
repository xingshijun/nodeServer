const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var mysqlLib = require('./routes/mysql')
var schedule = require('node-schedule');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dd373Router = require('./routes/dd373');
const carRouter = require('./routes/car');
var request = require('request');
var app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dd373', dd373Router);
app.use('/car', carRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
let scheduleWork;

function scheduleCronstyle(reg, job) {
  scheduleWork = schedule.scheduleJob(reg, job);
}

function scheduleCancel() {
  scheduleWork.cancel()
}

const gameShopTypeIdList = [
  {name: '混沌石', GameShopTypeId: '5487403f-ad72-4e03-aa36-668fb0820676', max: 10},
  {name: '崇高石', GameShopTypeId: '569e1e6b-c714-45bd-b749-fd7a4140dc73', max: 1},
  {name: '链结石', GameShopTypeId: '2cf76eeb-6162-469a-be71-3c2643c98936', max: 20},
  {name: '幻色石', GameShopTypeId: 'c6bc2988-f52c-4452-ad8c-6efb3b8370b4', max: 20},
  {name: '工匠石', GameShopTypeId: 'a8a0ae4f-6345-4b14-bbce-b5e9b03b431b', max: 20},
  {name: '改造石', GameShopTypeId: 'f005085f-f3ed-4f5e-966a-b01f923b1e6c', max: 20},
  {name: '重铸石', GameShopTypeId: 'df939842-3aac-4acb-974f-5449d51d2d30', max: 30},
  {name: '神圣石', GameShopTypeId: '2759e988-5193-4c68-accf-dfd1ddccbbb7', max: 1},
  {name: '点金石', GameShopTypeId: '962e66eb-f6ca-4b33-a08c-0647a9358ac8', max: 10},
  {name: '制图钉', GameShopTypeId: '08a45560-464e-413e-a6f6-89a2c77b2fb6', max: 20},
  {name: '后悔石', GameShopTypeId: 'e26125b1-4e69-4ab2-9e8c-9b53c0ba4125', max: 40},
  {name: '机会石', GameShopTypeId: '03648c9f-fa98-4ec0-8d1f-e155e35817e7', max: 20},
  {name: '银币', GameShopTypeId: '02fbeee7-54ae-46da-bdfa-0354cd3ef90d', max: 30},
  {name: '富豪石', GameShopTypeId: '68f170da-786f-4593-a4be-c9a433fbffc8', max: 10},
  {name: '瓦尔宝珠', GameShopTypeId: 'a301a564-5bd8-4f44-9e50-36c0ea7d4b5f', max: 10},
  {name: '宝石匠的棱镜', GameShopTypeId: 'ef5390ff-f2ae-47cb-be23-bcec1d12ce83', max: 20},
  {name: '剥离石', GameShopTypeId: '912c40f182ef4844804d981ebf189a93', max: 1}
]
const gameOtherIdList = {
  poe_forever: "ffe3de08e3f84438a9b30bf17cca637f_a9954d9b54c54183a8ab64ee84e6ab7b",
  poe_s8: "ffe3de08e3f84438a9b30bf17cca637f_211495dd6d5d4df49e1f7bb387329d64",
  poe_s9: "ffe3de08e3f84438a9b30bf17cca637f_9f5946a474b24eb9890d8ee8b0217b83",
}

const ajax = (url, param) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: url,
      form: param
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

function getSellData({GameShopTypeId, GameOtherId, result}) {
  return new Promise((resolve, reject) => {
    ajax("http://api.dd373.com/Shop/GetNeedShopList", {
      GameId: '7a7b84dc-74c9-441f-bb23-f3374169d4ff',
      GameShopTypeId: GameShopTypeId,
      GameOtherId: GameOtherId
    }).then((data) => {
      let arr = JSON.parse(data)
      if (arr && arr.length > 0) {
        result.sell_price = arr[0].singleprice
        resolve(result)
      } else {
        result.sell_price = 0
        resolve(result)
      }
      // saveToMySQL(JSON.parse(data), database)
    })
  })

}

function getBuyData({GameShopTypeId, GameOtherId, database, name}) {
  return new Promise((resolve, reject) => {
    ajax("http://api.dd373.com/Shop/GetShopList", {
      GameId: '7a7b84dc-74c9-441f-bb23-f3374169d4ff',
      GameShopTypeId: GameShopTypeId,
      GameOtherId: GameOtherId
    }).then((data) => {
      let arr = JSON.parse(data)
      if (arr && arr.length > 0) {
        getSellData({
          GameShopTypeId: GameShopTypeId, GameOtherId: GameOtherId, database: database, result: arr[0]
        }).then((data) => {
          data.name = name
          saveToMySQL([data], database)
          resolve()
        }).catch(() => {
          // reject()
        })
      } else {
        resolve()
        // reject()
      }
    })
  })

}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function dealData(database) {
  let GameOtherId = gameOtherIdList[database]
  for (let i = 0; i < gameShopTypeIdList.length; i++) {
    await sleep(500)
    await getBuyData({
      GameShopTypeId: gameShopTypeIdList[i].GameShopTypeId,
      GameOtherId: GameOtherId,
      database: database,
      name: gameShopTypeIdList[i].name
    })
  }
}

/*
[
  {
    "id": "358677840",
    "trade": "担保",
    "number": "1",
    "unit": "个混沌石",
    "amount": "413.0000",
    "singleprice": "0.0823244",
    "price": "34.00"
  }
]
*/

function saveToMySQL(data, database) {
  mysqlLib.startconnect(database)
  let arr = []
  if (data && data.length > 0) {
    arr.push(
      [{
        name: 'stone_name',
        content: data[0].name
      },
        {
          name: 'buy_price',
          content: data[0].singleprice
        },
        {
          name: 'sell_price',
          content: data[0].sell_price
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

function getDD373forever() {
  dealData('poe_forever').then(() => {
    console.log("永久区查询完毕");
    mysqlLib.endconnect()
  })
}

function getDD373S9() {
  dealData('poe_s9').then(() => {
    console.log("S9查询完毕");
    mysqlLib.endconnect()
  })
}

/*setTimeout(() => {
  scheduleCronstyle('0 0 * * * *', () => {
    getDD373S9()
    console.log("整点查询", new Date().toLocaleString());
  })
  scheduleCronstyle('0 30 * * * *', () => {
    getDD373forever()
    console.log("半点查询", new Date().toLocaleString());
  })
}, 2000)*/

