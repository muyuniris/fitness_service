const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var sql = `SELECT * FROM course WHERE c_name LIKE ? LIMIT ?,? `;
    db.connect(sql, options, callback);
  },
  getTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM course WHERE c_name LIKE ?`;
    db.connect(sql, options, callback);
  },
  add:(options,callback)=>{
    var sql = `INSERT INTO course(c_name,c_strong,c_info,c_img) VALUE(?,?,?,?)`;
    db.connect(sql, options, callback);
  },
  getDetail:(options,callback)=>{
    var sql = `SELECT * FROM course WHERE c_id=?`;
    db.connect(sql, options, callback);
  },
  alter:(options,callback)=>{   
    var sql = `UPDATE course SET c_name=?,c_strong=?,c_info=?,c_img=? WHERE c_id=?`;
    db.connect(sql, options, callback);
  },
  del:(options,callback)=>{   
    var sql = `DELETE FROM course WHERE c_id=?`;
    db.connect(sql, options, callback);
  },
  getPlan:(options,callback)=>{   
    var op=[options.course,options.teacher,options.place];
    var str='';
    if(options.startTime){
      str=` AND cp_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    op.push(options.current);
    op.push(options.size);
    console.log(op)
    var sql = `SELECT cp_id,c_name,t_name,cp_time,cp_max,cp_price,p.p_id,cp_count,p_name,cp_state FROM (SELECT cp_id,c_name,t_name,cp_time,cp_max,cp_price,p_id,(cp_time > DATE_ADD(CURDATE(),INTERVAL 1 DAY)) AS cp_state FROM coursePlan cp,course c,teacher t
    WHERE cp.c_id=c.c_id AND cp.t_id=t.t_id  
    ORDER BY cp_time DESC) a
    LEFT JOIN (SELECT cp_id AS id,COUNT(cp_id) AS cp_count FROM ordercourse o GROUP BY cp_id) b ON a.cp_id=b.id 
    LEFT JOIN place p ON p.p_id=a.p_id 
    WHERE c_name LIKE ? AND t_name LIKE ? AND p_name LIKE ? OR p_name IS NULL ${str} LIMIT ?,?`;
    db.connect(sql, op, callback);
  },
  getPlanTotal:(options,callback)=>{   
    var op=[options.course,options.teacher,options.place];
    var str='';
    if(options.startTime){
      str=` AND cp_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    console.log(op)
    var sql = `SELECT count(*) as n FROM coursePlan cp
    JOIN course c ON cp.c_id=c.c_id
    JOIN teacher t ON cp.t_id=t.t_id 
    LEFT JOIN place p ON p.p_id=cp.p_id
    WHERE c_name LIKE ? AND t_name LIKE ? AND p_name LIKE ? OR p_name IS NULL`+str;
    db.connect(sql, op, callback);
  },
  getCourse:(options,callback)=>{   
    var sql = `SELECT c_id,c_name FROM course where c_name like ?`;
    db.connect(sql, options, callback);
  },
  getTeacher:(options,callback)=>{   
    var sql = `SELECT t_id,t_name FROM teacher WHERE t_id NOT IN (SELECT t_id FROM coursePlan WHERE cp_time =?) AND t_id NOT IN (SELECT t_id FROM orderteacher WHERE ot_time=?) AND t_name LIKE ?`;
    db.connect(sql, options, callback);
  },
  getPlace:(options,callback)=>{   
    var sql = `SELECT p_id,p_name FROM place WHERE p_id NOT IN (SELECT p_id FROM coursePlan WHERE cp_time =?) AND p_id NOT IN (SELECT p_id FROM orderplace WHERE op_time=?) AND p_name LIKE ?`;
    db.connect(sql, options, callback);
  },
  addPlan:(options,callback)=>{   
    var sql = ` INSERT INTO coursePlan(c_id,t_id,p_id,cp_max,cp_time,cp_price) VALUE (?,?,?,?,?,?)`;
    db.connect(sql, options, callback);
  },
  delPlan:(options,callback)=>{   
    var sql = `DELETE FROM coursePlan WHERE cp_id=?`;
    db.connect(sql, options, callback);
  },
  getPlanDetail:(options,callback)=>{   
    var sql = `SELECT * FROM (SELECT cp_id,cp_price,c.c_id,c_name,c_img,c_strong,p.p_id,p_name,t.t_id,t_name,t_img,cp_time,cp_max,AVG(r_rate) AS rate FROM coursePlan cp JOIN teacher t ON cp.t_id=t.t_id
    JOIN course c ON cp.c_id=c.c_id
    LEFT JOIN place p ON cp.p_id=p.p_id
    LEFT JOIN rate r ON r.t_id=t.t_id WHERE cp.cp_id=? GROUP BY cp.cp_id) a
    LEFT JOIN (SELECT cp_id AS id,COUNT(cp_id) AS cp_count FROM ordercourse o GROUP BY cp_id) b
    ON a.cp_id=b.id` ;
    db.connect(sql, options, callback);
  },
  alterPlan:(options,callback)=>{   
    console.log(options)
    var sql = `UPDATE coursePlan SET t_id=?,p_id=?,cp_max=?,cp_time=?,cp_price=? WHERE cp_id=?`;
    db.connect(sql, options, callback);
  },
  getPlanOneDay:(options,callback)=>{   
    var sql = `SELECT * FROM (SELECT cp_id,t_name,c_name,p_name,cp_max,cp_time,c_img FROM coursePlan cp,teacher t,place p,course c
      WHERE cp.c_id = c.c_id AND cp.t_id = t.t_id AND cp.p_id = p.p_id AND cp_time BETWEEN ? AND ? AND cp_time>NOW() GROUP BY cp_time DESC LIMIT 0,5) a
      LEFT JOIN (SELECT cp_id AS id,COUNT(cp_id) AS cp_count FROM ordercourse o GROUP BY cp_id) b
      ON a.cp_id=b.id
    `;
    db.connect(sql, options, callback);
  },
  getPlanDayTotal:(options,callback)=>{   
    var sql = `SELECT COUNT(*) AS n FROM coursePlan cp,teacher t,place p,course c
    WHERE cp.c_id = c.c_id AND cp.t_id = t.t_id AND cp.p_id = p.p_id AND cp_time BETWEEN ? AND ? AND cp_time>NOW()`;
    db.connect(sql, options, callback);
  },

  findOrder:(options,callback)=>{
    var sql = `SELECT u_id AS id,cp_price AS price FROM ordercourse o,courseplan cp WHERE cp.cp_id=o.cp_id AND c_id = ? AND cp_time>NOW()`;
    db.connect(sql, options, callback);
  },

  findCourseOrder:(options,callback)=>{
    var sql = `SELECT u_id AS id,cp_price AS price FROM ordercourse o,courseplan cp WHERE cp.cp_id=o.cp_id AND cp.cp_id = ? AND cp_time>NOW()`;
    db.connect(sql, options, callback);
  },
  
  getTop:(options,callback)=>{
    var sql = `SELECT c_name,c_img,cp_id,c_name,c_strong,cp_time FROM courseplan cp,course c WHERE cp.c_id=c.c_id AND cp_time>NOW() ORDER BY cp_time ASC LIMIT 0,5`;
    db.connect(sql, options, callback);
  },
}

