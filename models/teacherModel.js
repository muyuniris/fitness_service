const db = require("./index");

module.exports = {
  getData:(options, callback) => {
    var sql = `SELECT t.t_id,t.u_id,t.t_name,t_img,u.u_tel,t.t_sex,t.t_birth,t_price,t.t_id,u.u_lock,AVG(r_rate) AS t_rate FROM teacher t 
    LEFT JOIN rate r ON t.t_id=r.t_id
    JOIN users u ON t.u_id=u.u_id
    GROUP BY t.t_id
    HAVING u_tel LIKE ? AND t_name LIKE ? LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
  getTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM teacher t,users u 
    WHERE t.u_id=u.u_id AND u_tel LIKE ? AND t_name LIKE ?`;
    db.connect(sql, options, callback);
  },
  add:(options,callback)=>{
    var sql = `INSERT INTO teacher(u_id,t_name,t_sex,t_birth,t_info,t_img,t_price) VALUE(?,?,?,?,?,?,?)`;
    db.connect(sql, options, callback);
  },

  rate:(options,callback)=>{
    var sql = `INSERT INTO rate(t_id,u_id,r_rate,r_msg,r_time) VALUE(?,?,?,?,?,?)`;
    db.connect(sql, options, callback);
  },

  del:(options,callback)=>{
    var sql = `DELETE FROM teacher WHERE t_id=?`;
    db.connect(sql, options, callback);
  },

  getDetail:(options,callback)=>{
    var sql = `SELECT t.t_img,t.t_id,t.u_id,t.t_name,u.u_tel,t.t_sex,t.t_birth,t.t_id,u.u_lock,t_price,AVG(r_rate) AS t_rate FROM teacher t 
    LEFT JOIN rate r ON t.t_id=r.t_id
    JOIN users u ON t.u_id=u.u_id
    GROUP BY t.t_id
    HAVING t.t_id=?`;
    db.connect(sql, options, callback);
  },

  alter:(options,callback)=>{
    var sql = `UPDATE teacher AS a,users AS b SET b.u_tel=?,a.t_name=?,a.t_sex=?,a.t_birth=?,a.t_info=?,a.t_img=?,t_price=? WHERE a.u_id=b.u_id AND a.t_id=?`;
    db.connect(sql, options, callback);
  },
  getRate:(options,callback)=>{
    var sql = `SELECT v_name,v_img,r_id,r_rate,r_msg,r_time FROM teacher t,rate r,users u,vip v WHERE r.t_id=t.t_id AND r.u_id=u.u_id AND v.u_id=u.u_id AND t.t_id=? LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
  getRateTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM teacher t,rate r,users u,vip v WHERE r.t_id=t.t_id AND r.u_id=u.u_id AND v.u_id=u.u_id AND t.t_id=?`;
    db.connect(sql, options, callback);
  },
  rate:(options,callback)=>{
    var sql = `INSERT INTO rate(u_id,t_id,r_rate,r_msg,r_time) VALUE (?,?,?,?,?)`;
    db.connect(sql, options, callback);
  },
  getRateCount:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM rate`;
    db.connect(sql, options, callback);
  },

  getTeacher:(options,callback)=>{
    var sql = `SELECT t_id,t_name,t_img,u_tel,t_info,t_sex,t_birth FROM users u,teacher t WHERE u.u_id=t.u_id AND u.u_id = ?`;
    db.connect(sql, options, callback);
  },

  alterTeacher:(options,callback)=>{
    var sql = `UPDATE teacher AS a,users AS b SET t_name=?,a.t_sex=?,a.t_birth=?,a.t_img=?,a.t_info=? WHERE a.u_id=b.u_id AND b.u_id=?`;
    db.connect(sql, options, callback);
  },

  getCourseCount:(options,callback)=>{
    var sql = `SELECT count(*) AS n FROM courseplan cp,course c,place p WHERE p.p_id = cp.p_id AND cp.c_id=c.c_id AND t_id=?  AND cp_time>NOW()=?`;
    db.connect(sql, options, callback);
  },

  getCourse:(options,callback)=>{
    var sql = `SELECT cp_id,cp_time,c_img,c_name,p_name FROM courseplan cp,course c,place p WHERE p.p_id = cp.p_id AND cp.c_id=c.c_id AND t_id=? AND cp_time>NOW()=? ORDER BY cp_time DESC LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
  getCourseDetail:(options,callback)=>{
    var sql = `SELECT cp_id,cp_time,c_img,c_name,p_name,cp_price FROM courseplan cp,course c,place p WHERE p.p_id = cp.p_id AND cp.c_id=c.c_id AND cp_id=?`;
    db.connect(sql, options, callback);
  },
  getOrderList:(options,callback)=>{
    var sql = `SELECT v_name,u_tel,v_img FROM ordercourse o,users u,vip v WHERE o.u_id = u.u_id AND v.u_id=u.u_id AND cp_id = ?`;
    db.connect(sql, options, callback);
  },

  findOrder:(options,callback)=>{
    var sql = `SELECT o.u_id AS id ,t_price AS price FROM orderteacher o,teacher t WHERE o.t_id=t.t_id AND t.t_id=? AND ot_time>NOW() UNION ALL
    SELECT u_id AS id,cp_price AS price FROM ordercourse o,courseplan cp WHERE cp.cp_id=o.cp_id AND t_id=? AND cp_time>NOW()`;
    db.connect(sql, options, callback);
  },

  getTop:(options,callback)=>{
    var sql = `SELECT t_name,t_img,t.t_id,AVG(r_rate) AS t_rate FROM teacher t 
    LEFT JOIN rate r ON t.t_id=r.t_id
    JOIN users u ON t.u_id=u.u_id
    GROUP BY t.t_id
    ORDER BY t_rate DESC
    LIMIT 0,5`;
    db.connect(sql, options, callback);
  },
  
}