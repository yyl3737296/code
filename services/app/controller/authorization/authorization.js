'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    let data = await ctx.service.authorization.authorizationSrvc.get(page, size);
    let total = await ctx.service.authorization.authorizationSrvc.getCount();
    this.ctx.body = {status: 200, data: data, total: total};
  }
  async create() {
    this.ctx.body = {status: 200, data: "12312312312312312"};
  }
  async update() {
    this.ctx.body = {status: 200, data: "put"};
  }
  async destroy() {
    this.ctx.body = {status: 200, data: "destroy"};
  }
}

module.exports = AuthController;
