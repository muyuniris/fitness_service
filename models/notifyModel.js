const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var op=[options.title];
    var str='';
    if(options.startTime){
      str=`AND n_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    console.log(str)
    op.push(options.current);
    op.push(options.size);
    var sql = `SELECT * FROM notify WHERE n_title LIKE ? AND u_id is NULL ${str} ORDER BY n_time DESC LIMIT ?,? `;
    db.connect(sql, op, callback);
  },
  getTotal: (options, callback) => {
    var op=[options.title];
    var str='';
    if(options.startTime){
      str=`AND n_time BETWEEN ? AND ?`;
      op.push(options.startTime);
      op.push(options.endTime);
    }
    var sql = `SELECT COUNT(*) AS n FROM notify WHERE n_title LIKE ? AND u_id is NULL `+str;
    db.connect(sql, op, callback);
  },
  del:(options,callback)=>{   
    var sql = `DELETE FROM notify WHERE n_id=?`;
    db.connect(sql, options, callback);
  },
  add:(options,callback)=>{
    var op = [];
    var sql = `INSERT INTO notify(n_title,n_msg,n_img,n_time,u_id) VALUE`;
    for(var i=0;i<options.length;i++){
      if(i!=0){
        sql = sql+','
      }
      sql = sql + '(?,?,?,?,?)';
      op = op.concat(options[i]);
    }
    console.log(sql,op);
    db.connect(sql,op,callback);
  },
  alter:(options,callback)=>{   
    var sql = `UPDATE notify SET n_title=?,n_msg=?,n_img=?,n_time=? WHERE n_id=?`;
    db.connect(sql, options, callback);
  },
  getList: (options, callback) => {
    var sql = `SELECT * FROM notify WHERE u_id=? OR u_id IS NULL ORDER BY n_time DESC LIMIT ?,? `;
    db.connect(sql, options, callback);
  },
  getListTotal: (options, callback) => {
    var sql = `SELECT COUNT(*) AS n FROM notify WHERE u_id=? OR u_id IS NULL`;
    db.connect(sql, options, callback);
  },
  getDetail:(options, callback) => {
    var sql = `SELECT * FROM notify WHERE n_id=?`;
    db.connect(sql, options, callback);
  }
}

