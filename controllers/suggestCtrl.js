const suggestModel = require("../models/suggestModel.js");

module.exports = {
  // 获取用户信息
  getData: (req, res) => {
    console.log("收到",req.body);
    var name = req.body.name?"%"+req.body.name+"%":'%';
    var startTime = req.body.startTime||null;
    var endTime = req.body.endTime||null;
    suggestModel.getTotal({name:name,startTime:startTime,endTime:endTime},(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查到建议总数：",count);
      var options = {
        name:name,
        startTime:startTime,
        endTime:endTime,
        current:(req.body.currentPage-1)*req.body.pageSize,
        size:req.body.pageSize
      }

      suggestModel.getData(options,(err,data)=>{
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

// 新增建议信息
  add:(req,res)=>{
    console.log(req.body);
    var id = Number(req.body.id);
    var content = req.body.msg;
    var time = new Date();
    suggestModel.add([id,content,time],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("插入操作返回数据为：",data);
      res.json({
        code:'200',
        msg:"插入成功"
      })
    })
  },

  alter:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var name = req.body.name;

    suggestModel.alter([name,id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("修改数据结果",data);
      res.json({
        code:"200",
        msg:"修改成功"
      })
    })
  },

  del:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    suggestModel.del(id,(err,data)=>{
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
  getCount: (req,res)=>{
    console.log("收到的数据",req.body);
    suggestModel.getCount(null,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("结果：",data);

      res.json({
        msg:"查找成功",
        code:'200',
        data:data[0].n,
      })
    })
  },
}