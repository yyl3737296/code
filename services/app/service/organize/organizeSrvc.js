const Service = require('egg').Service;
class organizeSrvc extends Service {

  async get(page, size, query) {
    const { app } = this;
    let start = ( page - 1 ) * size;
    const result = await app.mongo.find('Organize', {"query": query, "limit": parseInt(size), "skip": start, "sort": { index: -1 }, "project": {'password':0}});
    return result;
  }

  async getCount(query) {
    const { app } = this;
    const count = await app.mongo.count('Organize', {"query": query});
    return count;
  }

}
module.exports = organizeSrvc;