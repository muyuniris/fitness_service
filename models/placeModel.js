const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var sql = `SELECT * FROM place WHERE p_name LIKE ? LIMIT ?,? `;
    db.connect(sql, options, callback);
  },
  getTotal:(options,callback)=>{
    var sql = `SELECT COUNT(*) AS n FROM place WHERE p_name LIKE ?`;
    db.connect(sql, options, callback);
  },
  add:(options,callback)=>{
    var sql = `INSERT INTO place(p_name,p_info,p_img,p_price) VALUE(?,?,?,?)`;
    db.connect(sql, options, callback);
  },
  getDetail:(options,callback)=>{
    var sql = `SELECT * FROM place WHERE p_id=?`;
    db.connect(sql, options, callback);
  },
  alter:(options,callback)=>{   
    var sql = `UPDATE place SET p_name=?,p_info=?,p_img=?,p_price=? WHERE p_id=?`;
    db.connect(sql, options, callback);
  },
  del:(options,callback)=>{   
    var sql = `DELETE FROM place WHERE p_id=?`;
    db.connect(sql, options, callback);
  },
}

