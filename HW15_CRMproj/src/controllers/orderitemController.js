const paginationModel = require("../models/paginationModel.js");
const orderitemModel = require("../models/orderitemModel.js");

async function orderitem(req, res) {
  try {
    const pageName = req.baseUrl.split("/")[1];
    const { page = 1 } = req.query;
    const paginationModelData = {
      tableName: pageName,
      page,
    };
    const pagination = new paginationModel(paginationModelData);

    const table = await pagination.getPaginationTable();
    const totalPages = await pagination.getTotalPages();

    const headers = ["Id", "OrderId", "ItemId"];

    const tableData = { headers, table };
    const pagingData = { pageName, page, totalPages };

    res.render("orderitem", {
      tableData,
      pagingData,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function orderitemDetail(req, res) {
  try {
    const id = req.params.id;
    const Orderitem = new orderitemModel(id);

    const orderitemInfo = await Orderitem.getOrderitemInfo(id);

    res.render("orderitemDetail", {
      orderitemInfo,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { orderitem, orderitemDetail };
