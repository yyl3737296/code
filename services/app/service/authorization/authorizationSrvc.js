const Service = require('egg').Service;
class authorizationSrvc extends Service {

  async get(page, size) {
    const { app } = this;
    let start = ( page - 1 ) * size;
    const result = await app.mongo.find('User', {"query":{}, "limit":size, "skip": start, "sort": { index: -1 }, "project": {'password':0}});
    return result;
  }

  async getCount() {
    const { app } = this;
    const count = await app.mongo.count('User', {});
    return count;
  }

}
module.exports = authorizationSrvc;