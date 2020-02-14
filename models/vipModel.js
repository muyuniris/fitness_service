const db = require("./index");

module.exports = {
  getData: (options, callback) => {
    var sql = `SELECT * FROM vip,users WHERE vip.u_id=users.u_id AND v_outTime>(SELECT CURDATE() FROM DUAL ) LIMIT ?,? `;
    db.connect(sql, options, callback);
  },
}