const notifyModel = require("../models/notifyModel.js");


module.exports = {
  getData: (req, res) => {
    console.log("收到",req.body);
    var title = req.body.title?"%"+req.body.title+"%":'%';
    console.log(title);
    var startTime = req.body.startTime||null;
    var endTime = req.body.endTime||null;
    notifyModel.getTotal({title:title,startTime:startTime,endTime:endTime},(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查到建议总数：",count);
      var options = {
        title:title,
        startTime:startTime,
        endTime:endTime,
        current:(req.body.currentPage-1)*req.body.pageSize,
        size:req.body.pageSize
      }

      notifyModel.getData(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查找到的数据为：",data);
        res.json({
          code:"200",
          msg:"查找成功",
          data:{
            count:count[0].n,
            list:data
          }
        })
      })
    })
  },
  del:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    notifyModel.del(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("删除数据结果为：",data);
      res.json({
        code:"200",
        data:data[0]
      })
    })
  },
  add:(req,res)=>{
    console.log(req.body)
    var img = req.body.img;
    var title = req.body.title;
    var msg = req.body.msg;
    var time = new Date();
    notifyModel.add([[title,msg,img,time,null]],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查找到的数据为：",data);
      res.json({
        code:"200",
        msg:"修改成功",
      })
    })
  },
  alter:(req,res)=>{
    console.log(req.body)
    var id = Number(req.body.id);
    var img = req.body.img;
    var title = req.body.title;
    var msg = req.body.msg;
    var time = new Date();
    notifyModel.alter([title,msg,img,time,id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查找到的数据为：",data);
      res.json({
        code:"200",
        msg:"修改成功",
      })
    })
  },
  getList: (req, res) => {
    console.log("收到的数据为",req.body);
    var id = Number(req.body.id);
    var start = Number(req.body.start);
    var size = Number(req.body.size);
    notifyModel.getListTotal(id,(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查找到的为：",count);    
      notifyModel.getList([id,start,size],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查找到的数据为：",data);
        res.json({
          code:"200",
          msg:"查找成功",
          data:{
            count:count[0].n,
            list:data
          }
        })
      })
    })
  },
  getDetail:(req,res)=>{
    var id = Number(req.body.id)
    notifyModel.getDetail(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查找到的数据为：",data);
      res.json({
        code:"200",
        msg:"查找成功",
        data:data[0],
      })
    })
  }
}