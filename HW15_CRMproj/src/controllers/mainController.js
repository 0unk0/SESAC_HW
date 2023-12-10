const mainModel = require("../models/mainModel.js");
const { getHeaders, makeWhere } = require("../utils/controllerUtils.js");

async function main(req, res) {
  try {
    const pageName = req.url.split("/")[1];
    const { name, gender, page = 1 } = req.query;
    const where = makeWhere(name, gender);

    const mainModelData = {
      tableName: pageName + "s",
      page,
      where,
    };
    const main = new mainModel(mainModelData);

    const table = await main.readTable();
    const totalPages = await main.getTotalPages();

    const headers = getHeaders(pageName);

    res.render("index", {
      pageName,
      table,
      headers,
      page,
      totalPages,
      name,
      gender,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { main };
