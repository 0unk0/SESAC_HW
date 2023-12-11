const mainModel = require("../models/mainModel.js");
const itemModel = require("../models/itemModel.js");

async function item(req, res) {
  try {
    const pageName = req.baseUrl.split("/")[1];
    const { page = 1 } = req.query;

    const mainModelData = {
      tableName: pageName,
      page,
    };
    const main = new mainModel(mainModelData);

    const table = await main.readTable();
    const totalPages = await main.getTotalPages();

    const headers = ["Id", "Type", "Name", "UnitPrice"];

    const tableData = { headers, table };
    const pagingData = { pageName, page, totalPages };

    res.render("item", {
      tableData,
      pagingData,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function itemDetail(req, res) {
  try {
    const id = req.params.id;
    const Item = new itemModel(id);

    const itemInfo = await Item.getItemInfo();
    const monthlyRevenue = await Item.getMonthlyRevenue();

    res.render("itemDetail", {
      itemInfo,
      monthlyRevenue,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { item, itemDetail };
