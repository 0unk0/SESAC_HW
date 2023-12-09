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

module.exports = makeWhere;
