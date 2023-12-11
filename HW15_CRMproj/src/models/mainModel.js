const executeQuery = require("../utils/dbUtils");

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
    let { totalRecords } = await executeQuery.getSingleQuery(query);
    const totalPages = Math.ceil(totalRecords / this.itemsPerPage);
    return totalPages;
  }

  async readTable() {
    let query = `SELECT * FROM  ${this.tableName}`;
    if (this.where) {
      query += this.where;
    }
    query += ` LIMIT ${this.itemsPerPage} OFFSET ${this.startIndex}`;

    return await executeQuery.getAllQuery(query);
  }
}

module.exports = mainModel;
