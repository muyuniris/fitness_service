const express = require('express');
const router = express.Router();
const telCtrl = require('../controllers/telCtrl');



router.post('/getCode', telCtrl.getCode);

router.post('/confirm', telCtrl.confirm);

module.exports = router;