// 리팩토링 필요...
// 페이징 처리 개선 필요...

function user(req, res) {
  const pageName = "user";
  const headers = ["Id", "Name", "Gender", "Age", "Birthdate"];
  res.render(pageName, {
    headers: headers,
    table: req.table,
    pageName: pageName,
    page: parseInt(req.page),
    totalPages: parseInt(req.totalPages),
  });
}

async function order(req, res) {
  const pageName = "order";
  const headers = ["Id", "OrderAt", "StoreId", "UserId"];
  res.render(pageName, {
    headers: headers,
    table: req.table,
    pageName: pageName,
    page: parseInt(req.page),
    totalPages: parseInt(req.totalPages),
  });
}

function orderitem(req, res) {
  const pageName = "orderitem";
  const headers = ["Id", "OrderId", "ItemId"];
  res.render(pageName, {
    headers: headers,
    table: req.table,
    pageName: pageName,
    page: parseInt(req.page),
    totalPages: parseInt(req.totalPages),
  });
}
function item(req, res) {
  const pageName = "item";
  const headers = ["Id", "Type", "Name", "UnitPrice"];
  res.render(pageName, {
    headers: headers,
    table: req.table,
    pageName: pageName,
    page: parseInt(req.page),
    totalPages: parseInt(req.totalPages),
  });
}

function store(req, res) {
  const pageName = "store";
  const headers = ["Id", "Type", "Name", "Address"];
  res.render(pageName, {
    headers: headers,
    table: req.table,
    pageName: pageName,
    page: parseInt(req.page),
    totalPages: parseInt(req.totalPages),
  });
}

module.exports = { user, order, orderitem, item, store };
