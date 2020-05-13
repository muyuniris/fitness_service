const db = require("./index");

module.exports = {
  // 登录
  login: (options, callback) => {
    var sql = `select u_id,u_pwd,u_lock FROM users where u_tel=? AND u_role=?`;
    db.connect(sql, options, callback);
  },

  // 根据手机号查找用户
  findTel: (options,callback) =>{
    var sql = `select * FROM users where u_tel=? AND u_role=?`;
    db.connect(sql, options, callback);
  },

  // 注册
  register: (options,callback) =>{
    var sql = `INSERT INTO users(u_tel,u_pwd,u_role) VALUE(?,?,?)`;
    db.connect(sql, options, callback);
  },

  // 禁用与解禁
  lock: (options,callback)=>{
    var sql = `UPDATE users SET u_lock=? WHERE u_id=?;`;
    db.connect(sql, options, callback);
  },

  // 重置密码
  setPwd: (options,callback)=>{
    var sql = `UPDATE users SET u_pwd=? WHERE u_id=?;`;
    db.connect(sql, options, callback);
  },
  alterPwd: (options,callback)=>{
    var sql = `UPDATE users SET u_pwd=? WHERE u_role=1 AND u_tel=?;`;
    db.connect(sql, options, callback);
  },
  getTel: (options,callback)=>{
    var sql = `select u_tel FROM users where u_id=?`;
    db.connect(sql, options, callback);
  },
  verify: (options,callback)=>{
    var sql = `select u_id FROM users where u_tel=? AND u_pwd=?`;
    db.connect(sql, options, callback);
  },
  alterTel: (options,callback)=>{
    var sql = `UPDATE users SET u_tel=? WHERE u_id=?;`;
    db.connect(sql, options, callback);
  },
  getCount: (options,callback)=>{
    var sql = `SELECT u_role,COUNT(u_role) AS n FROM users GROUP BY u_role ORDER BY u_role ASC`;
    db.connect(sql, options, callback);
  },
}