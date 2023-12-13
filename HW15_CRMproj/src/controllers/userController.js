const paginationModel = require("../models/paginationModel.js");
const userModel = require("../models/userModel.js");

async function user(req, res) {
  try {
    const pageName = req.baseUrl.split("/")[1];
    const { name, gender, page = 1 } = req.query;
    const where = makeWhere(name, gender);

    const paginationModelData = {
      tableName: pageName,
      page,
      where,
    };
    const pagination = new paginationModel(paginationModelData);

    const headers = ["Id", "Name", "Gender", "Age", "Birthdate"];
    const table = await pagination.getPaginationTable();
    const totalPages = await pagination.getTotalPages();

    const tableData = { headers, table };
    const pagingData = { pageName, page, totalPages };
    const search = { name, gender };

    res.render("user", {
      tableData,
      pagingData,
      search,
    });
  } catch (err) {
    console.error("데이터베이스 읽기 실패", err);
    res.status(500).send("Internal Server Error");
  }
}

async function userDetail(req, res) {
  try {
    const id = req.params.id;
    const User = new userModel(id);

    const userInfo = await User.getUserInfo();
    const orderInfo = await User.getOrderInfo();
    const topVisitedStores = await User.getTopVisitedStores();
    const topOrderedItems = await User.getTopOrderedItems();

    res.render("userDetail", {
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

function makeWhere(name, gender) {
  const condition = [];
  let where = "";

  if (name) {
    condition.push(`name LIKE "%${name}%"`);
  }
  if (gender) {
    condition.push(`gender = "${gender}"`);
  }
  if (condition.length > 0) {
    where = ` WHERE ${condition.join(" AND ")}`;
  }
  return where;
}

module.exports = { user, userDetail };
