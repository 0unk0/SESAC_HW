function main(req, res) {
  res.render("index", {
    headers: req.headers,
    table: req.table,
    pageName: req.pageName,
    page: req.page,
    totalPages: req.totalPages,
  });
}

module.exports = { main };
