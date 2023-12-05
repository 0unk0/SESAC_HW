const sqlite = require("sqlite3");
const db = new sqlite.Database("CRMproj.db");

async function getTotalRecords(tableName, where) {
  return new Promise(async (resolve, reject) => {
    let totalRecordsQuery = `SELECT COUNT(*) AS totalRecords FROM ${tableName}`;
    if (where) {
      totalRecordsQuery += where;
    }
    await db.get(totalRecordsQuery, (err, rows) => {
      if (err) {
        reject("테이블 읽기 실패", err);
      } else {
        resolve(rows);
      }
    });
  });
}

function readTable(tableName) {
  return async (req, res, next) => {
    const itemsPerPage = 50;
    const page = req.query.page || 1;
    req.page = parseInt(page);

    const startIndex = (page - 1) * itemsPerPage;

    // paging -> user 검색 정보 넘겨주기 위한 작업
    const urlFilter = req.url.match(/name.*/);
    if (urlFilter) {
      req.urlFilter = urlFilter[0];
    }

    // user 검색 _ where절 생성
    const condition = [];
    let where = "";

    if (req.query.name) {
      condition.push(`name LIKE "%${req.query.name}%"`);
    }

    if (req.query.gender) {
      condition.push(`gender = "${req.query.gender}"`);
    }
    if (condition.length > 0) {
      where = ` WHERE ${condition.join(" AND ")}`;
    }

    // 전체 페이지 수
    const { totalRecords } = await getTotalRecords(tableName, where);
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    req.totalPages = parseInt(totalPages);

    // 전체 테이블
    let query = `SELECT * FROM  ${tableName}`;
    if (where) {
      query += where;
    }

    query += ` LIMIT ${itemsPerPage} OFFSET ${startIndex}`;

    db.all(query, (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log("테이블 읽기 성공");
        req.table = rows;

        next();
      }
    });
  };
}
module.exports = { readTable };
