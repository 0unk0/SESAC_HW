const sqlite = require("sqlite3");
const db = new sqlite.Database("CRMproj.db");

function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    const statement = db.prepare(query);
    statement.all(params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = executeQuery;
