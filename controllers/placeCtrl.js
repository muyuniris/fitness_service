const placeModel = require("../models/placeModel.js");

module.exports = {
  // 获取用户信息
  getData: (req, res) => {
    console.log("收到",req.body);
    var name = req.body.name?'%'+req.body.name+"%":'%';
    placeModel.getTotal([name],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查到课程总数：",count);
      var options = [name];
     
      options.push((req.body.currentPage-1)*req.body.pageSize);
      options.push(req.body.pageSize);

      placeModel.getData(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败",
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

// 新增用户信息
  add:(req,res)=>{
    console.log(req.body);
    var name = req.body.name;
    var info = req.body.info||null;
    var img = req.body.img||'/images/img.jpg';
    var price = req.body.price;
    placeModel.add([name,info,img,price],(err,data)=>{
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

  //获取单个信息详情
  getDetail:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    placeModel.getDetail(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查询的数据为",data);
      res.json({
        code:"200",
        data:data[0]
      })
    })
  },

  alter:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var price = req.body.price;
    var name = req.body.name;
    var info = req.body.info||null;
    var img = req.body.img||'/images/img.jpg';
    placeModel.alter([name,info,img,price,id],(err,data)=>{
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
    placeModel.del(id,(err,data)=>{
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
  }
}