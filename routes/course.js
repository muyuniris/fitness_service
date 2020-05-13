var express = require('express');
var router = express.Router();
const courseCtrl = require("../controllers/courseCtrl");


/* GET users listing. */
router.post('/getData',courseCtrl.getData);
router.post('/add',courseCtrl.add);
router.post('/getDetail',courseCtrl.getDetail);
router.post('/alter',courseCtrl.alter);
router.post('/del',courseCtrl.del);
router.post('/getPlan',courseCtrl.getPlan);
router.post('/getCourse',courseCtrl.getCourse);
router.post('/getTeacher',courseCtrl.getTeacher);
router.post('/getPlace',courseCtrl.getPlace);
router.post('/addPlan',courseCtrl.addPlan);
router.post('/delPlan',courseCtrl.delPlan);
router.post('/getPlanDetail',courseCtrl.getPlanDetail);
router.post('/alterPlan',courseCtrl.alterPlan);
router.post('/getPlanOneDay',courseCtrl.getPlanOneDay);
router.post('/getTop',courseCtrl.getTop);
module.exports = router;