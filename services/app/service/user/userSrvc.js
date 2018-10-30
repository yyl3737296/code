const Service = require('egg').Service;
class UserSrvc extends Service {

  async getUser(username, password) {
    const result = await this.app.mysql.get('user', {
      where: {"username":username,"password":password},
      columns: ['id','username','name']
    });
    return result;
  }

  async getCount(username) {
    const result = await this.app.mysql.get('user', {"username": username });
    return result;
  }


}
module.exports = UserSrvc;