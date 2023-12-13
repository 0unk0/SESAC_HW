const paginationModel = require("../models/paginationModel.js");
const orderModel = require("../models/orderModel.js");

async function order(req, res) {
  try {
    const pageName = req.baseUrl.split("/")[1];
    const { page = 1 } = req.query;

    const paginationModelData = {
      tableName: "'" + pageName + "'",
      page,
    };
    const pagination = new paginationModel(paginationModelData);

    const table = await pagination.getPaginationTable();
    const totalPages = await pagination.getTotalPages();

    const headers = ["Id", "OrderAt", "StoreId", "UserId"];

    const tableData = { headers, table };
    const pagingData = { pageName, page, totalPages };

    res.render("order", {
      tableData,
      pagingData,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function orderDetail(req, res) {
  try {
    const id = req.params.id;
    const Order = new orderModel(id);

    const orderInfo = await Order.getOrderInfo();

    res.render("orderDetail", {
      orderInfo,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { order, orderDetail };
