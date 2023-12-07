const runQuery = require("./runQuery");

const orderModel = {
  getOrderInfo(id) {
    const query = `SELECT Id, OrderAt, StoreId, UserId FROM orders WHERE Id = ?`;
    const params = [id];
    return runQuery.getSingleRow(query, params);
  },
};

module.exports = orderModel;
