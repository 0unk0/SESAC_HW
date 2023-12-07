const sqlite = require("sqlite3");
const db = new sqlite.Database("CRMproj.db");

// -------------------------------------------------
// 메인 페이지 테이블
function readTable(tableName, search, page) {
  return new Promise((resolve, reject) => {
    const data = {};

    const itemsPerPage = 50;
    const startIndex = (page - 1) * itemsPerPage;

    // ---------- where절 관련 ----------
    const condition = [];
    let where = "";

    if (search.name) {
      condition.push(`name LIKE "%${search.name}%"`);
    }
    if (search.gender) {
      condition.push(`gender = "${search.gender}"`);
    }
    if (condition.length > 0) {
      where = ` WHERE ${condition.join(" AND ")}`;
    }
    // ------------------------------

    // ---------- totalPages 구하기 ----------
    let totalRecordsQuery = `SELECT COUNT(*) AS totalRecords FROM ${tableName}s`;
    if (where) {
      totalRecordsQuery += where;
    }
    db.get(totalRecordsQuery, (err, row) => {
      if (err) {
        reject("데이터베이스 읽기 실패", err);
      }
      data.totalPages = parseInt(Math.ceil(row.totalRecords / itemsPerPage));
    });
    // ------------------------------

    // ---------- 전체 테이블 ----------
    let query = `SELECT * FROM  ${tableName}s`;
    if (where) {
      query += where;
    }
    query += ` LIMIT ${itemsPerPage} OFFSET ${startIndex}`;

    db.all(query, (err, row) => {
      if (err) {
        reject("데이터베이스 읽기 실패", err);
      } else {
        data.table = row; // data
        resolve(data);
      }
    });
  });
}
// 테이블 헤더
function getHeaders(pageName) {
  switch (pageName) {
    case "user":
      return ["Name", "Gender", "Age", "Birthdate"];
    case "order":
      return ["OrderAt", "StoreId", "UserId"];
    case "orderitem":
      return ["OrderId", "ItemId"];
    case "item":
      return ["Type", "Name", "UnitPrice"];
    case "store":
      return ["Type", "Name", "Address"];
  }
}
// -------------------------------------------------

module.exports = { readTable, getHeaders };
