const Service = require('egg').Service;
class LoginSrvc extends Service {

  async login(username, password) {
    const { app } = this;
    const result = await app.mongo.find('User', {"query":{"username":username,"password":password}});
    return result;
  }


}
module.exports = LoginSrvc;