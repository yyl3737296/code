const Service = require('egg').Service;
class UserSrvc extends Service {

  async getUser(username, password) {
    const result = await this.app.mysql.get('user', {"username":username,"password":password});
    return result;
  }

  async getCount(username) {
    const result = await this.app.mysql.get('user', {"username": username });
    return result;
  }

  async getRole(id) {
    const result = await this.app.mysql.query(`SELECT * FROM role r WHERE (SELECT FIND_IN_SET(r.id, u.role_id) from user u where u.id="${id}")`);
    return result;
  }

  async getInterface(ids) {
    const result = await this.app.mysql.query(`SELECT name FROM interface WHERE id in (${ids})`);
    return result;
  }


}
module.exports = UserSrvc;