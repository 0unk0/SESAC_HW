const paginationModel = require("../models/paginationModel.js");
const storeModel = require("../models/storeModel.js");

async function store(req, res) {
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

    const headers = ["Id", "Type", "Name", "Address"];

    const tableData = { headers, table };
    const pagingData = { pageName, page, totalPages };

    res.render("store", {
      tableData,
      pagingData,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function storeDetail(req, res) {
  try {
    const id = req.params.id;
    const rev_month = req.query.rev_month;
    const Store = new storeModel(id, rev_month);

    const daily = rev_month ? 1 : 0;

    const storeInfo = await Store.getStoreInfo();
    const monthlyRevenue = await Store.getMonthlyRevenue();
    const dailyRevenue = await Store.getDailyRevenue();
    const regularUsers = await Store.getRegularUsers();

    res.render("storeDetail", {
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

module.exports = { store, storeDetail };
