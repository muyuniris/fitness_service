var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/usersCtrl");


/* GET users listing. */
router.post('/userLogin',userCtrl.userLogin); 
router.post('/managerLogin',userCtrl.managerLogin); 
router.post('/teacherLogin',userCtrl.teacherLogin); 
router.post('/register',userCtrl.register);
router.post('/findTel',userCtrl.findTel);
router.post('/lock',userCtrl.lock);
router.post('/setPwd',userCtrl.setPwd);
router.post('/alterPwd',userCtrl.alterPwd);
router.post('/getTel',userCtrl.getTel);
router.post('/verify',userCtrl.verify);
router.post('/alterTel',userCtrl.alterTel);
router.post('/getCount',userCtrl.getCount);


module.exports = router;
