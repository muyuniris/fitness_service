var express = require('express');
var router = express.Router();
const orderCtrl = require("../controllers/orderCtrl");


/* GET users listing. */
router.post('/getCourse',orderCtrl.getCourse);
router.post('/delCourse',orderCtrl.delCourse);
router.post('/getTeacher',orderCtrl.getTeacher);
router.post('/delTeacher',orderCtrl.delTeacher);
router.post('/getPlace',orderCtrl.getPlace);
router.post('/delPlace',orderCtrl.delPlace);
router.post('/orderCourse',orderCtrl.orderCourse);
router.post('/selectCourse',orderCtrl.selectCourse);
router.post('/courseList',orderCtrl.courseList);
router.post('/delCourseOrder',orderCtrl.delCourseOrder);
router.post('/teacherTime',orderCtrl.teacherTime);
router.post('/selectTeacher',orderCtrl.selectTeacher);
router.post('/orderTeacher',orderCtrl.orderTeacher);
router.post('/teacherList',orderCtrl.teacherList);
router.post('/delTeacherOrder',orderCtrl.delTeacherOrder);
router.post('/placeTime',orderCtrl.placeTime);
router.post('/selectPlace',orderCtrl.selectPlace);
router.post('/orderPlace',orderCtrl.orderPlace);
router.post('/placeList',orderCtrl.placeList);
router.post('/delPlaceOrder',orderCtrl.delPlaceOrder);
router.post('/orderCount',orderCtrl.orderCount);
router.post('/teacherData',orderCtrl.teacherData);
module.exports = router;
