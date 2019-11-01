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

startconnect('gold')
createTable('data', [
    {
        name: 'user',
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
        name: 'switch',
        type: "number",
    },
    {
        name: 'date',
        type: "date",
    },
    {
        name: 'time',
        type: "time",
    },
])

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
