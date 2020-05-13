var express = require('express');
var router = express.Router();
const vipCtrl = require("../controllers/vipCtrl");


/* GET users listing. */
router.post('/getData',vipCtrl.getData);
router.post('/add',vipCtrl.add);
router.post('/getDetail',vipCtrl.getDetail);
router.post('/alter',vipCtrl.alter);
router.post('/getUser',vipCtrl.getUser)
router.post('/alterUser',vipCtrl.alterUser);
router.post('/setVip',vipCtrl.setVip);
router.post('/income',vipCtrl.income);
router.post('/getBill',vipCtrl.getBill);
router.post('/getMoney',vipCtrl.getMoney);
module.exports = router;