const crypto = require("crypto"); // 加密模块，内置
const userModel = require("../models/usersModel.js");
const jwt = require('jsonwebtoken'); // 引入生成 token 的模块
const {secretKy} = require('../utils/config.js'); // 引入密钥
const vipModel = require("../models/vipModel.js");

module.exports = {
  // 登录
  userLogin: (req, res) => {
    console.log("收到的数据为",req.body);
    //手机号验证码登录
    if(req.body.type == 0){
      userModel.login([req.body.tel,1],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败",
          code: 0
        });
        console.log("查找到的数据为：",data);
        if(data.length<1){
          res.json({
            code:"0",
            msg:"用户名不存在",
          })
        }
        else if(data[0].u_lock==1){
          res.json({
            code:"0",
            msg:"该账户被禁用",
          })
        }
        else{
          const token = jwt.sign({
            userTel: req.body.tel,
            uid:data[0].u_id
          }, secretKy, {
            expiresIn: 1000 * 60
          });
          res.json({
            code:"200",
            msg:"登录成功",
            data:{
              token: token,
              userId: data[0].u_id
            }
          })
        }
      })
    }
    //手机号密码登录
    else{
      var pwd = req.body.pwd;
      userModel.login([req.body.tel,1],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败",
          code: 0
        });
        console.log("查找到的数据为：",data);
        if(data.length<1){
          res.json({
            code:"0",
            msg:"用户名不存在",
          })
        }
        else if(pwd == data[0].u_pwd){
          if(data[0].u_lock==1){
            res.json({
              code:"0",
              msg:"该账户被禁用"
            })
          }
          else{
            // 生成 token：jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const token = jwt.sign({
              userTel: req.body.tel,
              uid:data[0].u_id
            }, secretKy, {
              expiresIn: 1000 * 60
            });
            res.json({
              code:"200",
              msg:"登录成功",
              data:{
                token: token,
                userId: data[0].u_id
              }
            })
          }      
        }
        else{
          res.json({
            code:"0",
            msg:"密码错误"
          })
        }
      })
    }
  },
  managerLogin: (req,res)=>{
    var pwd = req.body.pwd;
    userModel.login([req.body.tel,3],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("查找到的数据为：",data);
      if(data.length<1){
        res.json({
          code:"0",
          msg:"用户名不存在",
        })
      }
      else if(pwd == data[0].u_pwd){
        if(data[0].u_lock==1){
          res.json({
            code:"0",
            msg:"该账户被禁用"
          })
        }
        else{
          // 生成 token：jwt.sign(payload, secretOrPrivateKey, [options, callback])
          const token = jwt.sign({
            userTel: req.body.tel,
            uid:data[0].u_id
          }, secretKy, {
            expiresIn: 1000 * 60
          });
          res.json({
            code:"200",
            msg:"登录成功",
            data:{
              token: token,
              userId: data[0].u_id
            }
          })
        }
      }
      else{
        res.json({
          code:"0",
          msg:"密码错误"
        })
      }
    })
  },
  teacherLogin: (req,res)=>{
    var pwd = req.body.pwd;
    userModel.login([req.body.tel,2],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("查找到的数据为：",data);
      if(data.length<1){
        res.json({
          code:"0",
          msg:"用户名不存在",
        })
      }
      else if(pwd == data[0].u_pwd){
        if(data[0].u_lock==1){
          res.json({
            code:"0",
            msg:"该账户被禁用"
          })
        }
        else{
          // 生成 token：jwt.sign(payload, secretOrPrivateKey, [options, callback])
          const token = jwt.sign({
            userTel: req.body.tel,
            uid:data[0].u_id
          }, secretKy, {
            expiresIn: 1000 * 60
          });
          res.json({
            code:"200",
            msg:"登录成功",
            data:{
              token: token,
              userId: data[0].u_id
            }
          })
        }   
      }
      else{
        res.json({
          code:"0",
          msg:"密码错误"
        })
      }
    })
  },
  // 注册
  register: (req, res)=>{
    console.log("收到的数据",req.body.tel,req.body.pwd);
    var name="用户"+Math.random().toString(36).substr(2);//生成随机用户名
    userModel.register([req.body.tel,name,req.body.pwd,1],(error,result)=>{
      if(error) return  res.json({
        msg:error,
        code: 0
      });
      vipModel.add([result.insertId,null,null,null,null,null,null],(err,data)=>{
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
      res.json({
        msg:"注册成功",
        code: 200
      })
    })
  },

  // 判断手机号是否存在
  findTel: (req,res)=>{
    console.log("收到的数据",req.body.tel,req.body.role);
    var id = Number(req.body.id);
    userModel.findTel([req.body.tel,req.body.role],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      if(data.length>0){
        var msg = "该手机号已被注册"
        var code = '200'
        console.log(id,data[0].u_id)
        if(id&&id==data[0].u_id){
          console.log("当前手机号");
          msg = "该手机号为当前手机号"
          code='300'
        }
        res.json({
          msg:msg,
          code: code
        })
      }
      else{
        res.json({
          msg: "该手机号不存在",
          code: 200
        })
      }
    })
  },

  // 禁用与解除
  lock: (req,res)=>{
    console.log("收到的数据",req.body);
    userModel.lock([req.body.lock,req.body.id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("更新结果：",data);
      res.json({
        msg:"更新成功",
        code:'200'
      })
    })
  },

  setPwd: (req,res)=>{
    console.log("收到的数据",req.body);
    var pwd = req.body.pwd;
    if(!pwd){
      var pwd = req.body.tel.substring(4);
      const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
      pwd = md5.update(pwd).digest("hex"); // 加密
    }
    var id = Number(req.body.id);
    userModel.setPwd([pwd,id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("修改的结果：",data);
      res.json({
        msg:"修改成功",
        code:'200'
      })
    })
  },
  alterPwd: (req,res)=>{
    console.log("收到的数据",req.body);
    var pwd = req.body.pwd
    var tel = req.body.tel
    userModel.alterPwd([pwd,tel],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("修改的结果：",data);
      res.json({
        msg:"修改成功",
        code:'200'
      })
    })
  },
  getTel: (req,res)=>{
    console.log("收到的数据",req.body);
    var id = Number(req.body.id);
    userModel.getTel(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      var tel = data[0].u_tel;
      console.log("结果：",data);
      res.json({
        code:'200',
        data:tel
      })
    })
  },
  verify: (req,res)=>{
    console.log("收到的数据",req.body);
    var id = Number(req.body.id);
    var tel = req.body.tel;
    var pwd = req.body.pwd;
    userModel.verify([tel,pwd],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("结果：",data);
      if(data.length>0&&data[0].u_id==id){
        res.json({
          code:'200',
          msg:"验证成功"
        })
      }
      else{
        res.json({
          code:'0',
          msg:"验证失败"
        })
      }
      
      
    })
  },
  alterTel: (req,res)=>{
    console.log("收到的数据",req.body);
    var id = Number(req.body.id);
    var tel = req.body.tel
    userModel.alterTel([tel,id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("修改的结果：",data);
      res.json({
        msg:"修改成功",
        code:'200'
      })
    })
  },
  getCount: (req,res)=>{
    console.log("收到的数据",req.body);
    userModel.getCount(null,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        code: 0
      });
      console.log("结果：",data);

      res.json({
        msg:"查找成功",
        code:'200',
        data:{
          user:data[0].n,
          teacher:data[1].n,
          manager:data[2].n
        }
      })
    })
  },
}