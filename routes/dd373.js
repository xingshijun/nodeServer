var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlLib = require('./mysql')
/* GET users listing. */
router.get('/:area/:stone_name/:startDate/:endDate', function (req, res, next) {
	/*res.send({
		res: req.params
	});*/
	var params = req.params
	var database = ''
	if (params.area) {
		switch (params.area) {
			case 'forever':
				database = 'poe_forever'
				break
			case 's8':
				database = 'poe_s8'
				break
			case 's9':
				database = 'poe_s9'
				break
		}
		mysqlLib.startconnect(database)
		mysqlLib.selectValues('data', params.stone_name, params.startDate, params.endDate).then((result) => {
			result.map((v) => {
				return v.date = mysqlLib.getDate('YYYY-MM-DD', v.date)
			})
			mysqlLib.endconnect()
			res.send(result);
		})
	} else {
		res.send({
			code: 'E'
		})
	}


});


module.exports = router;
