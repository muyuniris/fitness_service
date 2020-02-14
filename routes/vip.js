var express = require('express');
var router = express.Router();
const vipCtrl = require("../controllers/vipCtrl");


/* GET users listing. */
router.post('/getData',vipCtrl.getData);


module.exports = router;