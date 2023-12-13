const executeQuery = require("../utils/dbUtils");

class itemModel {
  constructor(id) {
    this.id = id;
  }
  getItemInfo() {
    const query = `SELECT Name, UnitPrice FROM item WHERE ID = ?`;
    const params = [this.id];
    return executeQuery.getSingleQuery(query, params);
  }
  getMonthlyRevenue() {
    const query = `SELECT strftime('%Y-%m', o.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
    FROM 'order' o
    JOIN orderitem oi ON o.Id = oi.OrderId
    JOIN item i ON i.id = oi.ItemId
    WHERE i.id = ?
    GROUP BY Month`;
    const params = [this.id];
    return executeQuery.getAllQuery(query, params);
  }
}

module.exports = itemModel;
