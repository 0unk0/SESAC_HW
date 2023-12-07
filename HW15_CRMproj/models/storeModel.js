const runQuery = require("./runQuery");

const storeModel = {
  getStoreInfo(id) {
    const query = `SELECT * FROM stores WHERE Id = ?`;
    const params = [id];
    return runQuery.getSingleRow(query, params);
  },
  getMonthlyRevenue(id) {
    const query = `SELECT strftime('%Y-%m', orders.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
      FROM stores
      JOIN orders ON stores.id = orders.StoreId
      JOIN orderitems ON orders.id=orderitems.OrderId
      JOIN items ON items.id = orderitems.Itemid
      WHERE storeId = ?
      GROUP BY Month`;
    const params = [id];
    return runQuery.getAllRows(query, params);
  },
  getDailyRevenue(id, rev_month) {
    const query = `SELECT strftime('%Y-%m-%d', orders.OrderAt) AS Day, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
      FROM stores
      JOIN orders ON stores.id = orders.StoreId
      JOIN orderitems ON orders.id=orderitems.OrderId
      JOIN items ON items.id = orderitems.Itemid
      WHERE storeId = ? AND Day LIKE ? || "%"
      GROUP BY Day`;
    const params = [id, rev_month];
    return runQuery.getAllRows(query, params);
  },
  getRegularUsers(id, rev_month) {
    let query = `SELECT users.id AS userId, users.Name, Count(*) AS Frequency 
      FROM stores
      JOIN orders ON stores.id = orders.StoreId
      JOIN users ON orders.UserId = users.id
      WHERE storeId = ?`;
    if (rev_month) {
      query += ` AND strftime('%Y-%m', orders.OrderAt) = ?`;
    }
    query += ` GROUP BY users.id
        ORDER BY Frequency DESC
        LIMIT 10`;

    const params = rev_month ? [id, rev_month] : id;
    return runQuery.getAllRows(query, params);
  },
};

module.exports = storeModel;
