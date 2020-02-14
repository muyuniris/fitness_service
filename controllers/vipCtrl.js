const vipModel = require("../models/vipModel.js");


module.exports = {
  // 登录
  getData: (req, res) => {
    console.log("收到的数据为",req.body);
    var size = req.body.pageSize;
    var start = (req.body.currentPage-1)*size;
    vipModel.getData([start,size],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        state: 0
      });
      console.log("查找到的数据为：",data);
      res.json({
        code:"200",
        msg:"查找成功",
        data:data
      })
    })
  }
}