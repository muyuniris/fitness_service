const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var sql = `SELECT m_id,u.u_id,u_tel,u_lock,m_role,m_name FROM users u,manager m WHERE u.u_id=m.u_id AND m_name LIKE ? AND u_tel LIKE ? AND m_role LIKE ? LIMIT ?,? `;
    db.connect(sql, options, callback);
  },
  getTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM users u,manager m WHERE u.u_id=m.u_id AND m_name LIKE ? AND u_tel LIKE ? AND m_role LIKE ?`;
    db.connect(sql, options, callback);
  },
  add:(options,callback)=>{
    var sql = `INSERT INTO manager(u_id,m_role) VALUE(?,?)`;
    db.connect(sql, options, callback);
  },
  getDetail:(options,callback)=>{
    var sql = `SELECT m_id,u.u_id,u_tel,u_lock,m_role,m_name FROM users u,manager m WHERE u.u_id=m.u_id AND m_id=?`;
    db.connect(sql, options, callback);
  },
  alter:(options,callback)=>{
    var sql = `UPDATE manager m,users u SET m_name=?,u.u_tel=?,m.m_role=? WHERE u.u_id=m.u_id and m_id=?`;
    db.connect(sql, options, callback);
  },
  myData:(options,callback)=>{
    var sql = `SELECT m_id,u.u_id,u_tel,u_lock,m_role,m_name FROM users u,manager m WHERE u.u_id=m.u_id AND u.u_id=?`;
    db.connect(sql, options, callback);
  },
}

