const executeQuery = require("../utils/dbUtils");

class storeModel {
  constructor(id, rev_month) {
    this.id = id;
    this.rev_month = rev_month;
  }
  getStoreInfo() {
    const query = `SELECT * FROM store WHERE Id = ?`;
    const params = [this.id];
    return executeQuery.getSingleQuery(query, params);
  }
  getMonthlyRevenue() {
    const query = `SELECT strftime('%Y-%m', o.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
      FROM store s
      JOIN 'order' o ON s.id = o.StoreId
      JOIN orderitem oi ON o.id = oi.OrderId
      JOIN item i ON i.id = oi.Itemid
      WHERE storeId = ?
      GROUP BY Month`;
    const params = [this.id];
    return executeQuery.getAllQuery(query, params);
  }
  getDailyRevenue() {
    const query = `SELECT strftime('%Y-%m-%d', o.OrderAt) AS Day, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
      FROM store s
      JOIN 'order' o ON s.id = o.StoreId
      JOIN orderitem oi ON o.id = oi.OrderId
      JOIN item i ON i.id = oi.Itemid
      WHERE storeId = ? AND Day LIKE ? || "%"
      GROUP BY Day`;
    const params = [this.id, this.rev_month];
    return executeQuery.getAllQuery(query, params);
  }
  getRegularUsers() {
    let query = `SELECT u.id AS userId, u.Name, Count(*) AS Frequency 
      FROM store s
      JOIN 'order' o ON s.id = o.StoreId
      JOIN user u ON o.UserId = u.id
      WHERE storeId = ?`;
    if (this.rev_month) {
      query += ` AND strftime('%Y-%m', o.OrderAt) = ?`;
    }
    query += ` GROUP BY u.id
        ORDER BY Frequency DESC
        LIMIT 10`;

    const params = this.rev_month ? [this.id, this.rev_month] : this.id;
    return executeQuery.getAllQuery(query, params);
  }
}

module.exports = storeModel;
