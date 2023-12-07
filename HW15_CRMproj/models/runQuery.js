const sqlite = require("sqlite3");
const db = new sqlite.Database("CRMproj.db");

function getSingleRow(query, params) {
  return new Promise((resolve, reject) => {
    const statement = db.prepare(query);
    statement.all(params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getAllRows(query, params) {
  return new Promise((resolve, reject) => {
    const statement = db.prepare(query);
    statement.all(params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { getSingleRow, getAllRows };
