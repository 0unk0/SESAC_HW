const executeQuery = require("../utils/dbUtils");

class orderitemModel {
  constructor(id) {
    this.id = id;
  }
  getOrderitemInfo() {
    const query = `SELECT oi.Id, oi.OrderId, oi.ItemId, i.Name AS ItemName FROM orderitem oi JOIN item i ON oi.ItemId = i.Id WHERE oi.OrderId = ?`;
    const params = [this.id];
    return executeQuery.getAllQuery(query, params);
  }
}

module.exports = orderitemModel;
