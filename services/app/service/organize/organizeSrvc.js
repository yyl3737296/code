const Service = require('egg').Service;
class organizeSrvc extends Service {

  async get(page, size, query) {
    size = parseInt(size);
    let start = ( page - 1 ) * size;
    const QUERY_STR = 'id, name';
    const result = await this.app.mysql.query(`SELECT ${QUERY_STR} FROM organize ${query} LIMIT ${start}, ${size}`);
    return result;
  }

  async getCount(query) {
    const count = await this.app.mysql.query(`SELECT id FROM organize ${query}`);
    return count.length;
  }

}
module.exports = organizeSrvc;