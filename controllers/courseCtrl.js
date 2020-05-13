const courseModel = require("../models/courseModel.js");
const notifyModel = require("../models/notifyModel.js");
const vipModel = require("../models/vipModel.js");
function getDay(time){
  var date = new Date(time);
  var arr=[];
  for (var i = 0; i < 2; i++) {
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var day = date.getDate(); //获取当前日(1-31)
    year = year<10 ? '0' + year : year;
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    var item = year+'-'+month + "-" + day;
    date.setDate(date.getDate() + 1);
    arr.push(item);
  }
  return arr;
}

module.exports = {
  // 获取用户信息
  getData: (req, res) => {
    console.log("收到",req.body);
    var name = req.body.name?'%'+req.body.name+'%':'%';
    courseModel.getTotal([name],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败",
        state: 0
      });
      console.log("查到课程总数：",count);
      var options = [];
     
      options.push(name);
      options.push((req.body.currentPage-1)*req.body.pageSize);
      options.push(req.body.pageSize);

      courseModel.getData(options,(err,data)=>{
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
    var strong = req.body.strong;
    var info = req.body.info||null;
    var img = req.body.img||'/images/img1.png';
    courseModel.add([name,strong,info,img],(err,data)=>{
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
    courseModel.getDetail(id,(err,data)=>{
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
    var name = req.body.name;
    var strong = req.body.strong;
    var info = req.body.info||null;
    var img = req.body.img||null;
    courseModel.alter([name,strong,info,img,id],(err,data)=>{
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
    var userList = [];

    courseModel.findOrder(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      userList = data;
      var options1=[];
      var options2=[];
      for(var i=0;i<userList.length;i++){
        var title="课程变动通知";
        var msg="您预约的课程已被删除,相应预约已自动取消,另全额退还预约费用和预约费用的10%补偿，特此通知!"
        var time = new Date();
        var img = '/images/sorry.jpg';
        var id = userList[i].id
        var item1 = [title,msg,img,time,id];
        options1.push(item1);
        var money = userList[i].price+parseInt(userList[i].price/10);
        var no = time.getTime();
        msg = "课程删除退款及补偿";
        var item2 = [id,money,no,msg,time];
        options2.push(item2);
      }
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
            courseModel.del(id,(err,data)=>{
              if(err) return  res.json({
                msg:"数据库查找失败"+err,
                state: 0
              });
              console.log("数据结果为：",data);
              res.json({
                code:"200",
                data:data[0]
              })
            })
          })
        })
      }
      else{
        courseModel.del(id,(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("数据结果为：",data);
          res.json({
            code:"200",
            data:data[0]
          })
        })
      }
    })
  },

  getPlan:(req,res)=>{
    console.log("收到数据：",req.body);
    var course = req.body.course?"%"+req.body.course+"%":'%';
    var teacher = req.body.teacher?"%"+req.body.teacher+"%":'%';
    var place = req.body.place?"%"+req.body.place+"%":'%';
    var startTime = req.body.startTime||null;
    var endTime = req.body.endTime||null;
    var price = req.body.price;
    var options={
      course:course,
      teacher:teacher,
      place:place,
      startTime:startTime,
      endTime:endTime,
      price:price,
    }
    console.log(options)
    courseModel.getPlanTotal(options,(error,count)=>{
      if(error) return res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查到排课总数：",count);
      var options = {
        course:course,
        teacher:teacher,
        place:place,
        startTime:startTime,
        endTime:endTime,
        current:(req.body.currentPage-1)*req.body.pageSize,
        size:req.body.pageSize
      }

      courseModel.getPlan(options,(err,data)=>{
        console.log(err)
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

  getCourse:(req,res)=>{
    console.log("收到的数据为",req.body)
    var course = req.body.course?'%'+req.body.course+'%':'%';
    courseModel.getCourse(course,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      res.json({
        code:"200",
        data:data
      })
    })
  },

  getTeacher:(req,res)=>{
    console.log("收到的数据为",req.body)
    var teacher = req.body.teacher?'%'+req.body.teacher+'%':'%';
    var time=null;
    if(req.body.addTime){
      time = req.body.addTime[0]+' '+req.body.addTime[1]
    }
    courseModel.getTeacher([time,time,teacher],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      res.json({
        code:"200",
        data:data
      })
    })
  },

  getPlace:(req,res)=>{
    console.log("收到的数据为",req.body)
    var place = req.body.place?'%'+req.body.place+'%':'%';
    var time=null;
    if(req.body.addTime){
      time = req.body.addTime[0]+' '+req.body.addTime[1]
    }
    courseModel.getPlace([time,time,place],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      res.json({
        code:"200",
        data:data
      })
    })
  },

  addPlan:(req,res)=>{
    console.log("收到的数据为",req.body);
    var course = req.body.course;
    var teacher = req.body.teacher;
    var place = req.body.place;
    var max = req.body.max;
    var price = req.body.price;
    var time=null;
    if(req.body.addTime){
      time = req.body.addTime[0]+' '+req.body.addTime[1]
    }
    console.log(time);
    courseModel.addPlan([course,teacher,place,max,time,price],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      res.json({
        code:"200",
        msg:"新增成功"
      })
    })
  },

  alterPlan:(req,res)=>{
    console.log("修改的数据为",req.body);
    var teacher = req.body.teacher;
    var place = req.body.place;
    var max = req.body.max;
    var alterTime=req.body.addTime[0]+' '+req.body.addTime[1]+':00:00';
    var price = req.body.price;
    var id = Number(req.body.id);
    var userList = [];
    courseModel.findCourseOrder(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      userList=data;
      userList = data;
      var options1=[];
      for(var i=0;i<userList.length;i++){
        var title="课程变动通知";
        var msg="您预约的课程信息被修改,请注意查看，特此通知!"
        var time = new Date();
        var img = '/images/notify.jpg';
        var id = userList[i].id
        var item1 = [title,msg,img,time,id];
        options1.push(item1);
      }
      if(userList.length>0){
        notifyModel.add(options1,(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          courseModel.alterPlan([teacher,place,max,alterTime,price,id],(err,data)=>{
            if(err) return  res.json({
              msg:"数据库查找失败"+err,
              state: 0
            });
            console.log("数据结果为：",data);
            res.json({
              code:"200",
              msg:"修改成功"
            })
          })
        })
      }
      else{
        courseModel.alterPlan([teacher,place,max,alterTime,price,id],(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("数据结果为：",data);
          res.json({
            code:"200",
            msg:"修改成功"
          })
        })
      }
    })
    
  },

  delPlan:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var userList = [];
    courseModel.findCourseOrder(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      userList=data;
      console.log("aaaaaaaaaaaaa",userList);
      userList = data;
      var options1=[];
      var options2=[];
      for(var i=0;i<userList.length;i++){
        var title="课程变动通知";
        var msg="您预约的课程已被删除,相应预约已自动取消,另全额退还预约费用和预约费用的10%补偿，特此通知!"
        var time = new Date();
        var img = '/images/sorry.jpg';
        var id = userList[i].id
        var item1 = [title,msg,img,time,id];
        options1.push(item1);
        var money = userList[i].price+parseInt(userList[i].price/10);
        var no = time.getTime();
        msg = "课程删除退款及补偿";
        var item2 = [id,money,no,msg,time];
        options2.push(item2);
      }
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
            courseModel.delPlan(id,(err,data)=>{
              if(err) return  res.json({
                msg:"数据库查找失败"+err,
                state: 0
              });
              console.log("数据结果为：",data);
              res.json({
                code:"200",
                data:data[0]
              })
            })
          })
        })
      }
      else{
        courseModel.delPlan(id,(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("数据结果为：",data);
          res.json({
            code:"200",
            data:data[0]
          })
        })
      }
    })
    
  },

  getPlanDetail:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    courseModel.getPlanDetail(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      res.json({
        code:"200",
        data:data[0]
      })
    })
  },
  // 获取某一天的课程安排
  getPlanOneDay:(req,res)=>{
    console.log("收到时间为：",req.body);
    var time = getDay(req.body.time);
    console.log(time)
    courseModel.getPlanDayTotal([time[0],time[1]],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("数据结果为：",count);
      courseModel.getPlanOneDay([time[0],time[1],req.body.start,req.body.size],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("数据结果为：",data);
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
  getTop:(req,res)=>{
    courseModel.getTop(null,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据为：",data);
      res.json({
        code:'200',
        data:data
      })
    })
  },
}