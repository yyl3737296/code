const Service = require('egg').Service;
class utilSrvc extends Service {
  async insertOne(coll, data) {
    const { app } = this;
    const result = await app.mongo.insertOne(coll, {doc:data});
    return result;
  }

  async getCount(coll, query) {
    const { app } = this;
    const count = await app.mongo.count(coll, {"query": query});
    return count;
  }

}
module.exports = utilSrvc;