var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/:command/:GameShopTypeId/:GameOtherId', function (req, res, next) {
  /*res.send({
    res: req.params
  });*/
  var params = req.params
  var url = "http://api.dd373.com/Shop"
  switch (params.command) {
    case 'GetShopList':
      url += "/GetShopList"
  }
  ajax(url, {
    GameId: '7a7b84dc-74c9-441f-bb23-f3374169d4ff',
    GameShopTypeId: params.GameShopTypeId,
    GameOtherId: params.GameOtherId
  }).then((data) => {
    res.send(data);
  })
});



module.exports = router;
