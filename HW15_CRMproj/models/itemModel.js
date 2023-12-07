const runQuery = require("./runQuery");

const itemModel = {
  getItemInfo(id) {
    const query = `SELECT Name, UnitPrice FROM items WHERE ID = ?`;
    const params = [id];
    return runQuery.getSingleRow(query, params);
  },
  getMonthlyRevenue(id) {
    const query = `SELECT strftime('%Y-%m', orders.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
    FROM orders
    JOIN orderitems ON orders.Id = orderitems.OrderId
    JOIN items ON items.id = orderitems.Itemid
    WHERE items.id = ?
    GROUP BY Month`;
    const params = [id];
    return runQuery.getAllRows(query, params);
  },
};

module.exports = itemModel;
