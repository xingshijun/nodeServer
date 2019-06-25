var mysql = require('mysql');
let connection

function startconnect(database) {
  console.log("数据库", database);
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xing1994',
    database: database
    // database: 'poe_s8'
  });

  connection.connect();
}

/*startconnect('poe_forever')
createTable('data', [
  {
    name: 'stone_name',
    type: "string",
    num: 10
  },
  {
    name: 'buy_price',
    type: "number",
    num: 10
  },
  {
    name: 'sell_price',
    type: "number",
    num: 10
  },
  {
    name: 'date',
    type: "date",
  },
  {
    name: 'time',
    type: "time",
  },
])*/

function endconnect() {
  connection.end();
}


function getType(type) {
  let result = "";
  switch (type.toLowerCase()) {
    case "string":
      result = "VARCHAR";
      break;
    case "number":
      result = "FLOAT";
      break;
    case "date":
      result = "DATE";//YYYY-MM-DD
      break;
    case "time":
      result = "TIME";//HH:MM:SS
      break;
    case "year":
      result = "YEAR";//YYYY
      break;
    case "datetime":
      result = "DATETIME";//YYYY-MM-DD HH:MM:SS
      break;
    case "timestamp":
      result = "TIMESTAMP";//YYYYMMDD HHMMSS /  时间戳
      break;
    default:
      result = "VARCHAR";
  }
  return result
}

// 创建表
function createTable(tableName, param = []) {
  let paramArr = []
  for (let i = 0; i < param.length; i++) {
    if (param[i].num) {
      paramArr.push(param[i].name + " " + getType(param[i].type) + "(" + param[i].num + ")")
    } else {
      paramArr.push(param[i].name + " " + getType(param[i].type))
    }

  }
  let sqlstring = `Create Table ${tableName} (${paramArr.join(', ')})`
  console.log(sqlstring);
  connection.query(sqlstring, function (err, results, fields) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------CREATE----------------------------');
    console.log('CREATE TABLE:', results);
    console.log('------------------------------------------------------------\n\n');
  });
}

// 插入数据
function insertValues(tableName, param = []) {
  for (let i = 0; i < param.length; i++) {
    let keyList = []
    let valueList = []
    for (let j = 0; j < param[i].length; j++) {
      keyList.push(param[i][j].name)
      valueList.push('"' + param[i][j].content + '"')
    }
    let sqlstring = `Insert into ${tableName} (${keyList.join(',')}) Values(${valueList.join(',')})`;
    connection.query(sqlstring, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }

     /* console.log('--------------------------INSERT----------------------------');
      console.log('INSERT ID - ', result);
      console.log('------------------------------------------------------------\n\n');*/
    });
  }


}

// 更新数据
function updateValues() {
  let sqlstring = "Update MYTABLE Set name = 'Michael Jordan' Where sex = 'm'";
  connection.query(sqlstring, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------UPDATE----------------------------');
    console.log('UPDATE affectedRows - ', result.affectedRows);
    console.log('------------------------------------------------------------\n\n');
  });
}

// 查询数据
function selectValues(tableName) {
  let sqlstring = `Select * From ${tableName}`;
  connection.query(sqlstring, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------SELECT---------------------------');
    console.log('SELECT - ', result);
    console.log('------------------------------------------------------------\n\n');
  });
}

// 删除数据
function deleteValues() {
  let sqlstring = "Delete From MYTABLE";
  connection.query(sqlstring, function (err, result) {
    if (err) {
      console.log('[DELETE ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows - ', result.affectedRows);
    console.log('------------------------------------------------------------\n\n');
  });
}

// 删除表格
function dropTable(tableName) {
  let sqlstring = `Drop Table ${tableName}`;
  connection.query(sqlstring, function (err, result) {
    if (err) {
      console.log('[DROP ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------DROP-----------------------------');
    console.log('DROP TABLE :', result.affectedRows);
    console.log('------------------------------------------------------------\n\n');
  });
}

function getDate(format) {//YYYYMMDD hhmmss
  let nowDate = new Date()
  let year = nowDate.getFullYear()
  let month = nowDate.getMonth() + 1
  let day = nowDate.getDate()
  let hour = nowDate.getHours()
  let minutes = nowDate.getMinutes()
  let seconds = nowDate.getSeconds()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return format.replace("YYYY", year).replace("MM", month).replace("DD", day).replace("hh", hour).replace("mm", minutes).replace("ss", seconds)

}

module.exports = {
  startconnect,
  endconnect,
  createTable,
  insertValues,
  updateValues,
  selectValues,
  deleteValues,
  dropTable,
  getDate,
}