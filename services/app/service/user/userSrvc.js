const Service = require('egg').Service;
class UserSrvc extends Service {

  async getUser(username, password) {
    const { app } = this;
    const result = await app.mongo.find('User', {"query":{"username":username,"password":password}});
    return result;
  }

  async getCount(query) {
    const { app } = this;
    const result = await app.mongo.find('User', {"query": query});
    return result;
  }


}
module.exports = UserSrvc;