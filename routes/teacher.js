const express = require('express');
const router = express.Router();
const teacherCtrl = require('../controllers/teacherCtrl');
var multer  = require('multer');
// 上传文件配置
var storage = multer.diskStorage({
  destination: function (req, file, cb) { // 设置上传文件存放路径
    cb(null, 'public/images/uploads/'); // 该文件夹必须先创建
  },
  filename: function (req, file, cb) { // 上传文件文件名配置
    // file.originalname 获取原文件名及后缀名
    var fileArr = file.originalname.split(".");
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileArr[fileArr.length - 1]);
  }
});

// 添加配置文件到 multer 对象
var upload = multer({
  storage: storage
});


router.post('/getData', teacherCtrl.getData);
router.post('/upload', upload.single('file'),teacherCtrl.upload);
router.post('/add',teacherCtrl.add);
router.post('/getDetail',teacherCtrl.getDetail);
router.post('/alter',teacherCtrl.alter);
router.post('/del',teacherCtrl.del);
router.post('/getRate',teacherCtrl.getRate);
router.post('/rate',teacherCtrl.rate);
router.post('/getRateCount',teacherCtrl.getRateCount);
router.post('/getTeacher',teacherCtrl.getTeacher);
router.post('/alterTeacher',teacherCtrl.alterTeacher);
router.post('/getCourse',teacherCtrl.getCourse);
router.post('/getCourseDetail',teacherCtrl.getCourseDetail);
router.post('/getTop',teacherCtrl.getTop);


// router.post('/confirm', teacherCtrl.confirm);

module.exports = router;