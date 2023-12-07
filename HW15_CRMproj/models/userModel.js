const runQuery = require("./runQuery");

const userModel = {
  getUserInfo(id) {
    const query = `SELECT * FROM  users WHERE id = ?`;
    const params = [id];
    return runQuery.getSingleRow(query, params);
  },
  getOrderInfo(id) {
    const query = `SELECT Id AS OrderId, OrderAt AS PurchasedDate, StoreId AS PurchasedLocation FROM orders WHERE UserId = ?`;
    const params = [id];
    return runQuery.getAllRows(query, params);
  },
  getTopVisitedStores(id) {
    const query = `SELECT stores.Name, COUNT(* ) AS Count FROM users
      JOIN orders ON users.id = orders.UserId
      JOIN stores On orders.StoreId = stores.Id
      WHERE users.id = ?
      GROUP BY stores.Id
      ORDER BY Count DESC
      LIMIT 5`;
    const params = [id];
    return runQuery.getAllRows(query, params);
  },
  getTopOrderedItems(id) {
    const query = `SELECT items.Name, COUNT(* ) AS Count FROM items
      JOIN orderItems ON items.id = orderitems.ItemId
      JOIN orders On orderitems.OrderId = orders.Id
      WHERE orders.UserId = ?
      GROUP BY items.Id
      ORDER BY Count DESC
      LIMIT 5`;
    const params = [id];
    return runQuery.getAllRows(query, params);
  },
};

module.exports = userModel;
