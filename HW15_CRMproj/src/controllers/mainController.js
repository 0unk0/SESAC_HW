const mainModel = require("../models/mainModel.js");
const makeWhere = require("../utils/makeWhere.js");
const getHeaders = require("../utils/getHeaders.js");

function main(pageName) {
  return async (req, res) => {
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
  };
}

module.exports = { main };
