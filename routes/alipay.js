var express = require('express');
var router = express.Router();
const alipayCtrl = require("../controllers/alipayCtrl");

router.post('/pay',alipayCtrl.pay);
router.post('/get',alipayCtrl.get);


module.exports = router;