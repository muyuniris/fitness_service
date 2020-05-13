var express = require('express');
var router = express.Router();
const notifyCtrl = require("../controllers/notifyCtrl");


/* GET users listing. */
router.post('/getData',notifyCtrl.getData);
router.post('/del',notifyCtrl.del);
router.post('/alter',notifyCtrl.alter);
router.post('/add',notifyCtrl.add);
router.post('/getList',notifyCtrl.getList);
router.post('/getDetail',notifyCtrl.getDetail);

module.exports = router;