var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/usersCtrl");


/* GET users listing. */
router.post('/login',userCtrl.login);


module.exports = router;
