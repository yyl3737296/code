const Service = require('egg').Service;
class utilSrvc extends Service {
  async insertOne(table, data) {
    const result = await this.app.mysql.insert(table, data);
    return result;
  }

  async get(table, query) {
    const { app } = this;
    const count = await this.app.mysql.get(table, query);
    return count;
  }

}
module.exports = utilSrvc;