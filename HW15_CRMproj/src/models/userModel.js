const executeQuery = require("../utils/dbUtils");

class userModel {
  constructor(id) {
    this.id = id;
  }
  getUserInfo() {
    const query = `SELECT * FROM  user WHERE id = ?`;
    const params = [this.id];
    return executeQuery.getSingleQuery(query, params);
  }
  getOrderInfo() {
    const query = `SELECT Id AS OrderId, OrderAt AS PurchasedDate, StoreId AS PurchasedLocation FROM 'order' WHERE UserId = ?`;
    const params = [this.id];
    return executeQuery.getAllQuery(query, params);
  }
  getTopVisitedStores() {
    const query = `SELECT s.Name, COUNT(*) AS Count FROM user u
        JOIN 'order' o ON u.id = o.UserId
        JOIN store s On o.StoreId = s.Id
        WHERE u.id = ?
        GROUP BY s.Id
        ORDER BY Count DESC
        LIMIT 5`;
    const params = [this.id];
    return executeQuery.getAllQuery(query, params);
  }
  getTopOrderedItems() {
    const query = `SELECT i.Name, COUNT(*) AS Count FROM item i
        JOIN orderItem oi ON i.id = oi.ItemId
        JOIN 'order' o On oi.OrderId = o.Id
        WHERE o.UserId = ?
        GROUP BY i.Id
        ORDER BY Count DESC
        LIMIT 5`;
    const params = [this.id];
    return executeQuery.getAllQuery(query, params);
  }
}

module.exports = userModel;
