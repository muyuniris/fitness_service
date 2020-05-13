const vipModel = require("../models/vipModel.js");
const userModel = require("../models/usersModel.js");
const crypto = require("crypto"); // 加密模块，内置
function dateFormat(time,fmt){
  const date = new Date(time);
  var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var dealNo;

module.exports = {
  // 获取用户信息
  getData: (req, res) => {
    console.log("收到模糊查询条件为",req.body);
    var name = req.body.name?'%'+req.body.name+'%':'%';
    var tel = req.body.tel?req.body.tel+'%':'%';
    vipModel.getTotal([tel,name],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败",
        state: 0
      });
      console.log("查找到的用户数据总数为：",count);
      var options = [];
     
      options.push(tel);
      options.push(name);
      options.push((req.body.currentPage-1)*req.body.pageSize);
      options.push(req.body.pageSize);
      vipModel.getData(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败",
          state: 0
        });
        console.log("查找到的用户数据为：",data);
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
    console.log("新增信息:",req.body);
    var tel = req.body.tel;
    var name = req.body.name||"用户"+Math.random().toString(36).substr(2);
    var sex = req.body.sex;
    var img = '/images/avtor/jpg';
    sex = sex=='男'?0:1;
    var birth = req.body.birth||null;
    var address = req.body.address||null;
    var time = Number(req.body.time);
    var startTime = new Date();
    var endTime = new Date();
    console.log("时间",endTime,startTime);
    if(time == 0){
      endTime = null;
      startTime = null;
    }
    else{
      endTime.setMonth(startTime.getMonth()+time);
    }
    console.log("时间",endTime,startTime);
    var pwd = tel.substring(4)
    console.log(pwd);
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(pwd).digest("hex"); // 加密
    userModel.register([tel,newPass,1],(error,result)=>{
      if(error) return  res.json({
        msg:"手机号已存在"+error,
        code: 0
      });
      vipModel.add([result.insertId,name,sex,birth,address,startTime,endTime,img],(err,data)=>{
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
    vipModel.getDetail(id,(err,data)=>{
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
    var name = req.body.name?req.body.name:"用户"+Math.random().toString(36).substr(2);
    var tel = req.body.tel;
    var sex = req.body.sex;
    sex = sex=='男'?0:1;
    var birth = req.body.birth||null;
    var address = req.body.address||null;
    var time = req.body.time?Number(req.body.time):0;
    var endTime = new Date(req.body.endTime);
    var startTime = null;
    var type = req.body.type;
    var options = {};
    if(time==0){
      options.status = false;
      options.data = [tel,name,sex,birth,address,endTime,id];
    }
    else if(type==1){
      endTime.setMonth(endTime.getMonth()+time);
      options.status = false;
      options.data = [tel,name,sex,birth,address,endTime,id]
    }
    else{
      startTime = new Date();
      endTime = new Date();
      endTime.setMonth(startTime.getMonth()+time);
      options.status = true;
      options.data = [tel,name,sex,birth,address,startTime,endTime,id]
    }

    
    vipModel.alter(options,(err,data)=>{
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

  getUser:(req,res)=>{
    console.log(req.user)
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    vipModel.getUser(id,(err,data)=>{
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

  alterUser:(req,res)=>{
    console.log("收到的数据为",req.body);
    var id = Number(req.body.id);
    var img = req.body.img;
    var name = req.body.name;
    var birth = req.body.birth;
    var sex = req.body.sex=="男"?0:1;
    vipModel.alterUser([name,birth,sex,img,id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查询的数据为",data);
      res.json({
        code:"200",
        msg:"修改成功"
      })
    })
  },

  setVip:(req,res)=>{
    var id = req.body.id;
    if(dealNo==req.body.no){
      res.json({
        code:'0',
        msg:"交易已经完成"
      })
    }
    else{
      dealNo = req.body.no
      vipModel.getUser(id,(error,user)=>{
        if(error) return  res.json({
          msg:"数据库查找失败"+error,
          state: 0
        });
        var endTime = user[0].v_endTime;
        var startTime = user[0].v_startTime;
        // 如果本身是会员
        if(user[0].state){
          endTime.setMonth(endTime.getMonth()+req.body.time);
          endTime = dateFormat(endTime,"yyyy-MM-dd");
        }
        // 如果本身不是会员
        else{
          startTime = new Date();
          endTime.setMonth(startTime.getMonth()+req.body.time);
          startTime = dateFormat(startTime,"yyyy-MM-dd");
          endTime = dateFormat(endTime,"yyyy-MM-dd");
        }
        vipModel.setVip([startTime,endTime,id],(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("查询的数据为",data);
          res.json({
            code:"200",
            msg:"修改成功",
          })
        })
      })
    }
  },

  income:(req,res)=>{
    var no = req.body.no;
    if(dealNo==no && no){
      res.json({
        code:'0',
        msg:"交易已经完成"
      })
    }
    else{
      if(!no){
        no = new Date().getTime();
      }
      dealNo = no;
      var id = req.body.id;
      var msg = req.body.msg;
      var money = req.body.money;
      var time = new Date();
      vipModel.income([[id,money,no,msg,time]],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查询的数据为",data);
        res.json({
          code:"200",
          msg:"修改成功"
        })
      })
    }
  },

  getMoney:(req,res)=>{
    var id = req.body.id;
    var money = 0;
    vipModel.getMoney(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      // console.log("查询的数据为",data);
      if(data.length){
        money = data[0].money
      }
      res.json({
        code:"200",
        data:money
      })
    })
  },
  getBill:(req,res)=>{
    var id = req.body.id;
    var start = req.body.start;
    var size = req.body.size;
    vipModel.billTotal([id,start,size],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      vipModel.getBill([id,start,size],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        res.json({
          code:"200",
          data:{
            count:count[0].n,
            list:data
          }
        })
      })
    }) 
  }
}