const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var op=[options.name];
    var str='';
    if(options.startTime){
      str=`AND s_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    console.log(str)
    op.push(options.current);
    op.push(options.size);
    var sql = `SELECT s_id,users.u_id,s_content,s_time,u_tel,v_name FROM suggest,users,vip WHERE vip.u_id=users.u_id AND suggest.u_id=users.u_id AND v_name LIKE ? ${str} ORDER BY s_time DESC LIMIT ?,? `;
    db.connect(sql, op, callback);
  },
  getTotal:(options,callback)=>{
    var op=[options.name];
    var str='';
    if(options.startTime){
      str=`AND s_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    var sql = `SELECT COUNT(*) AS n FROM users,suggest,vip WHERE vip.u_id=users.u_id AND suggest.u_id=users.u_id AND v_name LIKE ?`+str;
    db.connect(sql, op, callback);
  },
  add:(options,callback)=>{
    var sql = `INSERT INTO suggest(u_id,s_content,s_time) VALUE(?,?,?)`;
    db.connect(sql, options, callback);
  },
  alter:(options,callback)=>{   
    var sql = `UPDATE place SET p_name=? WHERE p_id=?`;
    db.connect(sql, options, callback);
  },
  del:(options,callback)=>{   
    var sql = `DELETE FROM suggest WHERE s_id=?`;
    db.connect(sql, options, callback);
  },
  getCount:(options,callback)=>{   
    var sql = `SELECT COUNT(*) AS n FROM suggest`;
    db.connect(sql, options, callback);
  },
}

