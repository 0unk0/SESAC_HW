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

// -------------------------------------------------
// 조건별 테이블
function readDetailTable(tableName, req) {
  const id = req.params.id;
  const rev_month = req.query.rev_month || "";

  return new Promise((resolve, reject) => {
    const query = detailQuery(tableName, rev_month);

    db.all(query, id, (err, row) => {
      if (err) {
        reject("데이터베이스 읽기 실패", err);
      } else {
        resolve(row);
      }
    });
  });
}

// 조건별 테이블_query
function detailQuery(tableName, rev_month) {
  switch (tableName) {
    case "userInfo":
      return `SELECT * FROM  users WHERE id = ?`;
    case "userOrderInfo":
      return `SELECT Id AS OrderId, OrderAt AS PurchasedDate, StoreId AS PurchasedLocation FROM orders WHERE UserId = ?`;
    case "orderInfo":
      return `SELECT Id, OrderAt, StoreId, UserId FROM orders WHERE Id = ?`;
    case "orderItemInfo":
      return `SELECT orderitems.Id, orderitems.OrderId, orderitems.ItemId, items.Name AS ItemName FROM orderitems JOIN items ON orderitems.ItemId = items.Id WHERE orderitems.OrderId = ?`;
    case "storeInfo":
      return `SELECT * FROM stores WHERE Id = ?`;
    case "itemInfo":
      return `SELECT Name, UnitPrice FROM items WHERE ID = ?`;
    case "monthlyRevenueInfo":
      return `SELECT strftime('%Y-%m', orders.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
        FROM stores
        JOIN orders ON stores.id = orders.StoreId
        JOIN orderitems ON orders.id=orderitems.OrderId
        JOIN items ON items.id = orderitems.Itemid
        WHERE storeId = ?
        GROUP BY Month`;
    case "dailyRevenueInfo":
      return `SELECT strftime('%Y-%m-%d', orders.OrderAt) AS Day, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
        FROM stores
        JOIN orders ON stores.id = orders.StoreId
        JOIN orderitems ON orders.id=orderitems.OrderId
        JOIN items ON items.id = orderitems.Itemid
        WHERE storeId = ? AND Day LIKE "${rev_month}%"
        GROUP BY Day`;
    case "userRankInfo":
      let query = `SELECT users.id AS userId, users.Name, Count(*) AS Frequency 
        FROM stores
        JOIN orders ON stores.id = orders.StoreId
        JOIN users ON orders.UserId = users.id
        WHERE storeId = ?`;
      if (rev_month) {
        query += ` AND strftime('%Y-%m', orders.OrderAt) = "${rev_month}"`;
      }
      query += ` GROUP BY users.id
        ORDER BY Frequency DESC
        LIMIT 10`;
      return query;
  }
}
// -------------------------------------------------

module.exports = { readTable, getHeaders, readDetailTable };
