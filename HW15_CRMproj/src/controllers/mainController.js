const tableController = require("../controllers/tableController.js");
const userModel = require("../../models/userModel.js");
const orderModel = require("../../models/orderModel.js");
const orderitemModel = require("../../models/orderitemModel.js");
const itemModel = require("../../models/itemModel.js");
const storeModel = require("../../models/storeModel.js");

function main(pageName) {
  return async (req, res) => {
    const search = req.query;
    const page = parseInt(req.query.page) || 1;
    const data = await tableController.readTable(pageName, search, page);

    res.render("index", {
      pageName: pageName,
      headers: tableController.getHeaders(pageName),
      table: data.table,
      page: page,
      totalPages: data.totalPages,
      urlFilter: req.url.match(/name.*/),
      name: req.query.name,
      gender: req.query.gender,
    });
  };
}

async function user_detail(req, res) {
  try {
    const id = req.params.id;
    const userInfo = await userModel.getUserInfo(id);
    const orderInfo = await userModel.getOrderInfo(id);
    const topVisitedStores = await userModel.getTopVisitedStores(id);
    const topOrderedItems = await userModel.getTopOrderedItems(id);

    res.render("user_detail", {
      userInfo,
      orderInfo,
      topVisitedStores,
      topOrderedItems,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function order_detail(req, res) {
  try {
    const id = req.params.id;
    const orderInfo = await orderModel.getOrderInfo(id);
    res.render("order_detail", {
      orderInfo,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function orderitem_detail(req, res) {
  try {
    const id = req.params.id;
    const orderitemInfo = await orderitemModel.getOrderitemInfo(id);
    res.render("orderitem_detail", {
      orderitemInfo,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function store_detail(req, res) {
  try {
    const id = req.params.id;
    const rev_month = req.query.rev_month;
    const daily = rev_month ? 1 : 0;

    const storeInfo = await storeModel.getStoreInfo(id);
    const monthlyRevenue = await storeModel.getMonthlyRevenue(id);
    const dailyRevenue = await storeModel.getDailyRevenue(id, rev_month);
    const regularUsers = await storeModel.getRegularUsers(id, rev_month);

    res.render("store_detail", {
      storeInfo,
      monthlyRevenue,
      dailyRevenue,
      regularUsers,
      daily,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function item_detail(req, res) {
  try {
    const id = req.params.id;
    const itemInfo = await itemModel.getItemInfo(id);
    const monthlyRevenue = await itemModel.getMonthlyRevenue(id);
    res.render("item_detail", {
      itemInfo,
      monthlyRevenue,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = { main, user_detail, order_detail, orderitem_detail, store_detail, item_detail };
