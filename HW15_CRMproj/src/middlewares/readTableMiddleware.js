const sqlite = require("sqlite3");
const db = new sqlite.Database("CRMproj.db");

async function getTotalRecords(tableName) {
  return new Promise(async (resolve, reject) => {
    const totalRecordsQuery = `SELECT COUNT(*) AS totalRecords FROM ${tableName}`;
    await db.get(totalRecordsQuery, (err, rows) => {
      if (err) {
        reject("테이블 읽기 실패", err);
      } else {
        resolve(rows);
      }
    });
  });
}

function readTableMiddleware(tableName) {
  return async (req, res, next) => {
    const itemsPerPage = 50;
    const page = req.query.page || 1;

    const startIndex = (page - 1) * itemsPerPage;

    const { totalRecords } = await getTotalRecords(tableName);
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    console.log(totalRecords);

    const query = `SELECT * FROM  ${tableName} LIMIT ${itemsPerPage} OFFSET ${startIndex}`;
    db.all(query, (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log("테이블 읽기 성공");
        req.table = rows;
        req.page = page;
        req.totalPages = totalPages;
        next();
      }
    });
  };
}

module.exports = readTableMiddleware;
