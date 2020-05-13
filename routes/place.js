var express = require('express');
var router = express.Router();
const placeCtrl = require("../controllers/placeCtrl");


/* GET users listing. */
router.post('/getData',placeCtrl.getData);
router.post('/add',placeCtrl.add);
router.post('/getDetail',placeCtrl.getDetail);
router.post('/alter',placeCtrl.alter);
router.post('/del',placeCtrl.del);
module.exports = router;