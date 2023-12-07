const runQuery = require("./runQuery");

const orderitemModel = {
  getOrderitemInfo(id) {
    const query = `SELECT orderitems.Id, orderitems.OrderId, orderitems.ItemId, items.Name AS ItemName FROM orderitems JOIN items ON orderitems.ItemId = items.Id WHERE orderitems.OrderId = ?`;
    const params = [id];
    return runQuery.getAllRows(query, params);
  },
};

module.exports = orderitemModel;
