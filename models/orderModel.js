const db = require("./index");

module.exports = {
  getCourse: (options, callback) => {
    var op=[options.user,options.course];
    var str='';
    if(options.startTime){
      str=`AND cp_date BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    op.push(options.current);
    op.push(options.size);
    var sql = `SELECT oc_id,v_name,c_name,u_tel,p_name,t_name,cp_time,cp_price,u.u_id, cp_time>NOW() AS state
    FROM ordercourse o,courseplan cp,users u,course c,place p,teacher t,vip v
    WHERE v.u_id=u.u_id AND cp.t_id=t.t_id AND cp.p_id=p.p_id AND u.u_id=o.u_id AND o.cp_id=cp.cp_id AND cp.c_id=c.c_id AND v_name LIKE ? AND c_name LIKE ? ${str} ORDER BY cp_time DESC LIMIT ?,?`;
    db.connect(sql, op, callback);
  },
  courseTotal:(options, callback) => {
    var op=[options.user,options.course];
    var str='';
    if(options.startTime){
      str=`AND cp_date BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    var sql = `SELECT COUNT(*) AS n FROM ordercourse o,courseplan cp,users u,course c,place p,teacher t,vip v
    WHERE v.u_id=u.u_id AND cp.t_id=t.t_id AND cp.p_id=p.p_id AND u.u_id=o.u_id AND o.cp_id=cp.cp_id AND cp.c_id=c.c_id AND v_name LIKE ? AND c_name LIKE ?`+str;
    db.connect(sql, op, callback);
  },
  delCourse:(options,callback)=>{   
    var sql = `DELETE FROM ordercourse WHERE oc_id=?`;
    db.connect(sql, options, callback);
  },
  getTeacher: (options, callback) => {
    var op=[options.user,options.teacher];
    var str='';
    if(options.startTime){
      str=`AND ot_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    op.push(options.current);
    op.push(options.size);
    var sql = `SELECT o.ot_id,v_name,t_name,u.u_id,t_price,ot_time,u_tel,ot_time>NOW() AS state FROM orderTeacher o,teacher t,users u,vip v WHERE v.u_id=u.u_id AND o.u_id=u.u_id AND t.t_id=o.t_id
    AND v_name LIKE ? AND t_name LIKE ? ${str} ORDER BY ot_time DESC LIMIT ?,?`;
    db.connect(sql, op, callback);
  },
  teacherTotal:(options, callback) => {
    var op=[options.user,options.teacher];
    var str='';
    if(options.startTime){
      str=`AND ot_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    var sql = `SELECT COUNT(*) AS n FROM orderTeacher o,teacher t,users u,vip v WHERE v.u_id=u.u_id AND o.u_id=u.u_id AND t.t_id=o.t_id AND v_name LIKE ? AND t_name LIKE ?`+str;
    db.connect(sql,op,callback);
  },
  delTeacher:(options,callback)=>{   
    var sql = `DELETE FROM orderteacher WHERE ot_id=?`;
    db.connect(sql, options, callback);
  },
  getPlace: (options, callback) => {
    var op=[options.user,options.place];
    var str='';
    if(options.startTime){
      str=`AND op_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    op.push(options.current);
    op.push(options.size);
    var sql = `SELECT o.op_id,v_name,u.u_id,p_price,p_name,op_time,u_tel,op_time>NOW() AS state FROM orderPlace o,place p,users u,vip v WHERE v.u_id=u.u_id AND o.u_id=u.u_id AND p.p_id=o.p_id
    AND v_name LIKE ? AND p_name LIKE ? ${str} ORDER BY op_time DESC LIMIT ?,?`;
    db.connect(sql, op, callback);
  },
  placeTotal:(options, callback) => {
    var op=[options.user,options.place];
    var str='';
    if(options.startTime){
      str=`AND op_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    var sql = `SELECT COUNT(*) AS n FROM orderplace o,place p,users u,vip v WHERE v.u_id=u.u_id AND o.u_id=u.u_id AND p.p_id=o.p_id AND v_name LIKE ? AND p_name LIKE ?`+str;
    db.connect(sql,op,callback);
  },
  delPlace:(options,callback)=>{   
    var sql = `DELETE FROM orderplace WHERE op_id=?`;
    db.connect(sql, options, callback);
  },
  selectCourse:(options,callback)=>{   
    var sql = `SELECT COUNT(*) AS n FROM ordercourse WHERE u_id=? AND cp_id=?`;
    db.connect(sql, options, callback);
  },
  orderCourse:(options,callback)=>{   
    var sql = `INSERT INTO ordercourse(u_id,cp_id) VALUE(?,?)`;
    db.connect(sql, options, callback);
  },
  courseListCount:(options,callback)=>{   
    var sql = `SELECT COUNT(*) AS n FROM coursePlan cp,teacher t,course c,ordercourse o
    WHERE cp.c_id = c.c_id AND cp.t_id = t.t_id AND o.cp_id=cp.cp_id AND (cp_time>NOW())=TRUE AND o.u_id=?`;
    db.connect(sql, options, callback);
  },
  courseList:(options,callback)=>{   
    var sql = `SELECT a.oc_id,a.t_id,cp_price,a.cp_id,t_name,c_name,cp_max,cp_time,c_img,cp_count,p_name FROM (SELECT o.oc_id,t.t_id,cp_price,cp.cp_id,t_name,c_name,p_id,cp_max,cp_time,c_img FROM coursePlan cp,teacher t,course c,ordercourse o
      WHERE cp.c_id = c.c_id AND cp.t_id = t.t_id AND o.cp_id=cp.cp_id AND (cp_time>NOW())=? AND o.u_id=? ORDER BY cp_time DESC) a
      LEFT JOIN (SELECT cp_id AS id,COUNT(cp_id) AS cp_count FROM ordercourse o GROUP BY cp_id) b ON a.cp_id=b.id
      LEFT JOIN place p ON a.p_id = p.p_id`;
    db.connect(sql, options, callback);
  },
  delCourseOrder:(options,callback)=>{   
    var sql = `DELETE FROM ordercourse WHERE oc_id=?`;
    db.connect(sql, options, callback);
  },
  getCount:(options,callback)=>{   
    var sql = `SELECT cp_max-cp_count AS state FROM (SELECT oc_id,cp_id,COUNT(cp_id) AS cp_count FROM ordercourse o GROUP BY cp_id) a,courseplan cp WHERE a.cp_id=cp.cp_id AND cp.cp_id=?`;
    db.connect(sql, options, callback);
  },
  teacherTime:(options,callback)=>{   
    var sql = `SELECT * FROM (SELECT t_id,cp_time AS t_time FROM courseplan c WHERE t_id=? AND cp_time BETWEEN ? AND ? 
      UNION ALL
      SELECT t_id,ot_time AS t_time FROM orderteacher WHERE t_id=? AND ot_time BETWEEN ? AND ?) a WHERE t_time>NOW()
      ORDER BY t_time ASC`;
    db.connect(sql, options, callback);
  },
  selectTeacher:(options,callback)=>{  
    var sql = `SELECT u_id FROM orderteacher WHERE t_id=? AND ot_time=?`
    db.connect(sql, options, callback);
  },
  orderTeacher:(options,callback)=>{  
    var sql = `INSERT INTO orderteacher(t_id,u_id,ot_time) VALUE (?,?,?)`
    db.connect(sql, options, callback);
  },
  teacherListCount:(options,callback)=>{  
    var sql = `SELECT COUNT(*) AS n FROM orderteacher WHERE (ot_time>NOW())=? AND u_id=?`
    db.connect(sql, options, callback);
  },
  teacherList:(options,callback)=>{   
    var sql = `SELECT ot_id,t.t_id,ot_time,t_price,t_name,t_img FROM orderteacher o,teacher t WHERE o.t_id=t.t_id AND (ot_time>NOW())=? AND o.u_id=? ORDER BY ot_time DESC LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
  delTeacherOrder:(options,callback)=>{   
    var sql = `DELETE FROM orderteacher WHERE ot_id=?`;
    db.connect(sql, options, callback);
  },
  placeTime:(options,callback)=>{   
    var sql = `SELECT * FROM (SELECT p_id,cp_time AS p_time FROM courseplan c WHERE p_id=? AND cp_time BETWEEN ? AND ? 
    UNION ALL
    SELECT p_id,op_time AS p_time FROM orderplace WHERE p_id=? AND op_time BETWEEN ? AND ?) a WHERE p_time>NOW()
    ORDER BY p_time ASC`;
    db.connect(sql, options, callback);
  },
  selectPlace:(options,callback)=>{  
    var sql = `SELECT u_id FROM orderplace WHERE p_id=? AND op_time=?`
    db.connect(sql, options, callback);
  },
  orderPlace:(options,callback)=>{  
    var sql = `INSERT INTO orderplace(p_id,u_id,op_time) VALUE (?,?,?)`
    db.connect(sql, options, callback);
  },
  placeListCount:(options,callback)=>{  
    var sql = `SELECT COUNT(*) AS n FROM orderplace o,place p WHERE o.p_id=p.p_id AND (op_time>NOW())=? AND u_id=?`
    db.connect(sql, options, callback);
  },
  placeList:(options,callback)=>{   
    var sql = `SELECT op_id,p.p_id,op_time,p_price,p_name,p_img FROM orderplace o,place p WHERE o.p_id=p.p_id AND (op_time>NOW())=? AND o.u_id=? ORDER BY op_time DESC LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
  delPlaceOrder:(options,callback)=>{   
    var sql = `DELETE FROM orderplace WHERE op_id=?`;
    db.connect(sql, options, callback);
  },
  teacherCount:(options,callback)=>{   
    var sql = `SELECT DATE_FORMAT(ot_time ,'%Y-%m') AS mytime ,COUNT(ot_time) AS n FROM orderteacher WHERE ot_time BETWEEN DATE_SUB(NOW(),INTERVAL 6 MONTH) AND NOW() GROUP BY DATE_FORMAT(ot_time ,'%Y-%m') ORDER BY mytime DESC;`;
    db.connect(sql, options, callback);
  },
  courseCount:(options,callback)=>{   
    var sql = `SELECT DATE_FORMAT(cp_time ,'%Y-%m') AS mytime ,COUNT(cp_time) AS n FROM ordercourse o,courseplan c WHERE o.cp_id=c.cp_id AND cp_time BETWEEN DATE_SUB(NOW(),INTERVAL 6 MONTH) AND NOW() GROUP BY DATE_FORMAT(cp_time ,'%Y-%m') ORDER BY mytime DESC;`;
    db.connect(sql, options, callback);
  },
  placeCount:(options,callback)=>{   
    var sql = `SELECT DATE_FORMAT(op_time ,'%Y-%m') AS mytime ,COUNT(op_time) AS n FROM orderplace WHERE op_time BETWEEN DATE_SUB(NOW(),INTERVAL 6 MONTH) AND NOW() GROUP BY DATE_FORMAT(op_time ,'%Y-%m') ORDER BY mytime DESC;`;
    db.connect(sql, options, callback);
  },
  teacherData:(options,callback)=>{   
    var sql = `SELECT ot_id,v_name,u_tel,v_img,ot_time FROM orderteacher o,users u,vip v WHERE v.u_id=u.u_id AND o.u_id=u.u_id AND t_id=? AND (ot_time>NOW())=? LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
  teacherDataCount:(options,callback)=>{   
    var sql = `SELECT count(*) AS n FROM orderteacher o,users u,vip v WHERE v.u_id=u.u_id AND o.u_id=u.u_id AND t_id=? AND (ot_time>NOW())=?`;
    db.connect(sql, options, callback);
  },
}

