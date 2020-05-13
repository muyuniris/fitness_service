const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var sql = `SELECT v_id,vip.u_id,v_birth,v_sex,u_tel,v_name,u_lock,v_endTime > NOW() AS v_state FROM vip,users WHERE vip.u_id=users.u_id AND users.u_tel LIKE ? AND v_name LIKE ? LIMIT ?,? `;
    db.connect(sql, options, callback);
  },
  getTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM vip,users WHERE vip.u_id=users.u_id AND users.u_tel LIKE ? AND v_name LIKE ?`;
    db.connect(sql, options, callback);
  },
  add:(options,callback)=>{
    var sql = `INSERT INTO vip(u_id,v_name,v_sex,v_birth,v_address,v_startTime,v_endTime,v_img) VALUE(?,?,?,?,?,?,?,?)`;
    db.connect(sql, options, callback);
  },
  getDetail:(options,callback)=>{
    var sql = `SELECT v_id,vip.u_id,v_birth,v_sex,u_tel,v_name,u_lock,v_address,v_startTime,v_endTime,v_endTime > NOW() AS v_state FROM vip,users WHERE vip.u_id=users.u_id AND vip.v_id=?`;
    db.connect(sql, options, callback);
  },
  alter:(options,callback)=>{
    console.log(options)
    if(!options.status){
      var sql = `UPDATE vip AS a,users AS b SET b.u_tel=?,a.v_name=?,a.v_sex=?,a.v_birth=?,a.v_address=?,a.v_endTime=? WHERE a.u_id=b.u_id AND a.v_id=?`;
      db.connect(sql, options.data, callback);
    }
    else{
      var sql = `UPDATE vip AS a,users AS b SET b.u_tel=?,a.v_name=?,a.v_sex=?,a.v_birth=?,a.v_address=?,a.v_startTime=?,a.v_endTime=? WHERE a.u_id=b.u_id AND a.v_id=?`;
      db.connect(sql, options.data, callback);
    }
    
  },
  getUser:(options,callback)=>{
    var sql = `SELECT u.u_id,v_name,v_img,v_endTime,v_birth,v_sex,v_startTime,v_endTime>=NOW() AS state FROM users u,vip v WHERE v.u_id=u.u_id AND u.u_id=?`;
    db.connect(sql, options, callback);
  },
  alterUser:(options,callback)=>{
    var sql = `UPDATE vip v,users u SET v_name =?,v_birth=?,v_sex=?,v_img=? WHERE u.u_id=v.u_id AND u.u_id=?`;
    db.connect(sql, options, callback);
  },
  setVip:(options,callback)=>{
    var sql = `UPDATE vip v,users u SET v_startTime =?,v_endTime=? WHERE u.u_id=v.u_id AND u.u_id=?`;
    db.connect(sql, options, callback);
  },
  income:(options,callback)=>{
    var op = [];
    var sql = `INSERT INTO bill(u_id,b_price,b_no,b_msg,b_time) VALUE`;
    for(var i=0;i<options.length;i++){
      if(i!=0){
        sql = sql+','
      }
      sql = sql + ' (?,?,?,?,?)';
      op = op.concat(options[i]);
    }
    console.log(sql,op)
    db.connect(sql, op, callback);
  },
  getMoney:(options,callback)=>{
    var sql = `SELECT u_id,SUM(b_price) AS money FROM bill GROUP BY u_id HAVING u_id=?`;
    db.connect(sql, options, callback);
  },
  billTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM bill WHERE u_id=?`;
    db.connect(sql, options, callback);
  },
  getBill:(options,callback)=>{
    var sql = `SELECT * FROM bill WHERE u_id=? ORDER BY b_time DESC LIMIT ?,?`;
    db.connect(sql, options, callback);
  },
}

