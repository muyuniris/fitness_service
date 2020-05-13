const teacherModel = require("../models/teacherModel.js");
const userModel = require("../models/usersModel.js");
const notifyModel = require("../models/notifyModel.js");
const crypto = require("crypto"); // 加密模块，内置
const vipModel = require("../models/vipModel.js");
module.exports = {
  getData:(req,res)=>{
    console.log("收到",req.body);
    var name = req.body.name?'%'+req.body.name+'%':'%';
    var tel = req.body.tel?req.body.tel+'%':'%';
    teacherModel.getTotal([tel,name],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败",
        state: 0
      });
      console.log("查找到的数据为：",count);
      var options = [];
     
      options.push(tel);
      options.push(name);
      options.push((req.body.currentPage-1)*req.body.pageSize);
      options.push(req.body.pageSize);
      teacherModel.getData(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查找到的数据为：",data);
        res.json({
          code:"200",
          msg:"查找成功",
          data:{
            count:Number(count[0].n),
            list:data
          }
        })
      })
    })
  },
  // 上传图片
  upload:(req,res)=>{
    console.log("收到的",req.file); // req.file 保存了文件相关信息
    var url = '/images/uploads/'+req.file.filename
    res.json({
      msg:"文件上传成功",
      code:'200',
      url:url
    })
  },
  del:(req,res)=>{
    console.log("收到的数据为",req.body);
    var id = Number(req.body.id);
    var userList = [];
    var i=0;
    var state = false;
    teacherModel.findOrder([id,id],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败aaaaaaaaa"+err,
        state: 0
      });
      userList=data;
      var options1=[];
      var options2=[];
      for(var i=0;i<userList.length;i++){
        var title="教练变动通知";
        var msg="您预约的课程或私教的教练已从本俱乐部离职,相应预约已自动取消,另全额退还预约费用和预约费用的10%补偿，特此通知!"
        var time = new Date();
        var img = '/images/sorry.jpg';
        var id = userList[i].id
        var item1 = [title,msg,img,time,id];
        options1.push(item1);
        var money = userList[i].price+parseInt(userList[i].price/10);
        var no = time.getTime();
        msg = "教练离职退款及补偿";
        var item2 = [id,money,no,msg,time];
        options2.push(item2);
      }
      console.log(options1,options2);
      if(userList.length>0){
        notifyModel.add(options1,(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          vipModel.income(options2,(err,data)=>{
            if(err) return  res.json({
              msg:"数据库查找失败"+err,
              state: 0
            });
            teacherModel.del(id,(err,data)=>{
              if(err) return  res.json({
                msg:"数据库查找失败"+err,
                state: 0
              });
              res.json({
                code:"200",
                msg:"删除成功"
              })
            }) 
          })
        })
      }
      else{
        teacherModel.del(id,(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          res.json({
            code:"200",
            msg:"删除成功"
          })
        }) 
      }  
    })   
  },
  add:(req,res)=>{
    console.log(req.body);
    var price = req.body.price;
    var tel = req.body.tel;
    var name = req.body.name;
    var sex = req.body.sex;
    sex = sex=='男'?0:1;
    var birth = req.body.birth;
    var info = req.body.address||null;
    var img = req.body.img||'/images/avtor.jpg';
    var pwd = tel.substring(4)
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(pwd).digest("hex"); // 加密
    userModel.register([tel,newPass,2],(error,result)=>{
      if(error) return  res.json({
        msg:"手机号已存在"+error,
        code: 0
      });
      teacherModel.add([result.insertId,name,sex,birth,info,img,price],(err,data)=>{
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

  getDetail:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    teacherModel.getDetail(id,(err,data)=>{
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
    console.log("收到的数据为",req.body);
    var price = req.body.price;
    var id = Number(req.body.id);
    var tel = req.body.tel;
    var name = req.body.name;
    var sex = req.body.sex;
    sex = sex=='男'?0:1;
    var birth = req.body.birth;
    var info = req.body.address||null;
    var img = req.body.img||null;
  
    teacherModel.alter([tel,name,sex,birth,info,img,price,id],(err,data)=>{
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

  getRate:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var start = req.body.start;
    var size = req.body.size;
    teacherModel.getRateTotal(id,(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("数据结果",count);
      teacherModel.getRate([id,start,size],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("数据结果",data);
        res.json({
          code:"200",
          data:{
            count:count[0].n,
            list:data
          }
        })
      })
    })
  },

  rate:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var tid = Number(req.body.tid);
    var rate = Number(req.body.rate);
    var msg = req.body.msg?req.body.msg:"该用户没有填写评价内容";
    var time = new Date();
    teacherModel.rate([uid,tid,rate,msg,time],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("结果",data);
      res.json({
        code:"200",
        msg:"新增成功"
      })
    })
  },

  getRateCount: (req,res)=>{
    console.log("收到的数据",req.body);
    teacherModel.getRateCount(null,(err,data)=>{
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

  getTeacher:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.id);
    teacherModel.getTeacher(uid,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("结果",data);
      res.json({
        code:"200",
        data:data[0]
      })
    })
  },

  alterTeacher:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.id);
    var name = req.body.name;
    var sex = req.body.sex||null;
    var birth = req.body.birth||null;
    var img = req.body.img;
    var info = req.body.info;
    teacherModel.alterTeacher([name,sex,birth,img,info,uid],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("结果",data);
      res.json({
        code:"200",
        data:data[0]
      })
    })
  },

  getCourse:(req,res)=>{
    console.log("收到的数据为",req.body)
    var tid = Number(req.body.id);
    var state = req.body.state;
    var start = req.body.start;
    var size  = req.body.size;

    teacherModel.getCourseCount([tid,state],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("结果",count);
      teacherModel.getCourse([tid,state,start,size],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("结果",data);
        res.json({
          code:"200",
          data:{
            count:count[0].n,
            list:data
          }
        })
      })
    })
  },

  getCourseDetail:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var state = req.body.state;
    var start = req.body.start;
    var size  = req.body.size;

    teacherModel.getCourseDetail([id],(error,data)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("结果",data);
      teacherModel.getOrderList([id],(err,list)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("结果",list);
        res.json({
          code:"200",
          data:{
            data:data[0],
            list:list
          }
        })
      })
    })
  },

  getTop:(req,res)=>{
    console.log("收到的数据为",req.body)
    teacherModel.getTop(null,(error,data)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      res.json({
        code:"200",
        data:data
      })
    })
  },
}