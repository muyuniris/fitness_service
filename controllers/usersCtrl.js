const crypto = require("crypto"); // 加密模块，内置
const userModel = require("../models/usersModel.js");
const jwt = require('jsonwebtoken'); // 引入生成 token 的模块
const {secretKy} = require('../utils/config.js'); // 引入密钥

module.exports = {
  // 登录
  login: (req, res) => {
    console.log(req.body);
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(req.body.pwd).digest("hex"); // 加密

    userModel.login(req.body.name,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        state: 0
      });
      console.log("查找到的数据为：",data);
      if(data.length<1){
        res.json({
          code:"0",
          msg:"用户名不存在",
        })
      }
      else if(req.body.pwd == data[0].u_pwd){
        // 生成 token：jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign({
          username: req.body.username
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
      else{
        res.json({
          code:"0",
          msg:"密码错误"
        })
      }
    })
  }
}