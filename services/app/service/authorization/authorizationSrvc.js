const Service = require('egg').Service;
class authorizationSrvc extends Service {

  async get(username, password) {
    const { app } = this;
    const result = await app.mongo.find('User', {"query":{}, "project": {'password':0}});
    return result;
  }

}
module.exports = authorizationSrvc;