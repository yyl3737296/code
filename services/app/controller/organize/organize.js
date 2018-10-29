'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    const { page, size, key, value } = ctx.query;
    let query = {};
    
    if ( value && key && key != '' && value != ' ') {
      query[key] = new RegExp(value);
    }

    let data = await ctx.service.organize.organizeSrvc.get(page, size, query);
    let total = await ctx.service.organize.organizeSrvc.getCount(query);

    ctx.body = {status: 200, data: data, total: total};
    
  }
  async create() {
    const { ctx } = this;
    const { user, password, organize, description } = ctx.request.body;
    let query = {'username':user};
    let total = await ctx.service.utilSrvc.getCount('User', query);

    if (total == 0) {
      let req = await ctx.service.utilSrvc.insertOne('Organize', {
        organize: organize,
        description: description
      });

      await ctx.service.utilSrvc.insertOne('User', {
        username: user,
        password: password,
        orgId: req.insertedId,
        role: 'super_admin_company'
      });

      this.ctx.body = {status: 200};
    }
    else {
      this.ctx.body = {status: 403, message: "组织登录名已经存在！"};
    }
  }
  async update() {
    this.ctx.body = {status: 200, data: "put"};
  }
  async destroy() {
    this.ctx.body = {status: 200, data: "destroy"};
  }
}

module.exports = AuthController;
