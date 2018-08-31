const Service = require('egg').Service;
class LoginSrvc extends Service {

  async login(username, password) {
    const { app } = this;
    const result = await app.mongo.find('User', {}, {"username":username,"password":password});
    console.log(result+'--------------------');
    return result;
  }


}
module.exports = LoginSrvc;