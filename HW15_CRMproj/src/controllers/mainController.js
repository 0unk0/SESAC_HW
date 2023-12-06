const tableController = require("../controllers/tableController.js");

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
  res.render("user_detail", {
    userInfo: await tableController.readDetailTable("userInfo", req),
    userOrderInfo: await tableController.readDetailTable("userOrderInfo", req),
  });
}

async function order_detail(req, res) {
  res.render("order_detail", {
    orderInfo: await tableController.readDetailTable("orderInfo", req),
  });
}

async function orderitem_detail(req, res) {
  res.render("orderitem_detail", {
    orderItemInfo: await tableController.readDetailTable("orderItemInfo", req),
  });
}

async function store_detail(req, res) {
  const daily = req.query.rev_month ? 1 : 0;
  res.render("store_detail", {
    storeInfo: await tableController.readDetailTable("storeInfo", req),
    monthlyRevenueInfo: await tableController.readDetailTable("monthlyRevenueInfo", req),
    dailyRevenueInfo: await tableController.readDetailTable("dailyRevenueInfo", req),
    userRankInfo: await tableController.readDetailTable("userRankInfo", req),
    daily: daily,
  });
}

async function item_detail(req, res) {
  res.render("item_detail", {
    itemInfo: await tableController.readDetailTable("itemInfo", req),
  });
}
module.exports = { main, user_detail, order_detail, orderitem_detail, store_detail, item_detail };
