function getHeaders(pageName) {
  switch (pageName) {
    case "user":
      return ["Id", "Name", "Gender", "Age", "Birthdate"];
    case "order":
      return ["Id", "OrderAt", "StoreId", "UserId"];
    case "orderitem":
      return ["Id", "OrderId", "ItemId"];
    case "item":
      return ["Id", "Type", "Name", "UnitPrice"];
    case "store":
      return ["Id", "Type", "Name", "Address"];
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


module.exports = { getHeaders, makeWhere };
