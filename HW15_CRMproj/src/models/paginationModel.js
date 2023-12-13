const executeQuery = require("../utils/dbUtils");

class paginationModel {
  constructor(data) {
    this.itemsPerPage = 50;
    this.tableStartIndex = (data.page - 1) * this.itemsPerPage;
    this.tableName = data.tableName;
    this.where = data.where;
  }

  async getPaginationTable() {
    let query = `SELECT * FROM  ${this.tableName}`;
    if (this.where) {
      query += this.where;
    }
    query += ` LIMIT ${this.itemsPerPage} OFFSET ${this.tableStartIndex}`;

    return await executeQuery.getAllQuery(query);
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
}

module.exports = paginationModel;
