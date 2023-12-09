const executeQuery = require("../utils/executeQuery");

class mainModel {
  constructor(data) {
    this.tableName = data.tableName;
    this.itemsPerPage = 50;
    this.startIndex = (data.page - 1) * this.itemsPerPage;
    this.where = data.where;
  }
  async getTotalPages() {
    let query = `SELECT COUNT(*) AS totalRecords FROM ${this.tableName}`;
    if (this.where) {
      query += this.where;
    }
    let totalRecords = await executeQuery(query);
    totalRecords = totalRecords[0].totalRecords;
    const totalPages = Math.ceil(totalRecords / this.itemsPerPage);
    return totalPages;
  }

  async readTable() {
    let query = `SELECT * FROM  ${this.tableName}`;
    if (this.where) {
      query += this.where;
    }
    query += ` LIMIT ${this.itemsPerPage} OFFSET ${this.startIndex}`;

    return await executeQuery(query);
  }
}

module.exports = mainModel;
