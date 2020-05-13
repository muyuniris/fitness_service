var express = require('express');
var router = express.Router();
const roleCtrl = require("../controllers/roleCtrl");


/* GET users listing. */
router.post('/getData',roleCtrl.getData);
router.post('/add',roleCtrl.add);
router.post('/getDetail',roleCtrl.getDetail);
router.post('/alter',roleCtrl.alter)
router.post('/myData',roleCtrl.myData)
module.exports = router;