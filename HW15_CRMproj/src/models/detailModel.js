const executeQuery = require("../utils/executeQuery");

class userModel {
  constructor(id) {
    this.id = id;
  }
  getUserInfo() {
    const query = `SELECT * FROM  users WHERE id = ?`;
    const params = [this.id];
    return executeQuery(query, params);
  }
  getOrderInfo() {
    const query = `SELECT Id AS OrderId, OrderAt AS PurchasedDate, StoreId AS PurchasedLocation FROM orders WHERE UserId = ?`;
    const params = [this.id];
    return executeQuery(query, params);
  }
  getTopVisitedStores() {
    const query = `SELECT stores.Name, COUNT(* ) AS Count FROM users
      JOIN orders ON users.id = orders.UserId
      JOIN stores On orders.StoreId = stores.Id
      WHERE users.id = ?
      GROUP BY stores.Id
      ORDER BY Count DESC
      LIMIT 5`;
    const params = [this.id];
    return executeQuery(query, params);
  }
  getTopOrderedItems() {
    const query = `SELECT items.Name, COUNT(* ) AS Count FROM items
      JOIN orderItems ON items.id = orderitems.ItemId
      JOIN orders On orderitems.OrderId = orders.Id
      WHERE orders.UserId = ?
      GROUP BY items.Id
      ORDER BY Count DESC
      LIMIT 5`;
    const params = [this.id];
    return executeQuery(query, params);
  }
}

class storeModel {
  constructor(id, rev_month) {
    this.id = id;
    this.rev_month = rev_month;
  }
  getStoreInfo() {
    const query = `SELECT * FROM stores WHERE Id = ?`;
    const params = [this.id];
    return executeQuery(query, params);
  }
  getMonthlyRevenue() {
    const query = `SELECT strftime('%Y-%m', orders.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
      FROM stores
      JOIN orders ON stores.id = orders.StoreId
      JOIN orderitems ON orders.id=orderitems.OrderId
      JOIN items ON items.id = orderitems.Itemid
      WHERE storeId = ?
      GROUP BY Month`;
    const params = [this.id];
    return executeQuery(query, params);
  }
  getDailyRevenue() {
    const query = `SELECT strftime('%Y-%m-%d', orders.OrderAt) AS Day, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
      FROM stores
      JOIN orders ON stores.id = orders.StoreId
      JOIN orderitems ON orders.id=orderitems.OrderId
      JOIN items ON items.id = orderitems.Itemid
      WHERE storeId = ? AND Day LIKE ? || "%"
      GROUP BY Day`;
    const params = [this.id, this.rev_month];
    return executeQuery(query, params);
  }
  getRegularUsers() {
    let query = `SELECT users.id AS userId, users.Name, Count(*) AS Frequency 
      FROM stores
      JOIN orders ON stores.id = orders.StoreId
      JOIN users ON orders.UserId = users.id
      WHERE storeId = ?`;
    if (this.rev_month) {
      query += ` AND strftime('%Y-%m', orders.OrderAt) = ?`;
    }
    query += ` GROUP BY users.id
        ORDER BY Frequency DESC
        LIMIT 10`;

    const params = this.rev_month ? [this.id, this, rev_month] : this.id;
    return executeQuery(query, params);
  }
}

class orderModel {
  constructor(id) {
    this.id = id;
  }
  getOrderInfo() {
    const query = `SELECT Id, OrderAt, StoreId, UserId FROM orders WHERE Id = ?`;
    const params = [this.id];
    return executeQuery(query, params);
  }
}

class orderitemModel {
  constructor(id) {
    this.id = id;
  }
  getOrderitemInfo() {
    const query = `SELECT orderitems.Id, orderitems.OrderId, orderitems.ItemId, items.Name AS ItemName FROM orderitems JOIN items ON orderitems.ItemId = items.Id WHERE orderitems.OrderId = ?`;
    const params = [this.id];
    return executeQuery(query, params);
  }
}

class itemModel {
  constructor(id) {
    this.id = id;
  }
  getItemInfo() {
    const query = `SELECT Name, UnitPrice FROM items WHERE ID = ?`;
    const params = [this.id];
    return executeQuery(query, params);
  }
  getMonthlyRevenue() {
    const query = `SELECT strftime('%Y-%m', orders.OrderAt) AS Month, SUM(UnitPrice) AS Revenue, COUNT(*) AS Count
    FROM orders
    JOIN orderitems ON orders.Id = orderitems.OrderId
    JOIN items ON items.id = orderitems.Itemid
    WHERE items.id = ?
    GROUP BY Month`;
    const params = [this.id];
    return executeQuery(query, params);
  }
}

module.exports = { userModel, storeModel, orderModel, orderitemModel, itemModel };
