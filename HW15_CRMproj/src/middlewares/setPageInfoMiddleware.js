function setPageInfo(pageName) {
  return (req, res, next) => {
    req.pageName = pageName;
    req.headers = getHeaders(pageName);
    next();
  };
}

function getHeaders(pageName) {
  switch (pageName) {
    case "user":
      return ["Name", "Gender", "Age", "Birthdate"];
    case "order":
      return ["OrderAt", "StoreId", "UserId"];
    case "orderitem":
      return ["OrderId", "ItemId"];
    case "item":
      return ["Type", "Name", "UnitPrice"];
    case "store":
      return ["Type", "Name", "Address"];
  }
}

module.exports = setPageInfo;
