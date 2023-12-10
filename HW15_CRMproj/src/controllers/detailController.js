const { userModel, storeModel, orderModel, orderitemModel, itemModel, } = require("../models/detailModel.js");

// ========== User ==========
async function user_detail(req, res) {
  try {
    const id = req.params.id;
    const User = new userModel(id);

    const userInfo = await User.getUserInfo();
    const orderInfo = await User.getOrderInfo();
    const topVisitedStores = await User.getTopVisitedStores();
    const topOrderedItems = await User.getTopOrderedItems();

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

// ========== Store ==========
async function store_detail(req, res) {
  try {
    const id = req.params.id;
    const rev_month = req.query.rev_month;
    const Store = new storeModel(id, rev_month);

    const daily = rev_month ? 1 : 0;

    const storeInfo = await Store.getStoreInfo();
    const monthlyRevenue = await Store.getMonthlyRevenue();
    const dailyRevenue = await Store.getDailyRevenue();
    const regularUsers = await Store.getRegularUsers();

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

// ========== Order ==========
async function order_detail(req, res) {
  try {
    const id = req.params.id;
    const Order = new orderModel(id);

    const orderInfo = await Order.getOrderInfo();

    res.render("order_detail", {
      orderInfo,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

// ========== Orderitem ==========
async function orderitem_detail(req, res) {
  try {
    const id = req.params.id;
    const Orderitem = new orderitemModel(id);

    const orderitemInfo = await Orderitem.getOrderitemInfo(id);

    res.render("orderitem_detail", {
      orderitemInfo,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

// ========== Item ==========
async function item_detail(req, res) {
  try {
    const id = req.params.id;
    const Item = new itemModel(id);

    const itemInfo = await Item.getItemInfo();
    const monthlyRevenue = await Item.getMonthlyRevenue();

    res.render("item_detail", {
      itemInfo,
      monthlyRevenue,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { user_detail, store_detail, order_detail, orderitem_detail, item_detail };
