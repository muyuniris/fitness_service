const roleModel = require("../models/roleModel.js");
const userModel = require("../models/usersModel.js");
const crypto = require("crypto"); // 加密模块，内置


module.exports = {
  // 获取用户信息
  getData: (req, res) => {
    console.log("收到的数据为",req.body);
    var name = req.body.name?'%'+req.body.name+'%':'%';
    var tel = req.body.tel?req.body.tel+'%':'%';
    var type = req.body.type?req.body.type+'%':"%";
    roleModel.getTotal([name,tel,type],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查找到的管理员数据为：",count);
      var options = [];
     
      options.push(name);
      options.push(tel);
      options.push(type);
      options.push((req.body.currentPage-1)*req.body.pageSize);
      options.push(req.body.pageSize);
      roleModel.getData(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查找到的管理员数据为：",data);
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
    var tel = req.body.tel;
    var name = req.body.name;
    var type = req.body.type;
    var pwd = tel.substring(4)
    console.log(pwd);
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(pwd).digest("hex"); // 加密
    userModel.register([tel,newPass,3],(error,result)=>{
      if(error) return  res.json({
        msg:"手机号已存在"+error,
        code: 0
      });
      roleModel.add([result.insertId,type],(err,data)=>{
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
    })
  },

  //获取单个信息详情
  getDetail:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    roleModel.getDetail(id,(err,data)=>{
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
    var tel = req.body.tel;
    var name = req.body.name;
    var type = req.body.type;
    roleModel.alter([name,tel,type,id],(err,data)=>{
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
  //获取单个信息详情
  myData:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    roleModel.myData(id,(err,data)=>{
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
}