const db = require("./index");

module.exports = {
  login: (options, callback) => {
    var sql = `select u_id,u_pwd FROM users where u_name=?`;
    db.connect(sql, options, callback);
  },
}