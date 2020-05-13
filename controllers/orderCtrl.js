const orderModel = require("../models/orderModel.js");
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
function getMonth(){
  var date = new Date();
  var arr=[];
  for (var i = 0; i < 6; i++) {
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var day = date.getDate(); //获取当前日(1-31)
    year = year<10 ? '0' + year : year;
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    var item = year+'-'+month;
    date.setMonth(date.getMonth()-1);
    console.log(date);
    arr.push(item);
  }
  return arr;
}

module.exports = {
  getCourse:(req,res)=>{
    console.log("收到的数据为",req.body)
    var user = req.body.user?'%'+req.body.user+'%':'%';
    var course = req.body.course?'%'+req.body.course+'%':'%';
    var startTime = req.body.startTime||null;
    var endTime = req.body.endTime||null;
    var options={
      user:user,
      course:course,
      startTime:startTime,
      endTime:endTime
    }
    console.log("参数",options)
    orderModel.courseTotal(options,(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查询的数据为",count);
      options.current=(req.body.currentPage-1)*req.body.pageSize;
      options.size=req.body.pageSize;
      orderModel.getCourse(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查询的数据为",data);
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
  delCourse:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    orderModel.delCourse(id,(err,data)=>{
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
  getTeacher:(req,res)=>{
    console.log("aaa")
    console.log("收到的数据为",req.body)
    var user = req.body.user?'%'+req.body.user+'%':'%';
    var teacher = req.body.teacher?'%'+req.body.teacher+'%':'%';
    var startTime = req.body.startTime||null;
    var endTime = req.body.endTime||null;
    var options={
      user:user,
      teacher:teacher,
      startTime:startTime,
      endTime:endTime
    }
    console.log("参数",options)
    orderModel.teacherTotal(options,(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查询的数据为",count);
      options.current=(req.body.currentPage-1)*req.body.pageSize;
      options.size=req.body.pageSize;
      orderModel.getTeacher(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查询的数据为",data);
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
  delTeacher:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    orderModel.delTeacher(id,(err,data)=>{
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
  getPlace:(req,res)=>{
    console.log("aaa")
    console.log("收到的数据为",req.body)
    var user = req.body.user?'%'+req.body.user+'%':'%';
    var place = req.body.place?'%'+req.body.place+'%':'%';
    var startTime = req.body.startTime||null;
    var endTime = req.body.endTime||null;
    var options={
      user:user,
      place:place,
      startTime:startTime,
      endTime:endTime
    }
    console.log("参数",options)
    orderModel.placeTotal(options,(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查询的数据为",count);
      options.current=(req.body.currentPage-1)*req.body.pageSize;
      options.size=req.body.pageSize;
      orderModel.getPlace(options,(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查询的数据为",data);
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
  delPlace:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    orderModel.delPlace(id,(err,data)=>{
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
  orderCourse:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var cpid = Number(req.body.cpid);
    orderModel.getCount(cpid,(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查到的结果：",count);
      if(count.length<=0||count[0].state>0){
        orderModel.orderCourse([uid,cpid],(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("数据结果为：",data);
          res.json({
            code:"200",
            msg:'预约成功！'
          })
        })
      }
      else{
        res.json({
          code:'0',
          msg:'该课程已预约满额！'
        })
      }
    })
  },
  selectCourse:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var cpid = Number(req.body.cpid);
    orderModel.selectCourse([uid,cpid],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("查到的结果：",count);
      if(count[0].n!=0){
        res.json({
          code:'0',
          msg:"你已经预约过该课程了！"
        })
      }
      else{
        res.json({
          code:'200'
        })
      }
    })
  },
  courseList:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var state = req.body.state;
    var start = req.body.start;
    var size = req.body.size;
    orderModel.courseListCount([state,id],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      orderModel.courseList([state,id,start,size],(err,data)=>{
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
  },
  delCourseOrder:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    orderModel.delCourseOrder(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      var money = parseInt(req.body.price/10);
      money = req.body.price-money;
      var msg = "取消预约退款"
      var no = new Date().getTime();
      var time = new Date();
      var uid = Number(req.body.uid);
      vipModel.income([[uid,money,no,msg,time]],(err,data)=>{
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
    })
  },
  teacherTime:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var time = getDay(req.body.time);
    orderModel.teacherTime([id,time[0],time[1],id,time[0],time[1]],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log(data);
      res.json({
        code:'200',
        data:data
      })
    })
  },
  selectTeacher:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var tid = Number(req.body.tid);
    var time = req.body.time;
    orderModel.selectTeacher([tid,time],(error,data)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      if(data.length>0){
        if(data[0].u_id==uid){
          res.json({
            code:'0',
            msg:"你已经预约过了"
          })
        }
        else{
          res.json({
            code:'0',
            msg:'该时间段已经被占用，请重新选择'
          })
        }
      }
      else{
        res.json({
          code:'200'
        })
      }
    })
  },
  orderTeacher:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var tid = Number(req.body.tid);
    var time = req.body.time;
    orderModel.selectTeacher([tid,time],(error,arr)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      if(arr.length>0){
        res.json({
          code:'200',
          msg:"该时间已被占用，请重新选择！"
        })
      }
      else{
        orderModel.orderTeacher([tid,uid,time],(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("数据结果为：",data);
          res.json({
            code:"200",
            msg:'预约成功！'
          })
        })
      }
    })
  },
  teacherList:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var state = req.body.state;
    var start = req.body.start;
    var size = req.body.size;
    orderModel.teacherListCount([state,id],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      orderModel.teacherList([state,id,start,size],(err,data)=>{
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
  },
  delTeacherOrder:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    orderModel.delTeacherOrder(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      var money = parseInt(req.body.price/10);
      money = req.body.price-money;
      var msg = "取消预约退款"
      var no = new Date().getTime();
      var time = new Date();
      var uid = Number(req.body.uid);
      vipModel.income([[uid,money,no,msg,time]],(err,data)=>{
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
    })
  },
  placeTime:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var time = getDay(req.body.time);
    orderModel.placeTime([id,time[0],time[1],id,time[0],time[1]],(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log(data);
      res.json({
        code:'200',
        data:data
      })
    })
  },
  selectPlace:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var pid = Number(req.body.pid);
    var time = req.body.time;
    orderModel.selectPlace([pid,time],(error,data)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      if(data.length>0){
        if(data[0].u_id==uid){
          res.json({
            code:'0',
            msg:"你已经预约过了"
          })
        }
        else{
          res.json({
            code:'0',
            msg:'该时间段已经被占用，请重新选择'
          })
        }
      }
      else{
        res.json({
          code:'200'
        })
      }
    })
  },
  orderPlace:(req,res)=>{
    console.log("收到的数据为",req.body)
    var uid = Number(req.body.uid);
    var pid = Number(req.body.pid);
    var time = req.body.time;
    orderModel.selectPlace([pid,time],(error,arr)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      if(arr.length>0){
        res.json({
          code:'200',
          msg:"该时间已被占用，请重新选择！"
        })
      }
      else{
        orderModel.orderPlace([pid,uid,time],(err,data)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("数据结果为：",data);
          res.json({
            code:"200",
            msg:'预约成功！'
          })
        })
      }
    })
  },
  placeList:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var state = req.body.state;
    var start = req.body.start;
    var size = req.body.size;
    orderModel.placeListCount([state,id],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      orderModel.placeList([state,id,start,size],(err,data)=>{
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
  },
  delPlaceOrder:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    orderModel.delPlaceOrder(id,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("数据结果为：",data);
      var money = parseInt(req.body.price/10);
      money = req.body.price-money;
      var msg = "取消预约退款"
      var no = new Date().getTime();
      var time = new Date();
      var uid = Number(req.body.uid);
      vipModel.income([[uid,money,no,msg,time]],(err,data)=>{
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
    })
  },
  orderCount:(req,res)=>{
    orderModel.teacherCount(null,(err,teacherData)=>{
      if(err) return  res.json({
        msg:"数据库查找失败"+err,
        state: 0
      });
      console.log("查询的数据为",teacherData);
      orderModel.courseCount(null,(err,courseData)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("查询的数据为",courseData);
        orderModel.placeCount(null,(err,placeData)=>{
          if(err) return  res.json({
            msg:"数据库查找失败"+err,
            state: 0
          });
          console.log("查询的数据为",placeData);
          var t=0,c=0,p=0;
          var teacher=[],course=[],place=[];
          var time = getMonth();
          console.log(time);
          for(var i=0;i<time.length;i++){
            var num=0;
            if(courseData[c]&&courseData[c].mytime==time[i]){
              num = courseData[c].n;
              c++;
            }
            course.unshift(num);

            num=0;
            if(placeData[p]&&placeData[p].mytime==time[i]){               
              num=placeData[p].n;
              p++;
            }
            place.unshift(num);
      
            num=0;
            if(teacherData[t]&&teacherData[t].mytime==time[i]){
              num=teacherData[t].n;
              t++;
            }
            teacher.unshift(num);
          }
          res.json({
            code:'200',
            data:{
              time:time.reverse(),
              teacher:teacher,
              course:course,
              place:place
            }
          })
        })
      })
    })
  },
  teacherData:(req,res)=>{
    console.log("收到的数据为",req.body)
    var id = Number(req.body.id);
    var state = req.body.state;
    var start = req.body.start;
    var size = req.body.size;
    orderModel.teacherDataCount([id,state],(error,count)=>{
      if(error) return  res.json({
        msg:"数据库查找失败"+error,
        state: 0
      });
      console.log("数据结果为：",count);
      orderModel.teacherData([id,state,start,size],(err,data)=>{
        if(err) return  res.json({
          msg:"数据库查找失败"+err,
          state: 0
        });
        console.log("数据结果为：",data);
        res.json({
          code:'200',
          data:{
            count:count[0].n,
            list:data
          }
        });
      })
    })   
  },
}