const executeQuery = require("../utils/dbUtils");

class orderModel {
  constructor(id) {
    this.id = id;
  }
  getOrderInfo() {
    const query = `SELECT Id, OrderAt, StoreId, UserId FROM 'order' WHERE Id = ?`;
    const params = [this.id];
    return executeQuery.getSingleQuery(query, params);
  }
}

module.exports = orderModel;
