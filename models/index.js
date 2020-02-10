// mysql 连接配置
const mysql = require("mysql");

const pool = mysql.createPool({ // 数据库配置
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "fitness",
  multipleStatements: true
});

module.exports = {
  connect: (sql, options, callback) => {
    pool.getConnection((error, connection) => { // 连接
      if(error) return console.log("mysql 连接失败：", error);
      connection.query(sql, options, (err, result) => {
        connection.release(); // 释放连接池
        callback(err, result);
      });
    });
  }
}