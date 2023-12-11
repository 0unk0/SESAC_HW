const sqlite = require("sqlite3");
const db = new sqlite.Database("CRMproj.db");

const executeQuery = {
  getSingleQuery(query, params) {
    return new Promise((resolve, reject) => {
      const statement = db.prepare(query);
      statement.get(params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  getAllQuery(query, params) {
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
  },
};

module.exports = executeQuery;
