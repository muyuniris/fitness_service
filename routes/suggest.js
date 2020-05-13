var express = require('express');
var router = express.Router();
const suggestCtrl = require("../controllers/suggestCtrl");


/* GET users listing. */
router.post('/getData',suggestCtrl.getData);
router.post('/add',suggestCtrl.add);
router.post('/alter',suggestCtrl.alter);
router.post('/del',suggestCtrl.del);
router.post('/getCount',suggestCtrl.getCount);
module.exports = router;